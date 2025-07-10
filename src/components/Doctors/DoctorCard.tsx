import React from 'react';
import { Star, MapPin, Clock, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-start space-x-6">
        {/* Doctor Image Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-700 dark:text-primary-300">
              {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                {doctor.isApproved && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <p className="text-primary-600 dark:text-primary-400 font-medium text-lg">{doctor.qualification}</p>
              <p className="text-gray-600 dark:text-gray-300">{doctor.experience} Year Experience</p>
            </div>
            
            <div className="flex items-center bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg">
              <Star className="w-4 h-4 text-green-600 dark:text-green-400 fill-current mr-1" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">{doctor.rating}</span>
              <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">({doctor.totalReviews})</span>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <span className="w-1 h-4 bg-primary-600 dark:bg-primary-400 rounded mr-2"></span>
              About
            </h4>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{doctor.bio}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span className="truncate">{doctor.hospital}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span>Available Today</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <DollarSign className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span>${doctor.consultationFee} Consultation fee</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                doctor.isApproved 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              }`}>
                {doctor.isApproved ? 'Available Today' : 'Pending Approval'}
              </span>
              
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                No Booking Fee
              </span>
            </div>

            <button
              onClick={() => onBookAppointment(doctor)}
              disabled={!doctor.isApproved}
              className="flex items-center px-6 py-3 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}