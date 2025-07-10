import React from 'react';
import { Users, UserCheck, Calendar, TrendingUp, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import DashboardAnalytics from '../Analytics/DashboardAnalytics';

export default function AdminDashboard() {
  const pendingDoctors = [
    {
      id: '1',
      name: 'Dr. Emma Johnson',
      specialty: 'Pediatrics',
      experience: '8 years',
      qualification: 'MD, FAAP',
      submittedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      experience: '12 years',
      qualification: 'MD, PhD',
      submittedAt: '2024-01-21'
    },
    {
      id: '3',
      name: 'Dr. Lisa Rodriguez',
      specialty: 'Orthopedics',
      experience: '6 years',
      qualification: 'MD, MS',
      submittedAt: '2024-01-22'
    }
  ];

  const recentActivity = [
    { action: 'New doctor registration', user: 'Dr. Sarah Wilson', time: '2 hours ago', type: 'info' },
    { action: 'Patient complaint resolved', user: 'John Doe', time: '4 hours ago', type: 'success' },
    { action: 'Payment dispute', user: 'Dr. Mike Johnson', time: '6 hours ago', type: 'warning' },
    { action: 'System maintenance completed', user: 'System', time: '1 day ago', type: 'info' }
  ];

  const quickActions = [
    {
      title: 'Manage Doctors',
      icon: Users,
      color: 'bg-primary-600 hover:bg-primary-700',
      href: '/manage-doctors'
    },
    {
      title: 'View Patients',
      icon: UserCheck,
      color: 'bg-secondary-600 hover:bg-secondary-700',
      href: '/patients'
    },
    {
      title: 'All Appointments',
      icon: Calendar,
      color: 'bg-accent-600 hover:bg-accent-700',
      href: '/appointments'
    },
    {
      title: 'Analytics',
      icon: TrendingUp,
      color: 'bg-gray-600 hover:bg-gray-700',
      href: '/analytics'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-accent-500 dark:text-accent-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500 dark:text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Monitor and manage the CuraLink platform.</p>
      </div>

      {/* Analytics */}
      <div className="mb-8">
        <DashboardAnalytics userRole="admin" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Doctor Approvals */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Doctor Approvals</h2>
                <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {pendingDoctors.length} pending
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{doctor.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialty} • {doctor.qualification}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{doctor.experience} experience • Applied {doctor.submittedAt}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-accent-600 text-white text-sm rounded-lg hover:bg-accent-700 transition-colors">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                        Reject
                      </button>
                      <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
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

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Server Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-accent-500 dark:bg-accent-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-accent-600 dark:text-accent-400">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Database</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-accent-500 dark:bg-accent-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-accent-600 dark:text-accent-400">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Payment Gateway</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-accent-500 dark:bg-accent-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-accent-600 dark:text-accent-400">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Email Service</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}