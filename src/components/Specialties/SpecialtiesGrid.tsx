import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { specialties } from '../../data/specialties';

interface SpecialtiesGridProps {
  onSpecialtyClick: (specialtyId: string) => void;
}

export default function SpecialtiesGrid({ onSpecialtyClick }: SpecialtiesGridProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Find Doctors by Specialty</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Choose from our wide range of medical specialties</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {specialties.map((specialty) => (
            <button
              key={specialty.id}
              onClick={() => onSpecialtyClick(specialty.id)}
              className="group p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-medium transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3">{specialty.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {specialty.name}
              </h3>
              <div className="flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                <Users className="w-3 h-3 mr-1" />
                {specialty.doctorCount} doctors
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            View All Specialties
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}