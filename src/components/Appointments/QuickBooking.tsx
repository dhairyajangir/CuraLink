import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Search, ArrowRight, Star, MapPin } from 'lucide-react';
import { Doctor } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';

interface QuickBookingProps {
  onDoctorSelect: (doctor: Doctor) => void;
}

const quickSpecialties = [
  { id: 'general', name: 'General Medicine', icon: '🩺', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
  { id: 'cardiology', name: 'Cardiology', icon: '❤️', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' },
  { id: 'dermatology', name: 'Dermatology', icon: '🧴', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
  { id: 'pediatrics', name: 'Pediatrics', icon: '👶', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' },
];

// Generate featured doctors with proper availability
const generateFeaturedDoctors = (): Doctor[] => {
  const getDefaultAvailability = () => [
    {
      day: 'Monday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
        { time: '04:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Tuesday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
        { time: '04:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Wednesday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Thursday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
        { time: '04:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Friday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Saturday',
      isAvailable: true,
      timeSlots: [
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Sunday',
      isAvailable: false,
      timeSlots: []
    }
  ];

  return [
    {
      id: 'featured_1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      rating: 4.9,
      totalReviews: 156,
      consultationFee: 80,
      hospital: 'City Medical Center',
      isApproved: true,
      experience: 12,
      qualification: 'MD, FACC',
      bio: 'Experienced cardiologist',
      availability: getDefaultAvailability(),
      email: 'dr.sarah@hospital.com',
      role: 'doctor',
      createdAt: '2024-01-01'
    },
    {
      id: 'featured_2',
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      rating: 4.8,
      totalReviews: 89,
      consultationFee: 60,
      hospital: 'Skin Care Clinic',
      isApproved: true,
      experience: 8,
      qualification: 'MD, AAD',
      bio: 'Board-certified dermatologist',
      availability: getDefaultAvailability(),
      email: 'dr.chen@clinic.com',
      role: 'doctor',
      createdAt: '2024-01-01'
    }
  ];
};

export default function QuickBooking({ onDoctorSelect }: QuickBookingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [featuredDoctors, setFeaturedDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedDoctors = async () => {
      setIsLoading(true);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get doctors from localStorage and combine with featured
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const registeredDoctors = mockUsers.filter((user: any) => 
        user.role === 'doctor' && user.isApproved
      ).slice(0, 2); // Take first 2 registered doctors
      
      const generatedDoctors = generateFeaturedDoctors();
      const combinedDoctors = [...registeredDoctors, ...generatedDoctors];
      
      setFeaturedDoctors(combinedDoctors);
      setIsLoading(false);
    };

    loadFeaturedDoctors();
  }, []);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          
          <div className="card p-6 mb-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div className="text-center py-12">
            <LoadingSpinner size="lg" text="Loading quick booking options..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find and book with the best doctors in minutes
          </p>
        </div>

        {/* Quick Search */}
        <div className="card p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search doctors, specialties, or symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Quick Specialties */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Popular Specialties</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickSpecialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  selectedSpecialty === specialty.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                } bg-white dark:bg-gray-800`}
              >
                <div className="text-3xl mb-3">{specialty.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {specialty.name}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Doctors */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Top Rated Doctors</h2>
            <a
              href="/doctors"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredDoctors.map((doctor) => {
              // Check if doctor has available slots
              const hasAvailableSlots = doctor.availability?.some(day => 
                day.isAvailable && day.timeSlots.some(slot => !slot.isBooked)
              );

              return (
                <div key={doctor.id} className="card p-6 hover:shadow-medium transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-700 dark:text-primary-300">
                        {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                        {doctor.specialty}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{doctor.rating} ({doctor.totalReviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.hospital}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            ${doctor.consultationFee}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            hasAvailableSlots 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                          }`}>
                            {hasAvailableSlots ? 'Available' : 'Limited'}
                          </span>
                        </div>
                        <button
                          onClick={() => onDoctorSelect(doctor)}
                          className="btn-primary flex items-center gap-2"
                        >
                          <Calendar className="w-4 h-4" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Same Day Booking</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get appointments within 24 hours
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Top Rated</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Only verified, highly-rated doctors
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Rescheduling</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Change appointments hassle-free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}