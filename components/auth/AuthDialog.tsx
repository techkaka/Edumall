import { useState, useEffect } from 'react';
import { Phone, Shield, ArrowLeft, CheckCircle, AlertCircle, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { useAuth } from './AuthContext';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthDialog({ isOpen, onClose, initialMode = 'login' }: AuthDialogProps) {
  const { sendOtp, login, signup, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'otp'>(initialMode);
  const [step, setStep] = useState<'mobile' | 'otp' | 'details'>('mobile');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep('mobile');
      setMobile('');
      setName('');
      setOtp('');
      setError('');
      setSuccess('');
      setTimer(0);
      setCanResend(false);
    }
  }, [isOpen, initialMode]);

  // OTP timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const validateMobile = (mobile: string): boolean => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');

    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    const success = await sendOtp(mobile);
    if (success) {
      setStep('otp');
      setTimer(30);
      setCanResend(false);
      setSuccess('OTP sent successfully!');
    } else {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    
    const success = await sendOtp(mobile);
    if (success) {
      setTimer(30);
      setCanResend(false);
      setSuccess('OTP resent successfully!');
      setError('');
    } else {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (mode === 'signup' && step === 'otp') {
      // For signup, go to details step after OTP verification
      setStep('details');
      setSuccess('Mobile number verified! Please complete your profile.');
      return;
    }

    // For login, proceed with authentication
    const success = mode === 'login' 
      ? await login(mobile, otp)
      : await signup(mobile, name, otp);

    if (success) {
      setSuccess('Authentication successful!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleCompleteSignup = async () => {
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    const success = await signup(mobile, name.trim(), otp);
    if (success) {
      setSuccess('Account created successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('mobile');
      setOtp('');
      setTimer(0);
      setCanResend(false);
    } else if (step === 'details') {
      setStep('otp');
      setName('');
    }
    setError('');
    setSuccess('');
  };

  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            {step !== 'mobile' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-1"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex-1">
              <DialogTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                {step === 'mobile' && (mode === 'login' ? 'Login to EduMall' : 'Create Account')}
                {step === 'otp' && 'Verify OTP'}
                {step === 'details' && 'Complete Profile'}
              </DialogTitle>
              <DialogDescription>
                {step === 'mobile' && 'Enter your mobile number to continue'}
                {step === 'otp' && `Enter the 6-digit OTP sent to ${mobile}`}
                {step === 'details' && 'Please provide your details to complete registration'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === 'mobile' ? 'bg-primary text-white' : 'bg-green-100 text-green-600'
            }`}>
              {step === 'mobile' ? '1' : <CheckCircle className="h-4 w-4" />}
            </div>
            <div className={`h-1 flex-1 rounded ${
              step === 'mobile' ? 'bg-gray-200' : 'bg-green-200'
            }`}>
              <div className={`h-full rounded transition-all duration-300 ${
                step === 'mobile' ? 'bg-primary w-0' : 'bg-green-500 w-full'
              }`} />
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
              step === 'otp' ? 'bg-primary text-white' : 
              step === 'details' ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
            }`}>
              {step === 'details' ? <CheckCircle className="h-4 w-4" /> : '2'}
            </div>
            {mode === 'signup' && (
              <>
                <div className={`h-1 flex-1 rounded ${
                  step === 'details' ? 'bg-green-200' : 'bg-gray-200'
                }`}>
                  <div className={`h-full bg-green-500 rounded transition-all duration-300 ${
                    step === 'details' ? 'w-full' : 'w-0'
                  }`} />
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  step === 'details' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </>
            )}
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Mobile Number Step */}
          {step === 'mobile' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="flex mt-1">
                  <div className="flex items-center px-3 border border-r-0 border-gray-200 bg-gray-50 rounded-l-md">
                    <span className="text-sm font-medium text-gray-700">+91</span>
                  </div>
                  <Input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter 10-digit mobile number"
                    className="rounded-l-none"
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  We'll send you a 6-digit OTP for verification
                </p>
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={isLoading || !validateMobile(mobile)}
                className="w-full"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-primary hover:underline font-medium"
                  >
                    {mode === 'login' ? 'Sign up' : 'Log in'}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-900">OTP sent to {mobile}</p>
                <p className="text-xs text-blue-700 mt-1">Please check your SMS inbox</p>
              </div>

              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="text-center text-lg tracking-widest font-mono"
                  maxLength={6}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {timer > 0 ? `Resend OTP in ${formatTimer(timer)}` : 'Didn\'t receive OTP?'}
                </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || isLoading}
                  className={`font-medium ${
                    canResend && !isLoading 
                      ? 'text-primary hover:underline' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Resend OTP
                </button>
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length !== 6}
                className="w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </div>
          )}

          {/* Profile Details Step (Signup Only) */}
          {step === 'details' && mode === 'signup' && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-900">Mobile number verified!</p>
                <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">
                  {mobile} ✓ Verified
                </Badge>
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                onClick={handleCompleteSignup}
                disabled={isLoading || !name.trim()}
                className="w-full"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          )}

          {/* Security Notice */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>🔒 Your information is secure and encrypted</p>
            <p>By continuing, you agree to our Terms & Privacy Policy</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}