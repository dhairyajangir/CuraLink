import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowLeft, Check, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
import { Doctor } from '../../types';
import PayPalPayment from './PayPalPayment';
import { useAuth } from '../../context/AuthContext';

interface NewAppointmentBookingProps {
  doctor: Doctor;
  onClose: () => void;
  onBookingComplete: () => void;
}

export default function NewAppointmentBooking({ doctor, onClose, onBookingComplete }: NewAppointmentBookingProps) {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [symptoms, setSymptoms] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [step, setStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Check doctor's availability for this day
      const doctorDayAvailability = doctor.availability?.find(day => day.day === dayName);
      const isAvailable = isCurrentMonth && !isPast && doctorDayAvailability?.isAvailable;
      const hasAvailableSlots = isAvailable && doctorDayAvailability?.timeSlots.some(slot => !slot.isBooked);
      
      days.push({
        date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isAvailable: hasAvailableSlots,
        dateString: date.toISOString().split('T')[0],
        dayName
      });
    }
    
    return days;
  };

  // Get available time slots for selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return [];
    
    const selectedDay = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    const doctorDayAvailability = doctor.availability?.find(day => day.day === selectedDay);
    
    if (!doctorDayAvailability || !doctorDayAvailability.isAvailable) {
      return [];
    }
    
    return doctorDayAvailability.timeSlots.filter(slot => !slot.isBooked);
  };

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation', fee: doctor.consultationFee },
    { value: 'followup', label: 'Follow-up Visit', fee: Math.round(doctor.consultationFee * 0.7) },
    { value: 'emergency', label: 'Emergency Consultation', fee: Math.round(doctor.consultationFee * 1.5) }
  ];

  const selectedAppointmentType = appointmentTypes.find(type => type.value === appointmentType);
  const calendarDays = generateCalendarDays();
  const availableTimeSlots = getAvailableTimeSlots();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
    setSelectedDate('');
    setSelectedTime('');
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    if (!user) return;

    try {
      // Create appointment data
      const appointmentData = {
        patientId: user.id,
        doctorId: doctor.id,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType as 'consultation' | 'followup' | 'emergency',
        symptoms,
        fee: selectedAppointmentType?.fee || doctor.consultationFee,
        status: 'confirmed' as const,
        patient: user,
        doctor
      };

      // Get appointment manager and add appointment
      const AppointmentManager = (window as any).AppointmentManager;
      if (AppointmentManager) {
        const manager = AppointmentManager.getInstance();
        manager.addAppointment(appointmentData);
      } else {
        // Fallback: Add to localStorage directly
        const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const newAppointment = {
          id: Date.now().toString(),
          ...appointmentData,
          createdAt: new Date().toISOString()
        };
        
        existingAppointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(existingAppointments));
      }
      
      setBookingComplete(true);
      setTimeout(() => {
        onBookingComplete();
      }, 2000);
    } catch (error) {
      console.error('Failed to create appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const handlePaymentError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  const proceedToPayment = () => {
    setShowPayment(true);
  };

  if (bookingComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-accent-600 dark:text-accent-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Appointment Booked Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your appointment with {doctor.name} has been confirmed for {selectedDate} at {selectedTime}.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You'll receive a confirmation email shortly.
          </p>
        </div>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Complete Payment</h2>
              <div className="w-9"></div>
            </div>
          </div>
          
          <div className="p-6">
            <PayPalPayment
              amount={selectedAppointmentType?.fee || doctor.consultationFee}
              doctorName={doctor.name}
              appointmentDate={selectedDate}
              appointmentTime={selectedTime}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onCancel={handlePaymentCancel}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Book Appointment</h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Step {step} of 3
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Doctor Info */}
          <div className="lg:w-1/3 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-700 dark:text-primary-300">
                  {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{doctor.specialty}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.qualification}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{doctor.rating.toFixed(1)} ({doctor.totalReviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">About</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.bio}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Appointment fee</h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedAppointmentType?.fee || doctor.consultationFee}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:w-2/3 p-6">
            {step === 1 && (
              <div className="space-y-6">
                {/* Appointment Type */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Appointment Type</h3>
                  <div className="space-y-3">
                    {appointmentTypes.map((type) => (
                      <label key={type.value} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="appointmentType"
                            value={type.value}
                            checked={appointmentType === type.value}
                            onChange={(e) => setAppointmentType(e.target.value)}
                            className="mr-3 text-primary-600 focus:ring-primary-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{type.label}</div>
                          </div>
                        </div>
                        <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">${type.fee}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full btn-primary py-4 text-lg"
                >
                  Continue to Date & Time
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Calendar */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Date</h3>
                  
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h4>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Week Days */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => day.isAvailable && setSelectedDate(day.dateString)}
                        disabled={!day.isAvailable}
                        className={`p-2 text-sm rounded-lg transition-colors ${
                          !day.isCurrentMonth
                            ? 'text-gray-300 dark:text-gray-600'
                            : day.isPast || !day.isAvailable
                            ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            : selectedDate === day.dateString
                            ? 'bg-primary-600 text-white'
                            : day.isToday
                            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                        }`}
                      >
                        {day.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Time Slots</h3>
                    {availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`p-3 border rounded-lg text-center transition-colors ${
                              selectedTime === slot.time
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No available time slots for this date</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Please select a different date</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1 py-3"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate || !selectedTime}
                    className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Symptoms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Symptoms / Reason for Visit (Optional)
                  </label>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Please describe your symptoms or reason for the appointment..."
                  />
                </div>

                {/* Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Appointment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Doctor:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{doctor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Date:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Time:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedAppointmentType?.label}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                      <div className="flex justify-between text-lg font-semibold">
                        <span className="text-gray-900 dark:text-white">Total:</span>
                        <span className="text-primary-600 dark:text-primary-400">${selectedAppointmentType?.fee}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-secondary flex-1 py-3"
                  >
                    Back
                  </button>
                  <button
                    onClick={proceedToPayment}
                    className="btn-primary flex-1 py-3 flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}