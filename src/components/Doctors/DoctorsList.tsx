import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import DoctorCard from './DoctorCard';
import SpecialtiesGrid from '../Specialties/SpecialtiesGrid';
import HealthProblemsGrid from '../HealthProblems/HealthProblemsGrid';
import AllDoctorsSection from './AllDoctorsSection';
import LoadingSpinner from '../Common/LoadingSpinner';
import { DoctorCardSkeleton } from '../Common/SkeletonLoader';
import { Doctor } from '../../types';
import { specialties } from '../../data/specialties';

interface DoctorsListProps {
  onDoctorSelect: (doctor: Doctor) => void;
}

// Enhanced mock data for doctors with proper availability
const generateMockDoctors = (): Doctor[] => {
  const doctorTemplates = [
    {
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      qualification: 'MBBS - Cardiologist',
      bio: 'Dr. Smith has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
      hospital: 'City General Hospital',
      consultationFee: 60
    },
    {
      name: 'Dr. Michael Johnson',
      specialty: 'Dermatology',
      qualification: 'MBBS - Dermatologist',
      bio: 'Board-certified dermatologist specializing in medical and cosmetic dermatology with focus on skin cancer prevention.',
      hospital: 'Skin Care Center',
      consultationFee: 45
    },
    {
      name: 'Dr. Emily Wilson',
      specialty: 'Pediatrics',
      qualification: 'MBBS - Pediatrician',
      bio: 'Dedicated pediatrician with extensive experience in child healthcare and development. Specializes in preventive care.',
      hospital: 'Children\'s Medical Center',
      consultationFee: 50
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
    id: `mock_doctor_${index + 100}`,
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

export default function DoctorsList({ onDoctorSelect }: DoctorsListProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showSpecialties, setShowSpecialties] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const locations = ['All', 'City General Hospital', 'Skin Care Center', 'Children\'s Medical Center', 'Orthopedic Center', 'Neuro Care Institute', 'Mental Health Center'];

  // Simulate data loading
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
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setDoctors(combinedDoctors);
      setFilteredDoctors(combinedDoctors);
      setIsLoading(false);
    };

    loadDoctors();
  }, []);

  // Filter and search logic with loading simulation
  useEffect(() => {
    const filterDoctors = async () => {
      if (searchTerm || selectedSpecialty || selectedLocation) {
        setIsSearching(true);
        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      let filtered = doctors;

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(doctor =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setShowSpecialties(false);
      } else {
        setShowSpecialties(true);
      }

      // Filter by specialty
      if (selectedSpecialty && selectedSpecialty !== 'All') {
        filtered = filtered.filter(doctor => doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase());
        setShowSpecialties(false);
      }

      // Filter by location
      if (selectedLocation && selectedLocation !== 'All') {
        filtered = filtered.filter(doctor => doctor.hospital === selectedLocation);
      }

      // Sort doctors
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'experience':
            return b.experience - a.experience;
          case 'fee':
            return a.consultationFee - b.consultationFee;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });

      setFilteredDoctors(filtered);
      setIsSearching(false);
    };

    if (doctors.length > 0) {
      filterDoctors();
    }
  }, [searchTerm, selectedSpecialty, selectedLocation, sortBy, doctors]);

  const handleSpecialtyClick = (specialtyId: string) => {
    const specialty = specialties.find(s => s.id === specialtyId);
    if (specialty) {
      setSelectedSpecialty(specialty.name);
      setShowSpecialties(false);
    }
  };

  const handleProblemClick = (problemId: string) => {
    setShowSpecialties(false);
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
        </div>

        {/* Loading Search and Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Loading Specialties */}
        <div className="space-y-8 mb-8">
          <div className="card p-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-80 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center py-12">
          <LoadingSpinner size="lg" text="Loading doctors..." />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Find Doctors</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">Browse and book appointments with qualified healthcare professionals.</p>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
            {isSearching && (
              <div className="absolute right-3 top-3">
                <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Specialty Filter */}
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="input-field"
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty.id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input-field pl-10 appearance-none"
            >
              {locations.map(location => (
                <option key={location} value={location === 'All' ? '' : location}>
                  {location === 'All' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="rating">Sort by Rating</option>
            <option value="experience">Sort by Experience</option>
            <option value="fee">Sort by Fee (Low to High)</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Specialties and Health Problems */}
      {showSpecialties && (
        <div className="space-y-8 mb-8">
          <SpecialtiesGrid onSpecialtyClick={handleSpecialtyClick} />
          <HealthProblemsGrid onProblemClick={handleProblemClick} />
          <AllDoctorsSection onDoctorSelect={onDoctorSelect} />
        </div>
      )}

      {/* Results */}
      {!showSpecialties && (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : (
                <>
                  Showing {filteredDoctors.length} of {doctors.length} doctors
                  {selectedSpecialty && (
                    <span className="ml-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm">
                      {selectedSpecialty}
                    </span>
                  )}
                </>
              )}
            </p>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Filters applied</span>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="space-y-6">
            {isSearching ? (
              // Show skeleton loaders while searching
              Array.from({ length: 3 }).map((_, index) => (
                <DoctorCardSkeleton key={index} />
              ))
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  onBookAppointment={onDoctorSelect}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No doctors found</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or filters to find more doctors.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}