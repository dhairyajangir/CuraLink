import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Eye, MoreVertical } from 'lucide-react';
import { Doctor } from '../../types';

const mockPendingDoctors: Doctor[] = [
  {
    id: '4',
    email: 'dr.wilson@clinic.com',
    name: 'Dr. Emily Wilson',
    role: 'doctor',
    specialty: 'Pediatrics',
    experience: 12,
    qualification: 'MD, FAAP',
    bio: 'Dedicated pediatrician with extensive experience in child healthcare and development.',
    consultationFee: 100,
    rating: 0,
    totalReviews: 0,
    isApproved: false,
    hospital: 'Children\'s Medical Center',
    address: '789 Kids Avenue, City, State',
    phone: '+1 234 567 8903',
    availability: [],
    createdAt: '2024-01-22',
  },
  {
    id: '5',
    email: 'dr.brown@orthocenter.com',
    name: 'Dr. Robert Brown',
    role: 'doctor',
    specialty: 'Orthopedics',
    experience: 15,
    qualification: 'MD, MS Ortho',
    bio: 'Orthopedic surgeon specializing in sports medicine and joint replacement surgeries.',
    consultationFee: 180,
    rating: 0,
    totalReviews: 0,
    isApproved: false,
    hospital: 'Orthopedic Center',
    address: '321 Sports Medicine Dr, City, State',
    phone: '+1 234 567 8904',
    availability: [],
    createdAt: '2024-01-23',
  }
];

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockPendingDoctors);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return matchesSearch && !doctor.isApproved;
    if (filter === 'approved') return matchesSearch && doctor.isApproved;
    
    return matchesSearch;
  });

  const handleApprove = (doctorId: string) => {
    setDoctors(doctors.map(doctor => 
      doctor.id === doctorId ? { ...doctor, isApproved: true } : doctor
    ));
  };

  const handleReject = (doctorId: string) => {
    setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
        <p className="text-gray-600 mt-2">Review and manage doctor applications and profiles.</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            {['all', 'pending', 'approved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === status
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'pending' && (
                  <span className="ml-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {doctors.filter(d => !d.isApproved).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-xl shadow-soft border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {filter === 'pending' ? 'Pending Approvals' : 'All Doctors'}
          </h2>
        </div>

        <div className="p-6">
          {filteredDoctors.length > 0 ? (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-bold text-primary-700">
                          {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            doctor.isApproved 
                              ? 'bg-accent-100 text-accent-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doctor.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Specialty:</span> {doctor.specialty}
                          </div>
                          <div>
                            <span className="font-medium">Experience:</span> {doctor.experience} years
                          </div>
                          <div>
                            <span className="font-medium">Qualification:</span> {doctor.qualification}
                          </div>
                          <div>
                            <span className="font-medium">Fee:</span> ${doctor.consultationFee}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">Hospital:</span> {doctor.hospital}
                        </div>
                        
                        <p className="text-sm text-gray-700 line-clamp-2">{doctor.bio}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedDoctor(doctor)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {!doctor.isApproved && (
                        <>
                          <button
                            onClick={() => handleApprove(doctor.id)}
                            className="flex items-center px-3 py-1 bg-accent-600 text-white text-sm rounded-lg hover:bg-accent-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(doctor.id)}
                            className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-600">
                {filter === 'pending' 
                  ? 'No pending doctor applications at the moment.' 
                  : 'Try adjusting your search criteria.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Doctor Profile</h2>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-700">
                    {selectedDoctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDoctor.name}</h3>
                  <p className="text-primary-600 font-medium">{selectedDoctor.specialty}</p>
                  <p className="text-gray-600">{selectedDoctor.qualification}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Email:</span> {selectedDoctor.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedDoctor.phone}</p>
                    <p><span className="font-medium">Hospital:</span> {selectedDoctor.hospital}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Experience:</span> {selectedDoctor.experience} years</p>
                    <p><span className="font-medium">Consultation Fee:</span> ${selectedDoctor.consultationFee}</p>
                    <p><span className="font-medium">Applied:</span> {new Date(selectedDoctor.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
                <p className="text-gray-700">{selectedDoctor.bio}</p>
              </div>

              {!selectedDoctor.isApproved && (
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      handleApprove(selectedDoctor.id);
                      setSelectedDoctor(null);
                    }}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Approve Doctor
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedDoctor.id);
                      setSelectedDoctor(null);
                    }}
                    className="flex-1 flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}