import React from 'react';
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Clock } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
}

function AnalyticsCard({ title, value, change, trend, icon: Icon, color }: AnalyticsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`flex items-center ${trend === 'up' ? 'text-accent-600 dark:text-accent-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="text-sm font-medium">{change}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">vs last month</p>
        </div>
      </div>
    </div>
  );
}

interface DashboardAnalyticsProps {
  userRole: 'patient' | 'doctor' | 'admin';
}

export default function DashboardAnalytics({ userRole }: DashboardAnalyticsProps) {
  const getAnalyticsData = () => {
    switch (userRole) {
      case 'admin':
        return [
          {
            title: 'Total Users',
            value: '2,847',
            change: '+12%',
            trend: 'up' as const,
            icon: Users,
            color: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
          },
          {
            title: 'Active Doctors',
            value: '156',
            change: '+8%',
            trend: 'up' as const,
            icon: Users,
            color: 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400'
          },
          {
            title: 'Monthly Appointments',
            value: '1,234',
            change: '+15%',
            trend: 'up' as const,
            icon: Calendar,
            color: 'bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400'
          },
          {
            title: 'Platform Revenue',
            value: '$45,230',
            change: '+22%',
            trend: 'up' as const,
            icon: DollarSign,
            color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
          }
        ];
      
      case 'doctor':
        return [
          {
            title: 'Total Patients',
            value: '342',
            change: '+18%',
            trend: 'up' as const,
            icon: Users,
            color: 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400'
          },
          {
            title: 'This Month',
            value: '47',
            change: '+12%',
            trend: 'up' as const,
            icon: Calendar,
            color: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
          },
          {
            title: 'Monthly Earnings',
            value: '$12,450',
            change: '+25%',
            trend: 'up' as const,
            icon: DollarSign,
            color: 'bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400'
          },
          {
            title: 'Avg. Rating',
            value: '4.8',
            change: '+0.2',
            trend: 'up' as const,
            icon: TrendingUp,
            color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
          }
        ];
      
      default: // patient
        return [
          {
            title: 'Total Appointments',
            value: '24',
            change: '+3',
            trend: 'up' as const,
            icon: Calendar,
            color: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
          },
          {
            title: 'This Month',
            value: '3',
            change: '+1',
            trend: 'up' as const,
            icon: Clock,
            color: 'bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400'
          },
          {
            title: 'Doctors Visited',
            value: '8',
            change: '+2',
            trend: 'up' as const,
            icon: Users,
            color: 'bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400'
          },
          {
            title: 'Health Score',
            value: '85%',
            change: '+5%',
            trend: 'up' as const,
            icon: TrendingUp,
            color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
          }
        ];
    }
  };

  const analyticsData = getAnalyticsData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {analyticsData.map((item, index) => (
        <AnalyticsCard key={index} {...item} />
      ))}
    </div>
  );
}