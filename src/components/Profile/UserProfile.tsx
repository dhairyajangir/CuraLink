import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, Stethoscope, Edit3, Save, X, Calendar, Star, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Doctor } from '../../types';

export default function UserProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    bio: (user as Doctor)?.bio || '',
    hospital: (user as Doctor)?.hospital || '',
    address: (user as Doctor)?.address || '',
  });

  // Load existing profile image on component mount
  React.useEffect(() => {
    if (user) {
      const savedImage = localStorage.getItem(`profile_image_${user.id}`);
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, [user]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setIsUploadingImage(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (imagePreview && user) {
      setProfileImage(imagePreview);
      localStorage.setItem(`profile_image_${user.id}`, imagePreview);
      setImagePreview(null);
      
      // Update user data with image
      const updatedUser = { ...user, profileImage: imagePreview };
      localStorage.setItem('curalink_user', JSON.stringify(updatedUser));
      
      // Update in mock users storage
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const userIndex = mockUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], profileImage: imagePreview };
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      }
    }
  };

  const handleRemoveImage = () => {
    if (user) {
      setProfileImage(null);
      setImagePreview(null);
      localStorage.removeItem(`profile_image_${user.id}`);
      
      // Update user data
      const updatedUser = { ...user };
      delete (updatedUser as any).profileImage;
      localStorage.setItem('curalink_user', JSON.stringify(updatedUser));
      
      // Update in mock users storage
      const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const userIndex = mockUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        delete mockUsers[userIndex].profileImage;
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
      }
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      bio: (user as Doctor)?.bio || '',
      hospital: (user as Doctor)?.hospital || '',
      address: (user as Doctor)?.address || '',
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'doctor':
        return <Stethoscope className="w-8 h-8 text-primary-600 dark:text-primary-400" />;
      case 'admin':
        return <Award className="w-8 h-8 text-red-600 dark:text-red-400" />;
      default:
        return <User className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />;
    }
  };

  const getRoleBadge = () => {
    const badgeClasses = {
      patient: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-200',
      doctor: 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200',
      admin: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    };

    return (
      <span className={`px-3 py-1 text-sm font-medium rounded-full ${badgeClasses[user?.role || 'patient']}`}>
        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
      </span>
    );
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card">
          {/* Header */}
          <div className="p-8 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center space-x-6">
                {/* Profile Image Section */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 flex items-center justify-center">
                    {imagePreview || profileImage ? (
                      <img
                        src={imagePreview || profileImage || ''}
                        alt={user?.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getRoleIcon()
                    )}
                  </div>
                  
                  {/* Image Upload Controls */}
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2">
                      <div className="flex gap-1">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={isUploadingImage}
                          />
                          <div className="w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg">
                            {isUploadingImage ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Camera className="w-4 h-4" />
                            )}
                          </div>
                        </label>
                        
                        {(profileImage || imagePreview) && (
                          <button
                            onClick={handleRemoveImage}
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.name}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    {getRoleBadge()}
                    {user?.role === 'doctor' && (user as Doctor).isApproved && (
                      <span className="px-3 py-1 text-sm font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-200 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Verified Doctor
                      </span>
                    )}
                  </div>
                  {user?.role === 'doctor' && (
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>{(user as Doctor).specialty}</span>
                      <span>•</span>
                      <span>{(user as Doctor).experience} years experience</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {(user as Doctor).rating} ({(user as Doctor).totalReviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    {imagePreview && (
                      <button
                        onClick={handleSaveImage}
                        className="btn-accent flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Save Image
                      </button>
                    )}
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Image Upload Instructions */}
            {isEditing && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-start gap-3">
                  <ImageIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Profile Image Guidelines
                    </h4>
                    <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                      <li>• Upload a clear, professional photo</li>
                      <li>• Supported formats: JPG, PNG, GIF</li>
                      <li>• Maximum file size: 5MB</li>
                      <li>• Recommended size: 400x400 pixels</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Basic Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-field"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-white">{user?.name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Email Address</label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-900 dark:text-white">{user?.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-field"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Member Since</label>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      <span className="text-gray-900 dark:text-white">
                        {new Date(user?.createdAt || '').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Information (for doctors) */}
              {user?.role === 'doctor' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Professional Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Specialty</label>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <span className="text-gray-900 dark:text-white font-medium">{(user as Doctor).specialty}</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Experience</label>
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <span className="text-gray-900 dark:text-white font-medium">{(user as Doctor).experience} years</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Qualification</label>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <Award className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        <span className="text-gray-900 dark:text-white">{(user as Doctor).qualification}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Consultation Fee</label>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <span className="text-gray-900 dark:text-white font-medium text-lg">${(user as Doctor).consultationFee}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Hospital/Clinic</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.hospital}
                          onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                          className="input-field"
                          placeholder="Enter hospital or clinic name"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-900 dark:text-white">{(user as Doctor).hospital || 'Not provided'}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Professional Bio</label>
                      {isEditing ? (
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          rows={4}
                          className="input-field resize-none"
                          placeholder="Tell us about your expertise and experience..."
                        />
                      ) : (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <p className="text-gray-900 dark:text-white leading-relaxed">
                            {(user as Doctor).bio || 'No bio provided'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}