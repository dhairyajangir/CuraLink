import React, { useState } from 'react';
import { FileText, Download, Upload, Plus, Calendar, User, Stethoscope, Activity } from 'lucide-react';

interface HealthRecord {
  id: string;
  title: string;
  type: 'prescription' | 'lab_result' | 'diagnosis' | 'vaccination' | 'surgery';
  date: string;
  doctor: string;
  hospital: string;
  description: string;
  attachments?: string[];
}

const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    title: 'Annual Physical Examination',
    type: 'diagnosis',
    date: '2024-01-15',
    doctor: 'Dr. Sarah Smith',
    hospital: 'City General Hospital',
    description: 'Routine annual physical examination. All vital signs normal. Blood pressure: 120/80. Heart rate: 72 bpm.',
    attachments: ['physical_exam_report.pdf']
  },
  {
    id: '2',
    title: 'Blood Test Results',
    type: 'lab_result',
    date: '2024-01-10',
    doctor: 'Dr. Michael Johnson',
    hospital: 'Medical Lab Center',
    description: 'Complete blood count and metabolic panel. All values within normal range.',
    attachments: ['blood_test_results.pdf']
  },
  {
    id: '3',
    title: 'Hypertension Medication',
    type: 'prescription',
    date: '2024-01-08',
    doctor: 'Dr. Sarah Smith',
    hospital: 'City General Hospital',
    description: 'Prescribed Lisinopril 10mg once daily for blood pressure management.',
    attachments: ['prescription.pdf']
  }
];

export default function HealthRecords() {
  const [records, setRecords] = useState<HealthRecord[]>(mockHealthRecords);
  const [filter, setFilter] = useState<'all' | HealthRecord['type']>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredRecords = records.filter(record => 
    filter === 'all' || record.type === filter
  );

  const getTypeIcon = (type: HealthRecord['type']) => {
    switch (type) {
      case 'prescription':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'lab_result':
        return <Activity className="w-5 h-5 text-green-500" />;
      case 'diagnosis':
        return <Stethoscope className="w-5 h-5 text-purple-500" />;
      case 'vaccination':
        return <Plus className="w-5 h-5 text-red-500" />;
      case 'surgery':
        return <User className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: HealthRecord['type']) => {
    const badges = {
      prescription: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      lab_result: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      diagnosis: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      vaccination: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      surgery: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
    };

    return badges[type] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Records</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">View and manage your medical history and health documents.</p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {['all', 'prescription', 'lab_result', 'diagnosis', 'vaccination', 'surgery'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === type
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {type === 'all' ? 'All Records' : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Record
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div key={record.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {getTypeIcon(record.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{record.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadge(record.type)}`}>
                        {record.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(record.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {record.doctor}
                      </div>
                      <div className="flex items-center">
                        <Stethoscope className="w-4 h-4 mr-2" />
                        {record.hospital}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{record.description}</p>
                    
                    {record.attachments && record.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {record.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors text-sm"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            {attachment}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No health records found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {filter === 'all' 
                ? 'Upload your first health record to get started.' 
                : `No ${filter.replace('_', ' ')} records found.`}
            </p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upload Health Record</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Record Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter record title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Record Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white">
                  <option value="prescription">Prescription</option>
                  <option value="lab_result">Lab Result</option>
                  <option value="diagnosis">Diagnosis</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="surgery">Surgery</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Upload
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}