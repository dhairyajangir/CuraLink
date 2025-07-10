import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CheckCircle, CreditCard, Shield, Clock, Play } from 'lucide-react';

interface PayPalPaymentProps {
  amount: number;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

export default function PayPalPayment({
  amount,
  doctorName,
  appointmentDate,
  appointmentTime,
  onSuccess,
  onError,
  onCancel
}: PayPalPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const paypalOptions = {
    "client-id": "test", // Replace with your PayPal client ID
    currency: "USD",
    intent: "capture"
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: "USD"
          },
          description: `Medical consultation with ${doctorName} on ${appointmentDate} at ${appointmentTime}`
        }
      ]
    });
  };

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    try {
      const details = await actions.order.capture();
      setPaymentComplete(true);
      setTimeout(() => {
        onSuccess(details.id);
      }, 2000);
    } catch (error) {
      onError('Payment processing failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const onErrorHandler = (err: any) => {
    console.error('PayPal Error:', err);
    onError('Payment failed. Please try again or use a different payment method.');
  };

  const handleDemoPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setTimeout(() => {
        onSuccess('demo_payment_' + Date.now());
      }, 2000);
    }, 1500);
  };

  if (paymentComplete) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-accent-600 dark:text-accent-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your appointment has been confirmed and you'll receive a confirmation email shortly.
        </p>
        <div className="animate-pulse text-primary-600 dark:text-primary-400">
          Redirecting to your appointments...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        {/* Payment Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Payment Summary
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Doctor:</span>
              <span className="font-medium text-gray-900 dark:text-white">{doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Date & Time:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {appointmentDate} at {appointmentTime}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">${amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Mode Notice */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Play className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Demo Mode Available
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                For demonstration purposes, you can skip the payment process and proceed directly.
              </p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-accent-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-accent-500" />
              <span>Instant Confirmation</span>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          {isProcessing ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Processing your payment...</p>
            </div>
          ) : (
            <>
              {/* Demo Payment Button */}
              <button
                onClick={handleDemoPayment}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Demo Payment (Skip for Demo)
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">or pay with</span>
                </div>
              </div>

              {/* PayPal Payment */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">PayPal</span>
                </div>

                <PayPalScriptProvider options={paypalOptions}>
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onErrorHandler}
                    onCancel={onCancel}
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      label: "paypal"
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </>
          )}
        </div>

        {/* Alternative Payment Methods */}
        {!isProcessing && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
              Other payment methods
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Credit Card</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <span className="text-sm">💳</span>
                <span className="text-sm">Debit Card</span>
              </button>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                100% Secure Payment
              </h4>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                Your payment information is encrypted and secure. We never store your payment details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}