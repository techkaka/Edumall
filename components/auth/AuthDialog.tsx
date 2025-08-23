import { useState, useEffect } from 'react';
import { Phone, Shield, ArrowLeft, CheckCircle, AlertCircle, User, Lock, Eye, EyeOff, Sparkles, Star } from 'lucide-react';
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
  const [showOtp, setShowOtp] = useState(false);

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
      setShowOtp(false);
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

    try {
      if (mode === 'login') {
        // For login, proceed with authentication
        const success = await login(mobile, otp);
        
        if (success) {
          setSuccess('Login successful!');
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } else {
        // For signup, go to details step after OTP verification
        setStep('details');
        setSuccess('Mobile number verified! Please complete your profile.');
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      setError(error.message || 'OTP verification failed. Please try again.');
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

    try {
      const success = await signup(mobile, name.trim(), otp);
      if (success) {
        setSuccess('Account created successfully!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
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
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white border-0 shadow-2xl">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-primary via-blue1 to-blue2 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3">
              {step !== 'mobile' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {step === 'mobile' && (mode === 'login' ? 'Welcome Back!' : 'Join EduMall')}
                      {step === 'otp' && 'Verify Your Number'}
                      {step === 'details' && 'Complete Profile'}
                    </h2>
                    <p className="text-blue-100 text-sm">
                      {step === 'mobile' && (mode === 'login' ? 'Sign in to continue your learning journey' : 'Create your account to get started')}
                      {step === 'otp' && `Enter the 6-digit code sent to ${mobile}`}
                      {step === 'details' && 'Just one more step to complete your registration'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step === 'mobile' 
                ? 'bg-gradient-to-r from-primary to-blue1 text-white shadow-lg' 
                : 'bg-green-100 text-green-600 border-2 border-green-200'
            }`}>
              {step === 'mobile' ? '1' : <CheckCircle className="h-5 w-5" />}
            </div>
            <div className={`h-1 w-16 rounded-full transition-all duration-300 ${
              step === 'mobile' ? 'bg-gray-200' : 'bg-gradient-to-r from-green-400 to-green-500'
            }`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step === 'otp' 
                ? 'bg-gradient-to-r from-primary to-blue1 text-white shadow-lg' : 
              step === 'details' 
                ? 'bg-green-100 text-green-600 border-2 border-green-200' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step === 'details' ? <CheckCircle className="h-5 w-5" /> : '2'}
            </div>
            {mode === 'signup' && (
              <>
                <div className={`h-1 w-16 rounded-full transition-all duration-300 ${
                  step === 'details' ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gray-200'
                }`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === 'details' 
                    ? 'bg-gradient-to-r from-primary to-blue1 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
              </>
            )}
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50/80 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">{success}</AlertDescription>
            </Alert>
          )}

          {/* Mobile Number Step */}
          {step === 'mobile' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-semibold text-gray-700">
                  Mobile Number
                </Label>
                <div className="relative">
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200">
                    <div className="flex items-center px-4 py-3 bg-gray-50 border-r border-gray-200">
                      <span className="text-sm font-semibold text-gray-700">+91</span>
                    </div>
                    <Input
                      id="mobile"
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter your mobile number"
                      className="border-0 focus:ring-0 text-lg py-3 px-4"
                      maxLength={10}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    We'll send you a secure 6-digit OTP for verification
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={isLoading || !validateMobile(mobile)}
                className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Send OTP</span>
                  </div>
                )}
              </Button>

              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span>or</span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                <p className="text-sm text-gray-600">
                  {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                    className="text-primary hover:text-blue1 font-semibold transition-colors"
                  >
                    {mode === 'login' ? 'Create Account' : 'Sign In'}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">OTP Sent Successfully!</h3>
                <p className="text-sm text-blue-700 mb-3">We've sent a 6-digit code to</p>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 text-sm font-semibold">
                  +91 {mobile}
                </Badge>
                <p className="text-xs text-blue-600 mt-3">Please check your SMS inbox</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="otp" className="text-sm font-semibold text-gray-700">
                  Enter OTP
                </Label>
                <div className="relative">
                  <Input
                    id="otp"
                    type={showOtp ? "text" : "password"}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="text-center text-2xl tracking-widest font-mono border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl py-4"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOtp(!showOtp)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showOtp ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {timer > 0 ? (
                    <span className="flex items-center space-x-1">
                      <div className="w-3 h-3 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                      <span>Resend in {formatTimer(timer)}</span>
                    </span>
                  ) : (
                    "Didn't receive OTP?"
                  )}
                </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || isLoading}
                  className={`font-semibold transition-colors ${
                    canResend && !isLoading 
                      ? 'text-primary hover:text-blue1' 
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Resend OTP
                </button>
              </div>

              <Button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>{mode === 'login' ? 'Sign In' : 'Continue'}</span>
                  </div>
                )}
              </Button>
            </div>
          )}

          {/* Profile Details Step (Signup Only) */}
          {step === 'details' && mode === 'signup' && (
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">Mobile Verified!</h3>
                <p className="text-sm text-green-700 mb-3">Your mobile number has been successfully verified</p>
                <Badge className="bg-green-100 text-green-800 border-green-200 px-4 py-2 text-sm font-semibold">
                  +91 {mobile} ✓ Verified
                </Badge>
              </div>

              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-12 py-3 border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl text-lg"
                  />
                </div>
              </div>

              <Button
                onClick={handleCompleteSignup}
                disabled={isLoading || !name.trim()}
                className="w-full bg-gradient-to-r from-primary to-blue1 hover:from-blue1 hover:to-blue2 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>
            </div>
          )}

          {/* Security Notice */}
          <div className="text-center space-y-2 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
              <Lock className="h-3 w-3" />
              <span>Your information is secure and encrypted</span>
            </div>
            <p className="text-xs text-gray-400">
              By continuing, you agree to our{' '}
              <button className="text-primary hover:underline">Terms of Service</button>
              {' '}and{' '}
              <button className="text-primary hover:underline">Privacy Policy</button>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-green-500" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-blue-500" />
              <span>Trusted by 10K+</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}