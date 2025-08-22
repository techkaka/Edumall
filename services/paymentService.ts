import { config } from '../utils/environment';

// Razorpay types
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface PaymentOrder {
  success: boolean;
  order_id: string;
  amount: number;
  currency: string;
  receipt: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export class PaymentService {
  private static instance: PaymentService;
  private razorpayLoaded = false;

  private constructor() {
    this.loadRazorpayScript();
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  private async loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.razorpayLoaded || window.Razorpay) {
        this.razorpayLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        this.razorpayLoaded = true;
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay script'));
      };
      document.head.appendChild(script);
    });
  }

  public async createOrder(amount: number, accessToken: string): Promise<PaymentOrder> {
    try {
      const response = await fetch(`${config.apiUrl}/payment/create-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to create payment order');
      }
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  }

  public async verifyPayment(
    paymentId: string,
    orderId: string,
    signature: string,
    accessToken: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${config.apiUrl}/payment/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          payment_id: paymentId,
          order_id: orderId,
          signature: signature,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      return { success: false, message: 'Payment verification failed' };
    }
  }

  public async initiatePayment(
    amount: number,
    userDetails: {
      name: string;
      email: string;
      phone: string;
    },
    accessToken: string,
    onSuccess: (response: RazorpayResponse) => void,
    onFailure: (error: any) => void
  ): Promise<void> {
    try {
      // Ensure Razorpay script is loaded
      await this.loadRazorpayScript();

      // Create payment order
      const order = await this.createOrder(amount, accessToken);

      // Configure Razorpay options
      const options: RazorpayOptions = {
        key: 'rzp_test_dummy_key', // This should come from backend/env in production
        amount: order.amount,
        currency: order.currency,
        name: 'EduMall',
        description: 'Payment for educational materials',
        order_id: order.order_id,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment on backend
            const verification = await this.verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature,
              accessToken
            );

            if (verification.success) {
              onSuccess(response);
            } else {
              onFailure(new Error(verification.message || 'Payment verification failed'));
            }
          } catch (error) {
            onFailure(error);
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: '#00B4D8',
        },
        modal: {
          ondismiss: () => {
            onFailure(new Error('Payment cancelled by user'));
          },
        },
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      onFailure(error);
    }
  }

  public formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  }

  public validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 500000; // Max 5 lakh rupees
  }
}

// Export singleton instance
export const paymentService = PaymentService.getInstance();

// Payment hook for React components
import { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';

export interface PaymentState {
  isProcessing: boolean;
  error: string | null;
  success: boolean;
}

export function usePayment() {
  const { user } = useAuth();
  const [paymentState, setPaymentState] = useState<PaymentState>({
    isProcessing: false,
    error: null,
    success: false,
  });

  const processPayment = async (
    amount: number,
    onSuccess?: (response: RazorpayResponse) => void,
    onFailure?: (error: any) => void
  ) => {
    if (!user) {
      setPaymentState({
        isProcessing: false,
        error: 'Please login to make payment',
        success: false,
      });
      return;
    }

    if (!paymentService.validateAmount(amount)) {
      setPaymentState({
        isProcessing: false,
        error: 'Invalid payment amount',
        success: false,
      });
      return;
    }

    setPaymentState({
      isProcessing: true,
      error: null,
      success: false,
    });

    const userDetails = {
      name: user.name || 'Customer',
      email: user.email || 'customer@example.com',
      phone: user.mobile || '',
    };

    await paymentService.initiatePayment(
      amount,
      userDetails,
      'demo-token',
      (response) => {
        setPaymentState({
          isProcessing: false,
          error: null,
          success: true,
        });
        onSuccess?.(response);
      },
      (error) => {
        setPaymentState({
          isProcessing: false,
          error: error.message || 'Payment failed',
          success: false,
        });
        onFailure?.(error);
      }
    );
  };

  const resetPaymentState = () => {
    setPaymentState({
      isProcessing: false,
      error: null,
      success: false,
    });
  };

  return {
    ...paymentState,
    processPayment,
    resetPaymentState,
    formatAmount: paymentService.formatAmount,
  };
}
