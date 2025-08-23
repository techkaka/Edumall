import { useState } from 'react';
import { User, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth } from './AuthContext';

interface NameCollectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userMobile: string;
}

export function NameCollectionDialog({ isOpen, onClose, userMobile }: NameCollectionDialogProps) {
  const { updateName, isLoading } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!firstName.trim()) {
      setError('Please enter your first name');
      return;
    }

    if (firstName.trim().length < 2) {
      setError('First name must be at least 2 characters long');
      return;
    }

    if (!lastName.trim()) {
      setError('Please enter your last name');
      return;
    }

    if (lastName.trim().length < 2) {
      setError('Last name must be at least 2 characters long');
      return;
    }

    try {
      const success = await updateName(firstName.trim(), lastName.trim());
      if (success) {
        setSuccess('Name updated successfully!');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Failed to update name. Please try again.');
      }
    } catch (error: any) {
      console.error('Name update error:', error);
      setError(error.message || 'Failed to update name. Please try again.');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFirstName('');
      setLastName('');
      setError('');
      setSuccess('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-gradient-to-br from-white via-green-50/30 to-white border-0 shadow-2xl">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Welcome to EduMall!</h2>
                    <p className="text-green-100 text-sm">Let's personalize your experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Success Message */}
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-green-900 mb-2">Account Created Successfully!</h3>
            <p className="text-sm text-green-700 mb-3">Your mobile number has been verified</p>
            <div className="text-sm text-green-600">
              +91 {userMobile} ✓ Verified
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50/80 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">{success}</AlertDescription>
            </Alert>
          )}

          {/* Name Input Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                First Name *
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="pl-12 py-3 border-2 border-gray-200 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 rounded-xl text-lg"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="py-3 border-2 border-gray-200 focus:border-green-600 focus:ring-4 focus:ring-green-600/10 rounded-xl text-lg"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !firstName.trim() || !lastName.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Updating Profile...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Complete Setup</span>
              </div>
            )}
          </Button>

          {/* Info Text */}
          <div className="text-center space-y-2 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              This helps us personalize your experience and provide better customer support
            </p>
            <p className="text-xs text-gray-400">
              You can update this information anytime from your account settings
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
