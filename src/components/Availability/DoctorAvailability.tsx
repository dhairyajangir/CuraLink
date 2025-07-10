import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, X, Save, AlertCircle } from 'lucide-react';
import { DayAvailability, TimeSlot } from '../../types';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

interface DoctorAvailabilityProps {
  availability: DayAvailability[];
  onSave: (availability: DayAvailability[]) => void;
}

export default function DoctorAvailability({ availability, onSave }: DoctorAvailabilityProps) {
  const { user } = useAuth();
  const [localAvailability, setLocalAvailability] = useState<DayAvailability[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Initialize availability data
  useEffect(() => {
    const initializeAvailability = () => {
      setIsLoading(true);
      
      // If availability prop is provided and not empty, use it
      if (availability && availability.length > 0) {
        setLocalAvailability(availability);
      } 
      // If user is a doctor and has availability, use that
      else if (user?.role === 'doctor' && (user as any).availability) {
        setLocalAvailability((user as any).availability);
      } 
      // Otherwise, create default availability structure
      else {
        const defaultAvailability = daysOfWeek.map(day => ({
          day,
          isAvailable: false,
          timeSlots: []
        }));
        setLocalAvailability(defaultAvailability);
      }
      
      setIsLoading(false);
    };

    initializeAvailability();
  }, [availability, user]);

  const toggleDayAvailability = (day: string) => {
    setLocalAvailability(prev => 
      prev.map(dayAvail => 
        dayAvail.day === day 
          ? { 
              ...dayAvail, 
              isAvailable: !dayAvail.isAvailable,
              // Clear time slots if making day unavailable
              timeSlots: !dayAvail.isAvailable ? dayAvail.timeSlots : []
            }
          : dayAvail
      )
    );
  };

  const toggleTimeSlot = (day: string, time: string) => {
    setLocalAvailability(prev => 
      prev.map(dayAvail => {
        if (dayAvail.day === day) {
          const existingSlot = dayAvail.timeSlots.find(slot => slot.time === time);
          if (existingSlot) {
            // Remove the time slot
            return {
              ...dayAvail,
              timeSlots: dayAvail.timeSlots.filter(slot => slot.time !== time)
            };
          } else {
            // Add the time slot
            return {
              ...dayAvail,
              timeSlots: [...dayAvail.timeSlots, { time, isBooked: false }]
            };
          }
        }
        return dayAvail;
      })
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data in localStorage if user is a doctor
      if (user?.role === 'doctor') {
        const updatedUser = {
          ...user,
          availability: localAvailability
        };
        localStorage.setItem('curalink_user', JSON.stringify(updatedUser));
      }
      
      onSave(localAvailability);
      setIsEditing(false);
      
      // Show success message
      alert('Availability updated successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
      alert('Failed to save availability. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original availability
    if (availability && availability.length > 0) {
      setLocalAvailability(availability);
    } else if (user?.role === 'doctor' && (user as any).availability) {
      setLocalAvailability((user as any).availability);
    }
    setIsEditing(false);
  };

  const getDayAvailability = (day: string) => {
    return localAvailability.find(dayAvail => dayAvail.day === day) || {
      day,
      isAvailable: false,
      timeSlots: []
    };
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="card p-8">
          <LoadingSpinner size="lg" text="Loading availability..." />
        </div>
      </div>
    );
  }

  // Check if user is a doctor
  if (user?.role !== 'doctor') {
    return (
      <div className="container py-8">
        <div className="card p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Restricted
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Only doctors can manage availability settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="card">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Availability</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Set your available days and time slots for appointments.
              </p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Edit Availability
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {localAvailability.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No availability set
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Set your available days and times to start receiving appointments.
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Set Availability
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {daysOfWeek.map((day) => {
                const dayAvail = getDayAvailability(day);
                return (
                  <div key={day} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{day}</h3>
                      {isEditing && (
                        <button
                          onClick={() => toggleDayAvailability(day)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            dayAvail.isAvailable 
                              ? 'bg-accent-600 dark:bg-accent-500' 
                              : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              dayAvail.isAvailable ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      )}
                      {!isEditing && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          dayAvail.isAvailable 
                            ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-200'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {dayAvail.isAvailable ? 'Available' : 'Not Available'}
                        </span>
                      )}
                    </div>

                    {dayAvail.isAvailable ? (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Available Time Slots
                        </h4>
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                          {timeSlots.map((time) => {
                            const isSelected = dayAvail.timeSlots.some(slot => slot.time === time);
                            const isBooked = dayAvail.timeSlots.find(slot => slot.time === time)?.isBooked;
                            
                            return (
                              <button
                                key={time}
                                onClick={() => isEditing && !isBooked && toggleTimeSlot(day, time)}
                                disabled={!isEditing || isBooked}
                                className={`p-2 text-sm rounded-lg border transition-colors ${
                                  isBooked
                                    ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700 cursor-not-allowed'
                                    : isSelected
                                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 border-primary-200 dark:border-primary-700'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                } ${isEditing && !isBooked ? 'cursor-pointer' : 'cursor-default'}`}
                              >
                                {time}
                                {isBooked && <span className="block text-xs">Booked</span>}
                              </button>
                            );
                          })}
                        </div>
                        {dayAvail.timeSlots.length === 0 && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            {isEditing ? 'Click on time slots to add them' : 'No time slots selected'}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Not available on this day
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}