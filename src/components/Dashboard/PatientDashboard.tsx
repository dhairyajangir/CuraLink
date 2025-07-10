import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Stethoscope, Plus, Heart, Activity, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardAnalytics from '../Analytics/DashboardAnalytics';
import { Appointment } from '../../types';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Get appointment manager and subscribe to changes
      const AppointmentManager = (window as any).AppointmentManager;
      if (AppointmentManager) {
        const manager = AppointmentManager.getInstance();
        const unsubscribe = manager.subscribe((appointments: Appointment[]) => {
          // Filter appointments for this patient and future dates
          const today = new Date();
          const patientAppointments = appointments
            .filter(apt => apt.patientId === user.id)
            .filter(apt => new Date(apt.date) >= today)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 3); // Show only next 3 appointments
          
          setUpcomingAppointments(patientAppointments);
          setLoading(false);
        });

        return unsubscribe;
      } else {
        // Fallback to localStorage
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const today = new Date();
        const patientAppointments = appointments
          .filter((apt: Appointment) => apt.patientId === user.id)
          .filter((apt: Appointment) => new Date(apt.date) >= today)
          .sort((a: Appointment, b: Appointment) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3);
        
        setUpcomingAppointments(patientAppointments);
        setLoading(false);
      }
    }
  }, [user]);

  const healthMetrics = [
    { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500 dark:text-red-400' },
    { label: 'Blood Pressure', value: '120/80', icon: Activity, color: 'text-primary-500 dark:text-primary-400' },
    { label: 'BMI', value: '23.5', icon: TrendingUp, color: 'text-accent-500 dark:text-accent-400' }
  ];

  const quickActions = [
    {
      title: 'Find Doctors',
      description: 'Browse specialists',
      icon: Stethoscope,
      color: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
      href: '/doctors'
    },
    {
      title: 'Book Appointment',
      description: 'Schedule new visit',
      icon: Plus,
      color: 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400',
      href: '/doctors'
    },
    {
      title: 'My Appointments',
      description: 'View all bookings',
      icon: Calendar,
      color: 'bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400',
      href: '/appointments'
    },
    {
      title: 'Health Records',
      description: 'Medical history',
      icon: Activity,
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
      href: '/health-records'
    }
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Here's your health overview and upcoming appointments.</p>
      </div>

      {/* Analytics */}
      <div className="mb-8">
        <DashboardAnalytics userRole="patient" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <a
            key={index}
            href={action.href}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6 hover:shadow-medium transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700 group hover:scale-105"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">{action.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{action.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h2>
                <a href="/appointments" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
                  View all
                </a>
              </div>
            </div>
            <div className="p-6">
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-white">{appointment.doctor.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === 'confirmed' 
                              ? 'bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200' 
                              : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.doctor.specialty}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {appointment.date}
                          <Clock className="w-4 h-4 ml-4 mr-1" />
                          {appointment.time}
                        </div>
                        {appointment.symptoms && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Reason: {appointment.symptoms}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                  <a href="/doctors" className="mt-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">
                    Book your first appointment
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Health Metrics & Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Metrics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {healthMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700`}>
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{metric.label}</p>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Stats</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Total Appointments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">This Month</span>
                  <span className="font-semibold text-gray-900 dark:text-white">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Doctors Visited</span>
                  <span className="font-semibold text-gray-900 dark:text-white">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Pending Reports</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}