import React from 'react';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { User, LogOut, Settings, Stethoscope, ChevronDown, Menu as MenuIcon, X, Moon, Sun } from 'lucide-react';
import GlobalSearch from '../Search/GlobalSearch';
import NotificationCenter from '../Notifications/NotificationCenter';
import { Notification } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';


export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  React.useEffect(() => {
    if (!showSearch) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSearch(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showSearch]);
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

    const role = user?.role || 'patient';
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeClasses[role]}`}>
        {typeof role === 'string' ? role.charAt(0).toUpperCase() + role.slice(1) : 'Patient'}
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

  // Get current path for active nav highlighting
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 shadow-md">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-[30%] flex items-center justify-center shadow-md border border-blue-300 dark:border-blue-800/50 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
                  CuraLink
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Healthcare Platform
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 items-center justify-center space-x-4">
            {visibleNavItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={
                    `relative text-base font-medium px-3 py-2 rounded-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-primary-400/50 ` +
                    (isActive
                      ? 'bg-primary-100 dark:bg-primary-900/60 shadow-lg text-primary-700 dark:text-primary-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:shadow-lg hover:text-primary-700 dark:hover:text-primary-300')
                  }
                  style={{ boxShadow: isActive ? undefined : '0 0 0 0 transparent' }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* Search Icon Button */}
            <button
              onClick={() => setShowSearch((v) => !v)}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Open search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
            {/* Search Dropdown/Modal */}
            {showSearch && (
              <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowSearch(false)}>
                <div className="mt-32 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 relative" onClick={e => e.stopPropagation()}>
                  <GlobalSearch
                    doctors={[]}
                    appointments={[]}
                    onSelectResult={handleSearchSelect}
                  />
                </div>
              </div>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="hidden md:block">
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDelete={handleDeleteNotification}
              />
            </div>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center border-2 border-white/50 dark:border-gray-800/50">
                    {profileImage ? (
                      <img src={profileImage} alt={user?.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      getRoleIcon()
                    )}
                  </div>
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    {user?.name?.split(' ')[0] || 'User'}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
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
                <Menu.Items className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50 border border-gray-100 dark:border-gray-700">
                  <div className="p-2">
                    <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700 mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center border-2 border-white/50 dark:border-gray-800/50">
                          {profileImage ? (
                            <img src={profileImage} alt={user?.name || 'User'} className="w-full h-full object-cover" />
                          ) : (
                            getRoleIcon()
                          )}
                        </div>
                        <div>
                          <div className="text-base font-semibold text-gray-800 dark:text-white">{user?.name || 'Guest'}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user?.email || ''}</div>
                        </div>
                      </div>
                    </div>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/profile" className={`flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-150 ${active ? 'bg-primary-50 dark:bg-primary-900/40 shadow-lg text-primary-700 dark:text-primary-300' : ''}` }>
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="/settings" className={`flex items-center px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-150 ${active ? 'bg-primary-50 dark:bg-primary-900/40 shadow-lg text-primary-700 dark:text-primary-300' : ''}` }>
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={logout} className={`flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-all duration-150 ${active ? 'bg-red-50 dark:bg-red-900/30 shadow-lg text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}` }>
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={mobileMenuOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-4"
        >
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg absolute top-full left-0 right-0">
            <div className="px-5 py-6 space-y-6">
              <div className="mb-4">
                <GlobalSearch
                  doctors={[]}
                  appointments={[]}
                  onSelectResult={handleSearchSelect}
                />
              </div>

              <nav className="space-y-3">
                {visibleNavItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:shadow-lg hover:text-primary-700 dark:hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="space-y-3">
                  <a href="/profile" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:shadow-lg hover:text-primary-700 dark:hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50" onClick={() => setMobileMenuOpen(false)}>
                    <User className="w-5 h-5 mr-4" />
                    Profile
                  </a>
                  <a href="/settings" className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 rounded-xl transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/40 hover:shadow-lg hover:text-primary-700 dark:hover:text-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-400/50" onClick={() => setMobileMenuOpen(false)}>
                    <Settings className="w-5 h-5 mr-4" />
                    Settings
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 rounded-xl transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-800/50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  >
                    <LogOut className="w-5 h-5 mr-4" />
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