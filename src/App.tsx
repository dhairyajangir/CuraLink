import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Layout/Header';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import DoctorsList from './components/Doctors/DoctorsList';
import AppointmentsList from './components/Appointments/AppointmentsList';
import UserProfile from './components/Profile/UserProfile';
import DoctorManagement from './components/Admin/DoctorManagement';
import UserSettings from './components/Settings/UserSettings';
import DoctorAvailability from './components/Availability/DoctorAvailability';
import HealthRecords from './components/HealthRecords/HealthRecords';
import PaymentHistory from './components/Payments/PaymentHistory';
import HomePage from './components/Home/HomePage';
import LandingPage from './components/Home/LandingPage';
import QuickBooking from './components/Appointments/QuickBooking';
import NewAppointmentBooking from './components/Appointments/NewAppointmentBooking';
import { Appointment, DayAvailability, Doctor } from './types';

// Enhanced appointment management with real-time sync
class AppointmentManager {
  private static instance: AppointmentManager;
  private appointments: Appointment[] = [];
  private listeners: Set<(appointments: Appointment[]) => void> = new Set();

  static getInstance(): AppointmentManager {
    if (!AppointmentManager.instance) {
      AppointmentManager.instance = new AppointmentManager();
    }
    return AppointmentManager.instance;
  }

  constructor() {
    this.loadAppointments();
    // Set up real-time sync interval
    setInterval(() => {
      this.syncAppointments();
    }, 1000);
  }

  private loadAppointments(): void {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      try {
        this.appointments = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading appointments:', error);
        this.appointments = this.getDefaultAppointments();
      }
    } else {
      this.appointments = this.getDefaultAppointments();
    }
    this.saveAppointments();
  }

  private getDefaultAppointments(): Appointment[] {
    return [
      {
        id: '1',
        patientId: '2',
        doctorId: '3',
        date: '2024-01-25',
        time: '10:00 AM',
        status: 'confirmed',
        type: 'consultation',
        symptoms: 'Chest pain and shortness of breath',
        fee: 150,
        createdAt: '2024-01-20',
        patient: {
          id: '2',
          email: 'john.doe@email.com',
          name: 'John Doe',
          role: 'patient',
          phone: '+1 234 567 8900',
          createdAt: '2024-01-15',
        },
        doctor: {
          id: '3',
          email: 'dr.smith@hospital.com',
          name: 'Dr. Sarah Smith',
          role: 'doctor',
          specialty: 'Cardiology',
          experience: 10,
          qualification: 'MD, FACC',
          bio: 'Experienced cardiologist',
          consultationFee: 150,
          rating: 4.8,
          totalReviews: 127,
          isApproved: true,
          hospital: 'City General Hospital',
          phone: '+1 234 567 8901',
          availability: [],
          createdAt: '2024-01-10',
        }
      }
    ];
  }

  private saveAppointments(): void {
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.notifyListeners();
  }

  private syncAppointments(): void {
    // Sync with user data and doctor availability
    const users = this.getUsersFromStorage();
    const updatedAppointments = this.appointments.map(appointment => {
      const patient = users.find(u => u.id === appointment.patientId && u.role === 'patient');
      const doctor = users.find(u => u.id === appointment.doctorId && u.role === 'doctor') as Doctor;
      
      if (patient && doctor) {
        return {
          ...appointment,
          patient,
          doctor
        };
      }
      return appointment;
    });

    // Check if appointments have changed
    if (JSON.stringify(updatedAppointments) !== JSON.stringify(this.appointments)) {
      this.appointments = updatedAppointments;
      this.saveAppointments();
    }
  }

  private getUsersFromStorage(): any[] {
    try {
      const mockUsers = localStorage.getItem('mockUsers');
      if (mockUsers) {
        return JSON.parse(mockUsers);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    }
    return [];
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.appointments]));
  }

  public subscribe(listener: (appointments: Appointment[]) => void): () => void {
    this.listeners.add(listener);
    // Immediately call with current data
    listener([...this.appointments]);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getAppointments(): Appointment[] {
    return [...this.appointments];
  }

  public getAppointmentsByUser(userId: string, role: 'patient' | 'doctor'): Appointment[] {
    return this.appointments.filter(appointment => {
      if (role === 'patient') {
        return appointment.patientId === userId;
      } else {
        return appointment.doctorId === userId;
      }
    });
  }

  public addAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    this.appointments.push(newAppointment);
    this.saveAppointments();
    
    // Update doctor availability
    this.updateDoctorAvailability(newAppointment.doctorId, newAppointment.date, newAppointment.time);
    
    return newAppointment;
  }

  public updateAppointmentStatus(appointmentId: string, status: Appointment['status']): boolean {
    const appointmentIndex = this.appointments.findIndex(apt => apt.id === appointmentId);
    if (appointmentIndex !== -1) {
      this.appointments[appointmentIndex].status = status;
      this.saveAppointments();
      return true;
    }
    return false;
  }

  public cancelAppointment(appointmentId: string): boolean {
    const appointment = this.appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      appointment.status = 'cancelled';
      this.saveAppointments();
      
      // Free up the doctor's time slot
      this.freeDoctorTimeSlot(appointment.doctorId, appointment.date, appointment.time);
      return true;
    }
    return false;
  }

  private updateDoctorAvailability(doctorId: string, date: string, time: string): void {
    const users = this.getUsersFromStorage();
    const doctorIndex = users.findIndex(u => u.id === doctorId && u.role === 'doctor');
    
    if (doctorIndex !== -1) {
      const doctor = users[doctorIndex] as Doctor;
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      
      if (doctor.availability) {
        const dayAvailability = doctor.availability.find(day => day.day === dayName);
        if (dayAvailability) {
          const timeSlot = dayAvailability.timeSlots.find(slot => slot.time === time);
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
  }

  private freeDoctorTimeSlot(doctorId: string, date: string, time: string): void {
    const users = this.getUsersFromStorage();
    const doctorIndex = users.findIndex(u => u.id === doctorId && u.role === 'doctor');
    
    if (doctorIndex !== -1) {
      const doctor = users[doctorIndex] as Doctor;
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      
      if (doctor.availability) {
        const dayAvailability = doctor.availability.find(day => day.day === dayName);
        if (dayAvailability) {
          const timeSlot = dayAvailability.timeSlots.find(slot => slot.time === time);
          if (timeSlot) {
            timeSlot.isBooked = false;
          }
        }
      }
      
      users[doctorIndex] = doctor;
      localStorage.setItem('mockUsers', JSON.stringify(users));
    }
  }
}

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {isLogin ? (
        <LoginForm onToggleMode={() => setIsLogin(false)} />
      ) : (
        <RegisterForm onToggleMode={() => setIsLogin(true)} />
      )}
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
    default:
      return <PatientDashboard />;
  }
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Initialize appointment manager and subscribe to changes
  React.useEffect(() => {
    const appointmentManager = AppointmentManager.getInstance();
    const unsubscribe = appointmentManager.subscribe(setAppointments);
    
    return unsubscribe;
  }, []);

  const handleAppointmentStatusChange = (appointmentId: string, status: Appointment['status']) => {
    const appointmentManager = AppointmentManager.getInstance();
    appointmentManager.updateAppointmentStatus(appointmentId, status);
  };

  const handleAvailabilitySave = (availability: DayAvailability[]) => {
    console.log('Saving availability:', availability);
  };

  const handleSpecialtyClick = (specialtyId: string) => {
    console.log('Specialty clicked:', specialtyId);
  };

  const handleProblemClick = (problemId: string) => {
    console.log('Problem clicked:', problemId);
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const handleBookingComplete = () => {
    setShowBooking(false);
    setSelectedDoctor(null);
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setSelectedDoctor(null);
  };

  const handleGetStarted = () => {
    window.location.href = '/auth';
  };

  // Get user-specific appointments
  const getUserAppointments = () => {
    if (!user) return [];
    
    const appointmentManager = AppointmentManager.getInstance();
    if (user.role === 'admin') {
      return appointmentManager.getAppointments();
    } else {
      return appointmentManager.getAppointmentsByUser(user.id, user.role as 'patient' | 'doctor');
    }
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/auth" 
          element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/book-appointment" 
          element={
            <ProtectedRoute>
              <QuickBooking onDoctorSelect={handleDoctorSelect} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/doctors" 
          element={
            <ProtectedRoute>
              <DoctorsList onDoctorSelect={handleDoctorSelect} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute>
              <AppointmentsList 
                appointments={getUserAppointments()}
                userRole={user?.role || 'patient'}
                onStatusChange={handleAppointmentStatusChange}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-appointments" 
          element={
            <ProtectedRoute>
              <AppointmentsList 
                appointments={getUserAppointments()}
                userRole={user?.role || 'doctor'}
                onStatusChange={handleAppointmentStatusChange}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/availability" 
          element={
            <ProtectedRoute>
              <DoctorAvailability 
                availability={[]}
                onSave={handleAvailabilitySave}
              />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/health-records" 
          element={
            <ProtectedRoute>
              <HealthRecords />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/payments" 
          element={
            <ProtectedRoute>
              <PaymentHistory />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manage-doctors" 
          element={
            <ProtectedRoute>
              <DoctorManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/home" 
          element={
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              {user && <Header />}
              <HomePage 
                onSpecialtyClick={handleSpecialtyClick}
                onProblemClick={handleProblemClick}
              />
            </div>
          } 
        />
        <Route 
          path="/" 
          element={
            user ? <Navigate to="/dashboard" replace /> : 
            <LandingPage onGetStarted={handleGetStarted} />
          } 
        />
      </Routes>

      {/* Global Booking Modal */}
      {showBooking && selectedDoctor && (
        <NewAppointmentBooking
          doctor={selectedDoctor}
          onClose={handleCloseBooking}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;