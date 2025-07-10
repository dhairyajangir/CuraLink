import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  User, 
  LogOut, 
  Settings, 
  Calendar, 
  Stethoscope,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Bell,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import NotificationCenter from '../Notifications/NotificationCenter';
import GlobalSearch from '../Search/GlobalSearch';
import { Notification, Doctor, Appointment } from '../../types';

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Smith has been confirmed for Jan 25, 2024.',
    type: 'success',
    read: false,
    createdAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    title: 'Reminder',
    message: 'You have an appointment tomorrow at 10:00 AM.',
    type: 'info',
    read: false,
    createdAt: '2024-01-24T09:00:00Z'
  }
];

export default function Header() {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Get user profile image
  const getUserProfileImage = () => {
    if (user) {
      const savedImage = localStorage.getItem(`profile_image_${user.id}`);
      return savedImage || (user as any).profileImage;
    }
    return null;
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleSearchSelect = (result: any) => {
    console.log('Selected search result:', result);
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'doctor':
        return <Stethoscope className="w-5 h-5 text-primary-600 dark:text-primary-400" />;
      case 'admin':
        return <Settings className="w-5 h-5 text-red-600 dark:text-red-400" />;
      default:
        return <User className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />;
    }
  };

  const getRoleBadge = () => {
    const badgeClasses = {
      patient: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-200',
      doctor: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200',
      admin: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[user?.role || 'patient']}`}>
        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
      </span>
    );
  };

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', roles: ['patient', 'doctor', 'admin'] },
    { href: '/doctors', label: 'Find Doctors', roles: ['patient'] },
    { href: '/appointments', label: 'My Appointments', roles: ['patient'] },
    { href: '/health-records', label: 'Health Records', roles: ['patient'] },
    { href: '/my-appointments', label: 'Appointments', roles: ['doctor'] },
    { href: '/availability', label: 'Availability', roles: ['doctor'] },
    { href: '/manage-doctors', label: 'Manage Doctors', roles: ['admin'] },
    { href: '/appointments', label: 'All Appointments', roles: ['admin'] },
  ];

  const visibleNavItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'patient')
  );

  const profileImage = getUserProfileImage();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20 shadow-sm">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  CuraLink
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Healthcare Platform
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Global Search - Optimized for laptop */}
            <div className="w-64 xl:w-80 mr-6">
              <GlobalSearch
                doctors={[]}
                appointments={[]}
                onSelectResult={handleSearchSelect}
              />
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-1">
              {visibleNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-500 transition-all duration-200 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            <div className="hidden md:block">
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDelete={handleDeleteNotification}
              />
            </div>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={user?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getRoleIcon()
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name?.split(' ')[0] || 'User'}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRoleBadge()}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
                </div>
              </Menu.Button>
              
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50 border border-gray-100 dark:border-gray-700">
                  <div className="p-2">
                    {/* User Info */}
                    <div className="px-3 py-3 border-b border-gray-100 dark:border-gray-700 mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt={user?.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            getRoleIcon()
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {user?.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/profile"
                          className={`${
                            active ? 'bg-gray-50 dark:bg-gray-700' : ''
                          } flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-150`}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/settings"
                          className={`${
                            active ? 'bg-gray-50 dark:bg-gray-700' : ''
                          } flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-150`}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={`${
                            active ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
                          } flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors duration-150`}
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition
          show={mobileMenuOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="mb-6">
                <GlobalSearch
                  doctors={[]}
                  appointments={[]}
                  onSelectResult={handleSearchSelect}
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {visibleNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center px-4 mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getRoleIcon()
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </div>
                    <div className="mt-1">
                      {getRoleBadge()}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <a
                    href="/profile"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </header>
  );
}