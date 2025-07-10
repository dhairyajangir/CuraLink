import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, DollarSign, TrendingUp, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardAnalytics from '../Analytics/DashboardAnalytics';
import { Appointment } from '../../types';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Get appointment manager and subscribe to changes
      const AppointmentManager = (window as any).AppointmentManager;
      if (AppointmentManager) {
        const manager = AppointmentManager.getInstance();
        const unsubscribe = manager.subscribe((appointments: Appointment[]) => {
          // Filter appointments for this doctor and today's date
          const today = new Date().toISOString().split('T')[0];
          const doctorAppointments = appointments.filter(apt => 
            apt.doctorId === user.id && apt.date === today
          );
          setTodayAppointments(doctorAppointments);
          setLoading(false);
        });

        return unsubscribe;
      } else {
        // Fallback to localStorage
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const today = new Date().toISOString().split('T')[0];
        const doctorAppointments = appointments.filter((apt: Appointment) => 
          apt.doctorId === user.id && apt.date === today
        );
        setTodayAppointments(doctorAppointments);
        setLoading(false);
      }
    }
  }, [user]);

  const quickActions = [
    {
      title: 'Set Availability',
      icon: Calendar,
      color: 'bg-primary-600 hover:bg-primary-700',
      href: '/availability'
    },
    {
      title: 'View Patients',
      icon: Users,
      color: 'bg-secondary-600 hover:bg-secondary-700',
      href: '/patients'
    },
    {
      title: 'Reports',
      icon: TrendingUp,
      color: 'bg-gray-600 hover:bg-gray-700',
      href: '/reports'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-accent-500 dark:text-accent-400" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };

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
          Good morning, {user?.name?.split(' ')[1] || user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          You have {todayAppointments.length} appointment{todayAppointments.length !== 1 ? 's' : ''} scheduled for today.
        </p>
      </div>

      {/* Analytics */}
      <div className="mb-8">
        <DashboardAnalytics userRole="doctor" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Appointments</h2>
                <a href="/my-appointments" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
                  View all
                </a>
              </div>
            </div>
            <div className="p-6">
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">{appointment.patient.name}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-1" />
                            {appointment.time}
                            <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                              {appointment.type}
                            </span>
                          </div>
                          {appointment.symptoms && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                              Symptoms: {appointment.symptoms}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(appointment.status)}
                        <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">{appointment.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointments today</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    You have a free day! Check your availability settings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & Weekly Overview */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className={`w-full flex items-center justify-center px-4 py-3 text-white rounded-lg transition-colors ${action.color}`}
                  >
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">This Week</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Appointments</span>
                  <span className="font-semibold text-gray-900 dark:text-white">32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">New Patients</span>
                  <span className="font-semibold text-gray-900 dark:text-white">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Cancelled</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Revenue</span>
                  <span className="font-semibold text-accent-600 dark:text-accent-400">$4,200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Status */}
          {user && !(user as any)?.isApproved && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Account Under Review</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Your doctor profile is currently being reviewed by our admin team. You'll receive full access once approved.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}