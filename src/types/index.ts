export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  profileImage?: string;
  phone?: string;
  createdAt: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  experience: number;
  qualification: string;
  bio: string;
  consultationFee: number;
  rating: number;
  totalReviews: number;
  isApproved: boolean;
  availability: DayAvailability[];
  hospital?: string;
  address?: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  medicalHistory?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'consultation' | 'followup' | 'emergency';
  symptoms?: string;
  notes?: string;
  fee: number;
  createdAt: string;
  patient: Patient;
  doctor: Doctor;
}

export interface DayAvailability {
  day: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>, role: User['role']) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  patient: Patient;
}