import React, { useState } from 'react';
import { Calendar, Clock, User, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { Doctor } from '../../types';

interface AppointmentBookingProps {
  doctor: Doctor;
  onClose: () => void;
  onBookingComplete: () => void;
}

export default function AppointmentBooking({ doctor, onClose, onBookingComplete }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [symptoms, setSymptoms] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const availableDates = [
    '2024-01-25', '2024-01-26', '2024-01-27', '2024-01-29', '2024-01-30'
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const appointmentTypes = [
    { value: 'consultation', label: 'General Consultation', fee: doctor.consultationFee },
    { value: 'followup', label: 'Follow-up Visit', fee: Math.round(doctor.consultationFee * 0.7) },
    { value: 'emergency', label: 'Emergency Consultation', fee: Math.round(doctor.consultationFee * 1.5) }
  ];

  const handleBookAppointment = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    onBookingComplete();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const selectedAppointmentType = appointmentTypes.find(type => type.value === appointmentType);

  if (step === 4) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-accent-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment with {doctor.name} has been successfully booked for {formatDate(selectedDate)} at {selectedTime}.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={step === 1 ? onClose : () => setStep(step - 1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
                <p className="text-gray-600">Step {step} of 3</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-primary-700">
                  {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-primary-600">{doctor.specialty}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Date & Time Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 border rounded-lg text-center transition-colors ${
                        selectedDate === date
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 border rounded-lg text-center transition-colors ${
                          selectedTime === time
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Appointment Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Type</h3>
                <div className="space-y-3">
                  {appointmentTypes.map((type) => (
                    <label key={type.value} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="appointmentType"
                          value={type.value}
                          checked={appointmentType === type.value}
                          onChange={(e) => setAppointmentType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{type.label}</div>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-primary-600">${type.fee}</div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms / Reason for Visit
                </label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Please describe your symptoms or reason for the appointment..."
                />
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 3: Payment & Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doctor:</span>
                    <span className="font-medium">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{selectedAppointmentType?.label}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-primary-600">${selectedAppointmentType?.fee}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="payment" defaultChecked className="mr-3" />
                    <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium">Credit/Debit Card</div>
                      <div className="text-sm text-gray-500">Pay securely with your card</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleBookAppointment}
                disabled={loading}
                className="w-full bg-accent-600 text-white py-3 rounded-lg font-medium hover:bg-accent-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Processing...' : `Confirm & Pay $${selectedAppointmentType?.fee}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}