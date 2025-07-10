import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, MapPin, MoreVertical, CheckCircle, XCircle, AlertCircle, Download, Mail } from 'lucide-react';
import { Appointment } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';
import { AppointmentCardSkeleton } from '../Common/SkeletonLoader';

interface AppointmentsListProps {
  appointments: Appointment[];
  userRole: 'patient' | 'doctor' | 'admin';
  onStatusChange?: (appointmentId: string, status: Appointment['status']) => void;
}

export default function AppointmentsList({ appointments, userRole, onStatusChange }: AppointmentsListProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [showExportModal, setShowExportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Simulate loading
  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appointment => 
    filter === 'all' || appointment.status === filter
  );

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-accent-500 dark:text-accent-400" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-200';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const exportToGoogleSheets = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate Google Sheets integration
    const csvData = filteredAppointments.map(apt => ({
      Date: apt.date,
      Time: apt.time,
      Patient: apt.patient.name,
      Doctor: apt.doctor.name,
      Status: apt.status,
      Fee: apt.fee,
      Type: apt.type,
      Symptoms: apt.symptoms || 'N/A'
    }));

    // Convert to CSV
    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    setIsExporting(false);
    setShowExportModal(false);
    
    // Show success message
    setTimeout(() => {
      alert('Appointment data exported and email sent successfully!');
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="card">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
          <div className="p-6 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <AppointmentCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="card">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {userRole === 'patient' ? 'My Appointments' : 
                 userRole === 'doctor' ? 'Patient Appointments' : 'All Appointments'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    filter === status
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {userRole === 'doctor' && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setShowExportModal(true)}
                disabled={isExporting}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isExporting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {isExporting ? 'Exporting...' : 'Export to Sheets'}
              </button>
              <button
                onClick={exportToGoogleSheets}
                disabled={isExporting}
                className="btn-secondary flex items-center gap-2 disabled:opacity-50"
              >
                <Mail className="w-4 h-4" />
                Email Report
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 hover:shadow-medium transition-all duration-200 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center">
                            <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                              {userRole === 'patient' ? appointment.doctor.name : appointment.patient.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                              {userRole === 'patient' ? appointment.doctor.specialty : appointment.patient.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(appointment.status)}
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 text-center">💰</span>
                          <span>${appointment.fee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 text-center">📋</span>
                          <span>{appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}</span>
                        </div>
                      </div>

                      {appointment.symptoms && (
                        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                          </p>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                          <p className="text-sm text-green-800 dark:text-green-200">
                            <span className="font-medium">Doctor's Notes:</span> {appointment.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action buttons for doctors */}
                    {userRole === 'doctor' && appointment.status === 'pending' && onStatusChange && (
                      <div className="ml-6 flex flex-col gap-2">
                        <button
                          onClick={() => onStatusChange(appointment.id, 'confirmed')}
                          className="px-4 py-2 bg-accent-600 text-white text-sm rounded-lg hover:bg-accent-700 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => onStatusChange(appointment.id, 'cancelled')}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No appointments found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === 'all' 
                  ? 'No appointments scheduled yet.' 
                  : `No ${filter} appointments found.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Export Appointments</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Export your appointment data to Google Sheets and receive a copy via email.
            </p>
            <div className="flex gap-3">
              <button
                onClick={exportToGoogleSheets}
                disabled={isExporting}
                className="flex-1 btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Exporting...
                  </>
                ) : (
                  'Export & Email'
                )}
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                disabled={isExporting}
                className="flex-1 btn-secondary disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}