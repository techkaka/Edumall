import { ReactNode } from 'react';
import { User, ShoppingBag, Heart, Lock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useAuth } from './AuthContext';
import { AuthDialog } from './AuthDialog';
import { useState } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  fallback, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Authentication Required</CardTitle>
                <CardDescription>
                  Please sign in to access this page and enjoy personalized features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <User className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-xs text-blue-800 font-medium">Profile</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-xs text-green-800 font-medium">Orders</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
                    <p className="text-xs text-red-800 font-medium">Wishlist</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthDialog(true);
                    }}
                  >
                    Sign In to Continue
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthDialog(true);
                    }}
                  >
                    Create New Account
                  </Button>
                </div>

                <div className="text-center text-xs text-gray-500">
                  <p>🔒 Your data is secure and encrypted</p>
                  <p>📱 Quick mobile OTP verification</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <AuthDialog 
          isOpen={showAuthDialog} 
          onClose={() => setShowAuthDialog(false)}
          initialMode={authMode}
        />
      </div>
    );
  }

  return <>{children}</>;
}