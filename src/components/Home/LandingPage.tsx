import React from 'react';
import { Search, Stethoscope, Users, Calendar, Shield, Star, ArrowRight, CheckCircle, Play, Heart, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Stethoscope,
      title: 'Expert Doctors',
      description: 'Connect with 2000+ verified healthcare professionals across 40+ specialties',
      color: 'text-primary-600 dark:text-primary-400'
    },
    {
      icon: Calendar,
      title: 'Instant Booking',
      description: 'Book appointments in under 60 seconds with real-time availability',
      color: 'text-secondary-600 dark:text-secondary-400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with bank-grade security and HIPAA compliance',
      color: 'text-accent-600 dark:text-accent-400'
    },
    {
      icon: Star,
      title: 'Quality Care',
      description: 'Average 4.8/5 rating from 50,000+ patients who trust our platform',
      color: 'text-yellow-600 dark:text-yellow-400'
    }
  ];

  const stats = [
    { number: '2,000+', label: 'Verified Doctors', icon: Stethoscope },
    { number: '50,000+', label: 'Happy Patients', icon: Users },
    { number: '40+', label: 'Specialties', icon: Heart },
    { number: '4.8/5', label: 'Average Rating', icon: Star }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'CuraLink made it so easy to find a great cardiologist. The booking process was seamless and the doctor was excellent.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Cardiologist',
      content: 'As a doctor, I love how CuraLink helps me manage my appointments efficiently. The platform is intuitive and professional.',
      rating: 5,
      avatar: '👨‍⚕️'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Patient',
      content: 'Found the perfect pediatrician for my daughter within minutes. The reviews and ratings helped me make the right choice.',
      rating: 5,
      avatar: '👩‍🦰'
    }
  ];

  const specialties = [
    { name: 'Cardiology', icon: '❤️', count: '156 doctors' },
    { name: 'Dermatology', icon: '🧴', count: '112 doctors' },
    { name: 'Pediatrics', icon: '👶', count: '167 doctors' },
    { name: 'Orthopedics', icon: '🦴', count: '123 doctors' },
    { name: 'Neurology', icon: '🧠', count: '89 doctors' },
    { name: 'Gynecology', icon: '👩‍⚕️', count: '145 doctors' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container relative py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 50,000+ patients
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Your Health,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600"> Our Priority</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Book appointments with top doctors, manage your health records, and get the care you deserve. 
                All in one secure, easy-to-use platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={onGetStarted}
                  className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <Link
                  to="/doctors"
                  className="btn-secondary text-lg px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Find Doctors
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  <span>No booking fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  <span>Instant confirmation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent-500" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Dr. Sarah Johnson</h3>
                    <p className="text-primary-600 dark:text-primary-400">Cardiologist</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Next Available</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Today 2:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Consultation Fee</span>
                    <span className="font-semibold text-gray-900 dark:text-white">$80</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900 dark:text-white">4.9 (156 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full btn-primary mt-6 py-3 rounded-xl">
                  Book Appointment
                </button>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose CuraLink?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing healthcare by making it accessible, convenient, and reliable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Find Doctors by Specialty
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose from our wide range of medical specialties
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map((specialty, index) => (
              <Link
                key={index}
                to="/doctors"
                className="group p-6 bg-white dark:bg-gray-900 rounded-2xl text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {specialty.icon}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {specialty.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {specialty.count}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/doctors"
              className="btn-primary text-lg px-8 py-4 rounded-xl inline-flex items-center gap-2"
            >
              View All Specialties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Book your appointment in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Search & Choose
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find the right doctor by specialty, location, or symptoms. Read reviews and compare ratings.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Book Instantly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select your preferred date and time from available slots. Secure payment with instant confirmation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Get Care
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Attend your appointment and receive quality healthcare. Access your records anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of satisfied patients and doctors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust CuraLink for their healthcare needs. 
            Start your journey to better health today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            <Link
              to="/doctors"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              Browse Doctors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}