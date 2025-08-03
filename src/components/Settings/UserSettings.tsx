import React, { useState } from 'react';
import { Bell, Lock, Globe, Moon, Sun, Shield, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

type ToggleSetting = {
  key: string;
  label: string;
  description: string;
  type: 'toggle';
  value: boolean;
  onChange?: () => void;
};

type SelectSetting = {
  key: string;
  label: string;
  description: string;
  type: 'select';
  value: string;
  options: { value: string; label: string }[];
};

type SettingItem = ToggleSetting | SelectSetting;

type SettingSection = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  settings: SettingItem[];
};

export default function UserSettings() {
  const { user } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    language: 'en',
    timezone: 'UTC-5',
    twoFactorAuth: false,
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections: SettingSection[] = [
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive notifications via email',
          type: 'toggle' as const,
          value: settings.emailNotifications
        },
        {
          key: 'smsNotifications',
          label: 'SMS Notifications',
          description: 'Receive notifications via SMS',
          type: 'toggle' as const,
          value: settings.smsNotifications
        },
        {
          key: 'appointmentReminders',
          label: 'Appointment Reminders',
          description: 'Get reminded about upcoming appointments',
          type: 'toggle' as const,
          value: settings.appointmentReminders
        },
        {
          key: 'marketingEmails',
          label: 'Marketing Emails',
          description: 'Receive promotional emails and updates',
          type: 'toggle' as const,
          value: settings.marketingEmails
        }
      ]
    },
    {
      title: 'Appearance',
      icon: isDarkMode ? Moon : Sun,
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme for the interface',
          type: 'toggle' as const,
          value: isDarkMode,
          onChange: toggleDarkMode
        }
      ]
    },
    {
      title: 'Localization',
      icon: Globe,
      settings: [
        {
          key: 'language',
          label: 'Language',
          description: 'Choose your preferred language',
          type: 'select' as const,
          value: settings.language,
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' }
          ]
        },
        {
          key: 'timezone',
          label: 'Timezone',
          description: 'Set your local timezone',
          type: 'select' as const,
          value: settings.timezone,
          options: [
            { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
            { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
            { value: 'UTC-6', label: 'Central Time (UTC-6)' },
            { value: 'UTC-5', label: 'Eastern Time (UTC-5)' }
          ]
        }
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      settings: [
        {
          key: 'twoFactorAuth',
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security to your account',
          type: 'toggle' as const,
          value: settings.twoFactorAuth
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your account preferences and settings.</p>
      </div>

      <div className="space-y-8">
        {settingSections.map((section) => (
          <div key={section.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <section.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{setting.label}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{setting.description}</p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'toggle' ? (
                        <button
                          onClick={() => setting.onChange ? setting.onChange() : handleSettingChange(setting.key, !setting.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            setting.value ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              setting.value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      ) : (
                        <select
                          value={setting.value}
                          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        >
                          {setting.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Account Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account Actions</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                Export Data
              </button>
              
              <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Shield className="w-4 h-4 mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}