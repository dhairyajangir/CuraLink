import React from 'react';
import { Search, Stethoscope, Users, Calendar, Shield, Star, ArrowRight } from 'lucide-react';
import SpecialtiesGrid from '../Specialties/SpecialtiesGrid';
import HealthProblemsGrid from '../HealthProblems/HealthProblemsGrid';

interface HomePageProps {
  onSpecialtyClick: (specialtyId: string) => void;
  onProblemClick: (problemId: string) => void;
}

export default function HomePage({ onSpecialtyClick, onProblemClick }: HomePageProps) {
  const features = [
    {
      icon: Stethoscope,
      title: 'Expert Doctors',
      description: 'Connect with verified and experienced healthcare professionals',
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book appointments instantly with real-time availability',
      color: 'text-secondary-600 dark:text-secondary-400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security',
      color: 'text-accent-600 dark:text-accent-400'
    },
    {
      icon: Star,
      title: 'Quality Care',
      description: 'Rated by thousands of patients for exceptional care',
      color: 'text-yellow-600 dark:text-yellow-400'
    }
  ];

  const stats = [
    { number: '2,000+', label: 'Verified Doctors' },
    { number: '50,000+', label: 'Happy Patients' },
    { number: '25+', label: 'Specialties' },
    { number: '4.8', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Health, Our
              <span className="text-primary-600 dark:text-primary-400"> Priority</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Book appointments with top doctors, manage your health records, and get the care you deserve. 
              All in one secure platform.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-6 w-6 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties, or health problems..."
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-lg"
                />
                <button className="absolute right-2 top-2 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/doctors"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <Stethoscope className="w-5 h-5 mr-2" />
                Find Doctors
              </a>
              <a
                href="/appointments"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                <Calendar className="w-5 h-5 mr-2" />
                My Appointments
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose CuraLink?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're committed to making healthcare accessible, convenient, and reliable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-medium transition-shadow">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specialties and Health Problems */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SpecialtiesGrid onSpecialtyClick={onSpecialtyClick} />
          <HealthProblemsGrid onProblemClick={onProblemClick} />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-primary-600 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Join thousands of patients who trust CuraLink for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/doctors"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary-600 transition-colors font-medium"
            >
              Browse Doctors
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}