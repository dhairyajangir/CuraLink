import React, { useState } from 'react';
import { CreditCard, Download, Filter, Calendar, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Payment {
  id: string;
  appointmentId: string;
  doctorName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  method: 'card' | 'paypal' | 'bank_transfer';
  date: string;
  transactionId: string;
  description: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    appointmentId: 'apt_001',
    doctorName: 'Dr. Sarah Smith',
    amount: 150,
    status: 'completed',
    method: 'card',
    date: '2024-01-20T10:00:00Z',
    transactionId: 'txn_1234567890',
    description: 'Cardiology consultation'
  },
  {
    id: '2',
    appointmentId: 'apt_002',
    doctorName: 'Dr. Michael Johnson',
    amount: 120,
    status: 'completed',
    method: 'paypal',
    date: '2024-01-15T14:30:00Z',
    transactionId: 'txn_0987654321',
    description: 'Dermatology follow-up'
  },
  {
    id: '3',
    appointmentId: 'apt_003',
    doctorName: 'Dr. Emily Wilson',
    amount: 100,
    status: 'pending',
    method: 'card',
    date: '2024-01-25T09:00:00Z',
    transactionId: 'txn_1122334455',
    description: 'Pediatric consultation'
  }
];

export default function PaymentHistory() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [filter, setFilter] = useState<'all' | Payment['status']>('all');
  const [dateRange, setDateRange] = useState('all');

  const filteredPayments = payments.filter(payment => {
    if (filter !== 'all' && payment.status !== filter) return false;
    
    if (dateRange !== 'all') {
      const paymentDate = new Date(payment.date);
      const now = new Date();
      
      switch (dateRange) {
        case 'week':
          return paymentDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case 'month':
          return paymentDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        case 'year':
          return paymentDate >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      }
    }
    
    return true;
  });

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'refunded':
        return <XCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Payment['status']) => {
    const badges = {
      completed: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      pending: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      failed: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
      refunded: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
    };
    return badges[status];
  };

  const getMethodIcon = (method: Payment['method']) => {
    switch (method) {
      case 'card':
        return <CreditCard className="w-4 h-4" />;
      case 'paypal':
        return <DollarSign className="w-4 h-4" />;
      case 'bank_transfer':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const totalAmount = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment History</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">View and manage your payment transactions.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${payments.filter(p => {
                  const paymentDate = new Date(p.date);
                  const now = new Date();
                  return paymentDate.getMonth() === now.getMonth() && 
                         paymentDate.getFullYear() === now.getFullYear() &&
                         p.status === 'completed';
                }).reduce((sum, p) => sum + p.amount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Transactions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{payments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {['all', 'completed', 'pending', 'failed', 'refunded'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === status
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'all' ? 'All Payments' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Transactions</h2>
        </div>

        <div className="p-6">
          {filteredPayments.length > 0 ? (
            <div className="space-y-4">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        {getMethodIcon(payment.method)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{payment.description}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(payment.status)}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div>
                            <span className="font-medium">Doctor:</span> {payment.doctorName}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {new Date(payment.date).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="font-medium">Method:</span> {payment.method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </div>
                          <div>
                            <span className="font-medium">Transaction ID:</span> {payment.transactionId}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {getStatusIcon(payment.status)}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          ${payment.amount}
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payments found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {filter === 'all' 
                  ? 'No payment transactions yet.' 
                  : `No ${filter} payments found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}