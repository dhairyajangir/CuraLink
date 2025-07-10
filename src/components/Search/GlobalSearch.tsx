import React, { useState, useEffect } from 'react';
import { Search, User, Stethoscope, Calendar, Clock, Loader2 } from 'lucide-react';
import { Doctor, Appointment } from '../../types';

interface SearchResult {
  type: 'doctor' | 'appointment';
  id: string;
  title: string;
  subtitle: string;
  data: Doctor | Appointment;
}

interface GlobalSearchProps {
  doctors: Doctor[];
  appointments: Appointment[];
  onSelectResult: (result: SearchResult) => void;
}

export default function GlobalSearch({ doctors, appointments, onSelectResult }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay for realistic loading experience
    const searchTimeout = setTimeout(() => {
      const searchResults: SearchResult[] = [];

      // Search doctors
      doctors
        .filter(doctor => 
          doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
        .forEach(doctor => {
          searchResults.push({
            type: 'doctor',
            id: doctor.id,
            title: doctor.name,
            subtitle: doctor.specialty,
            data: doctor
          });
        });

      // Search appointments
      appointments
        .filter(appointment => 
          appointment.doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          appointment.patient.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 3)
        .forEach(appointment => {
          searchResults.push({
            type: 'appointment',
            id: appointment.id,
            title: `Appointment with ${appointment.doctor.name}`,
            subtitle: `${appointment.date} at ${appointment.time}`,
            data: appointment
          });
        });

      setResults(searchResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query, doctors, appointments]);

  const handleSelectResult = (result: SearchResult) => {
    onSelectResult(result);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search doctors, appointments..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <Loader2 className="h-4 w-4 text-gray-400 dark:text-gray-500 animate-spin" />
          </div>
        )}
      </div>

      {isOpen && (query.length >= 2 || results.length > 0) && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">
                <Loader2 className="w-6 h-6 text-gray-400 dark:text-gray-500 animate-spin mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Searching...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleSelectResult(result)}
                    className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 text-left transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${
                      result.type === 'doctor' 
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                        : 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400'
                    }`}>
                      {result.type === 'doctor' ? (
                        <Stethoscope className="w-4 h-4" />
                      ) : (
                        <Calendar className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {result.subtitle}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 capitalize">
                      {result.type}
                    </div>
                  </button>
                ))}
              </div>
            ) : query.length >= 2 ? (
              <div className="p-4 text-center">
                <Search className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No results found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try different keywords</p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}