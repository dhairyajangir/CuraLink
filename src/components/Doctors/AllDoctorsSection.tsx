import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { Doctor } from '../../types';
import { specialties } from '../../data/specialties';
import LoadingSpinner from '../Common/LoadingSpinner';

interface AllDoctorsSectionProps {
  onDoctorSelect: (doctor: Doctor) => void;
}

// Enhanced mock doctors data with proper availability
const generateMockDoctors = (): Doctor[] => {
  const doctorTemplates = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      qualification: 'MD, FACC',
      bio: 'Experienced cardiologist specializing in interventional cardiology and heart disease prevention.',
      hospital: 'City Medical Center',
      consultationFee: 80
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      qualification: 'MD, AAD',
      bio: 'Board-certified dermatologist with expertise in medical and cosmetic dermatology.',
      hospital: 'Skin Care Clinic',
      consultationFee: 60
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      qualification: 'MD, FAAP',
      bio: 'Dedicated pediatrician with extensive experience in child healthcare and development.',
      hospital: 'Children\'s Hospital',
      consultationFee: 70
    },
    {
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      qualification: 'MD, MS Ortho',
      bio: 'Orthopedic surgeon specializing in sports medicine and joint replacement.',
      hospital: 'Orthopedic Center',
      consultationFee: 90
    },
    {
      name: 'Dr. Lisa Thompson',
      specialty: 'Neurology',
      qualification: 'MD, PhD',
      bio: 'Neurologist specializing in stroke care and neurodegenerative diseases.',
      hospital: 'Neuro Institute',
      consultationFee: 100
    },
    {
      name: 'Dr. Robert Davis',
      specialty: 'Psychiatry',
      qualification: 'MD, MRCPsych',
      bio: 'Psychiatrist focusing on anxiety, depression, and mood disorders.',
      hospital: 'Mental Health Center',
      consultationFee: 85
    },
    {
      name: 'Dr. Maria Garcia',
      specialty: 'Gynecology',
      qualification: 'MD, FACOG',
      bio: 'Gynecologist specializing in women\'s reproductive health and minimally invasive surgery.',
      hospital: 'Women\'s Health Clinic',
      consultationFee: 75
    },
    {
      name: 'Dr. David Kim',
      specialty: 'Gastroenterology',
      qualification: 'MD, FACG',
      bio: 'Gastroenterologist with expertise in inflammatory bowel disease and liver disorders.',
      hospital: 'Digestive Health Center',
      consultationFee: 95
    }
  ];

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

  return doctorTemplates.map((template, index) => ({
    id: `doctor_${index + 10}`,
    email: `${template.name.toLowerCase().replace(/\s+/g, '.')}@hospital.com`,
    name: template.name,
    role: 'doctor' as const,
    specialty: template.specialty,
    experience: Math.floor(Math.random() * 15) + 5, // 5-20 years
    qualification: template.qualification,
    bio: template.bio,
    consultationFee: template.consultationFee,
    rating: 4.5 + Math.random() * 0.5, // 4.5-5.0
    totalReviews: Math.floor(Math.random() * 200) + 50, // 50-250 reviews
    isApproved: true,
    hospital: template.hospital,
    availability: getDefaultAvailability(),
    createdAt: '2024-01-01'
  }));
};

export default function AllDoctorsSection({ onDoctorSelect }: AllDoctorsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      setIsLoading(true);
      
      // Get doctors from localStorage (registered doctors)
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const registeredDoctors = mockUsers.filter((user: any) => 
        user.role === 'doctor' && user.isApproved
      );

      // Generate additional mock doctors for demo
      const generatedDoctors = generateMockDoctors();
      
      // Combine both sets of doctors
      const combinedDoctors = [...registeredDoctors, ...generatedDoctors];
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAllDoctors(combinedDoctors);
      setIsLoading(false);
    };

    loadDoctors();
  }, []);

  const filteredDoctors = allDoctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.hospital && doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialty = !selectedSpecialty || doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
      
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee-low':
          return a.consultationFee - b.consultationFee;
        case 'fee-high':
          return b.consultationFee - a.consultationFee;
        case 'reviews':
          return b.totalReviews - a.totalReviews;
        default:
          return 0;
      }
    });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        <div className="p-6">
          <LoadingSpinner size="lg" text="Loading doctors..." />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Doctors</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {filteredDoctors.length} doctors available for booking
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-80 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center gap-2 px-4 py-2.5"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty
                </label>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty.id} value={specialty.name}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="fee-low">Lowest Fee</option>
                  <option value="fee-high">Highest Fee</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSpecialty('');
                    setSortBy('rating');
                  }}
                  className="btn-secondary w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => {
              // Check if doctor has available slots
              const hasAvailableSlots = doctor.availability?.some(day => 
                day.isAvailable && day.timeSlots.some(slot => !slot.isBooked)
              );

              return (
                <div key={doctor.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-medium transition-all duration-200 border border-gray-100 dark:border-gray-600">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-bold text-primary-700 dark:text-primary-300">
                        {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {doctor.name}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">
                            {doctor.specialty}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {doctor.qualification} • {doctor.experience} years exp.
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-gray-900 dark:text-white">{doctor.rating.toFixed(1)}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">({doctor.totalReviews})</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            ${doctor.consultationFee}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.hospital}</span>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                        {doctor.bio}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            hasAvailableSlots 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                          }`}>
                            {hasAvailableSlots ? 'Available Today' : 'Limited Availability'}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                            Verified
                          </span>
                        </div>
                        
                        <button
                          onClick={() => onDoctorSelect(doctor)}
                          className="btn-primary flex items-center gap-2 px-4 py-2"
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
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No doctors found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}