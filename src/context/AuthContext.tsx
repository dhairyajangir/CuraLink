import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, Doctor, Patient } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced mock data with proper user management
const initializeMockUsers = (): User[] => {
  const defaultUsers: User[] = [
    {
      id: '1',
      email: 'admin@curalink.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      email: 'john.doe@email.com',
      name: 'John Doe',
      role: 'patient',
      phone: '+1 234 567 8900',
      createdAt: '2024-01-15',
    } as Patient,
    {
      id: '3',
      email: 'dr.smith@hospital.com',
      name: 'Dr. Sarah Smith',
      role: 'doctor',
      specialty: 'Cardiology',
      experience: 10,
      qualification: 'MD, FACC',
      bio: 'Experienced cardiologist with over 10 years of practice in interventional cardiology.',
      consultationFee: 150,
      rating: 4.8,
      totalReviews: 127,
      isApproved: true,
      hospital: 'City General Hospital',
      address: '123 Medical District, City, State',
      phone: '+1 234 567 8901',
      availability: [
        {
          day: 'Monday',
          isAvailable: true,
          timeSlots: [
            { time: '09:00 AM', isBooked: false },
            { time: '10:00 AM', isBooked: false },
            { time: '11:00 AM', isBooked: false },
            { time: '02:00 PM', isBooked: false },
            { time: '03:00 PM', isBooked: false },
            { time: '04:00 PM', isBooked: false },
          ]
        },
        {
          day: 'Tuesday',
          isAvailable: true,
          timeSlots: [
            { time: '09:00 AM', isBooked: false },
            { time: '10:00 AM', isBooked: false },
            { time: '11:00 AM', isBooked: false },
            { time: '02:00 PM', isBooked: false },
            { time: '03:00 PM', isBooked: false },
            { time: '04:00 PM', isBooked: false },
          ]
        },
        {
          day: 'Wednesday',
          isAvailable: true,
          timeSlots: [
            { time: '09:00 AM', isBooked: false },
            { time: '10:00 AM', isBooked: false },
            { time: '11:00 AM', isBooked: false },
            { time: '02:00 PM', isBooked: false },
            { time: '03:00 PM', isBooked: false },
          ]
        },
        {
          day: 'Thursday',
          isAvailable: true,
          timeSlots: [
            { time: '09:00 AM', isBooked: false },
            { time: '10:00 AM', isBooked: false },
            { time: '11:00 AM', isBooked: false },
            { time: '02:00 PM', isBooked: false },
            { time: '03:00 PM', isBooked: false },
            { time: '04:00 PM', isBooked: false },
          ]
        },
        {
          day: 'Friday',
          isAvailable: true,
          timeSlots: [
            { time: '09:00 AM', isBooked: false },
            { time: '10:00 AM', isBooked: false },
            { time: '11:00 AM', isBooked: false },
            { time: '02:00 PM', isBooked: false },
          ]
        },
        {
          day: 'Saturday',
          isAvailable: true,
          timeSlots: [
            { time: '10:00 AM', isBooked: false },
            { time: '11:00 AM', isBooked: false },
            { time: '02:00 PM', isBooked: false },
            { time: '03:00 PM', isBooked: false },
          ]
        },
        {
          day: 'Sunday',
          isAvailable: false,
          timeSlots: []
        }
      ],
      createdAt: '2024-01-10',
    } as Doctor,
  ];

  // Check if users already exist in localStorage
  const existingUsers = localStorage.getItem('mockUsers');
  if (existingUsers) {
    try {
      const users = JSON.parse(existingUsers);
      // Update existing doctors with proper availability if they don't have it
      const updatedUsers = users.map((user: any) => {
        if (user.role === 'doctor' && (!user.availability || user.availability.length === 0)) {
          return {
            ...user,
            availability: getDefaultDoctorAvailability(),
            isApproved: true // Ensure doctors are approved
          };
        }
        return user;
      });
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      return updatedUsers;
    } catch (error) {
      console.error('Error parsing existing users:', error);
    }
  }

  // Save default users to localStorage
  localStorage.setItem('mockUsers', JSON.stringify(defaultUsers));
  return defaultUsers;
};

const getDefaultDoctorAvailability = () => {
  return [
    {
      day: 'Monday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
        { time: '04:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Tuesday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
        { time: '04:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Wednesday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Thursday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
        { time: '04:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Friday',
      isAvailable: true,
      timeSlots: [
        { time: '09:00 AM', isBooked: false },
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Saturday',
      isAvailable: true,
      timeSlots: [
        { time: '10:00 AM', isBooked: false },
        { time: '11:00 AM', isBooked: false },
        { time: '02:00 PM', isBooked: false },
        { time: '03:00 PM', isBooked: false },
      ]
    },
    {
      day: 'Sunday',
      isAvailable: false,
      timeSlots: []
    }
  ];
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize mock users
    initializeMockUsers();

    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('curalink_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Ensure doctor users have proper availability structure
        if (parsedUser.role === 'doctor' && (!parsedUser.availability || parsedUser.availability.length === 0)) {
          parsedUser.availability = getDefaultDoctorAvailability();
          parsedUser.isApproved = true;
          localStorage.setItem('curalink_user', JSON.stringify(parsedUser));
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('curalink_user');
      }
    }
    setLoading(false);
  }, []);

  const getMockUsers = (): User[] => {
    try {
      const users = localStorage.getItem('mockUsers');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error getting mock users:', error);
      return [];
    }
  };

  const updateMockUsers = (users: User[]): void => {
    try {
      localStorage.setItem('mockUsers', JSON.stringify(users));
    } catch (error) {
      console.error('Error updating mock users:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Call backend API
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setLoading(false);
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      localStorage.setItem('curalink_user', JSON.stringify(data.user));
      localStorage.setItem('jwt', data.token);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const register = async (userData: Partial<User>, role: User['role']): Promise<boolean> => {
    setLoading(true);
    try {
      // Call backend API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData, role }),
      });
      if (!res.ok) {
        setLoading(false);
        return false;
      }
      const data = await res.json();
      setUser(data.user);
      localStorage.setItem('curalink_user', JSON.stringify(data.user));
      localStorage.setItem('jwt', data.token);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('curalink_user');
  };

  // Expose AppointmentManager globally for components to use
  React.useEffect(() => {
    // Make AppointmentManager available globally
    (window as any).AppointmentManager = class AppointmentManager {
      private static instance: any;
      private appointments: any[] = [];
      private listeners: Set<(appointments: any[]) => void> = new Set();

      static getInstance() {
        if (!AppointmentManager.instance) {
          AppointmentManager.instance = new AppointmentManager();
        }
        return AppointmentManager.instance;
      }

      constructor() {
        this.loadAppointments();
      }

      private loadAppointments() {
        const stored = localStorage.getItem('appointments');
        if (stored) {
          try {
            this.appointments = JSON.parse(stored);
          } catch (error) {
            console.error('Error loading appointments:', error);
            this.appointments = [];
          }
        }
      }

      private saveAppointments() {
        localStorage.setItem('appointments', JSON.stringify(this.appointments));
        this.notifyListeners();
      }

      private notifyListeners() {
        this.listeners.forEach(listener => listener([...this.appointments]));
      }

      addAppointment(appointmentData: any) {
        const newAppointment = {
          ...appointmentData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        this.appointments.push(newAppointment);
        this.saveAppointments();
        
        // Update doctor availability
        this.updateDoctorAvailability(appointmentData.doctorId, appointmentData.date, appointmentData.time);
        
        return newAppointment;
      }

      private updateDoctorAvailability(doctorId: string, date: string, time: string) {
        try {
          const users = JSON.parse(localStorage.getItem('mockUsers') || '[]');
          const doctorIndex = users.findIndex((u: any) => u.id === doctorId && u.role === 'doctor');
          
          if (doctorIndex !== -1) {
            const doctor = users[doctorIndex];
            const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
            
            if (doctor.availability) {
              const dayAvailability = doctor.availability.find((day: any) => day.day === dayName);
              if (dayAvailability) {
                const timeSlot = dayAvailability.timeSlots.find((slot: any) => slot.time === time);
                if (timeSlot) {
                  timeSlot.isBooked = true;
                }
              }
            }
            
            users[doctorIndex] = doctor;
            localStorage.setItem('mockUsers', JSON.stringify(users));
            
            // Update current user if it's the doctor
            const currentUser = localStorage.getItem('curalink_user');
            if (currentUser) {
              const user = JSON.parse(currentUser);
              if (user.id === doctorId) {
                localStorage.setItem('curalink_user', JSON.stringify(doctor));
              }
            }
          }
        } catch (error) {
          console.error('Error updating doctor availability:', error);
        }
      }

      getAppointments() {
        return [...this.appointments];
      }

      getAppointmentsByUser(userId: string, role: 'patient' | 'doctor') {
        return this.appointments.filter(appointment => {
          if (role === 'patient') {
            return appointment.patientId === userId;
          } else {
            return appointment.doctorId === userId;
          }
        });
      }

      updateAppointmentStatus(appointmentId: string, status: string) {
        const appointmentIndex = this.appointments.findIndex(apt => apt.id === appointmentId);
        if (appointmentIndex !== -1) {
          this.appointments[appointmentIndex].status = status;
          this.saveAppointments();
          return true;
        }
        return false;
      }

      subscribe(listener: (appointments: any[]) => void) {
        this.listeners.add(listener);
        listener([...this.appointments]);
        return () => {
          this.listeners.delete(listener);
        };
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}