import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  sendOtp as sendOtpApi, 
  verifyOtp, 
  logout as logoutApi, 
  getUserProfile, 
  isAuthenticated as isAuthenticatedApi,
  getAuthToken,
  clearTokens,
  User as BackendUser
} from '../../services/authService';

interface User {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  joinDate: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (mobile: string, otp: string, firstName?: string, lastName?: string, email?: string) => Promise<boolean>;
  signup: (mobile: string, name: string, otp: string, email?: string) => Promise<boolean>;
  logout: () => void;
  sendOtp: (mobile: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to convert backend user to frontend user format
function convertBackendUser(backendUser: BackendUser): User {
  return {
    id: backendUser.id,
    name: `${backendUser.first_name} ${backendUser.last_name}`.trim(),
    mobile: backendUser.phone,
    email: backendUser.email,
    joinDate: new Date().toISOString().split('T')[0], // Backend doesn't provide join date, using current date
    isVerified: backendUser.is_phone_verified
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (isAuthenticatedApi()) {
          // Try to get user profile from backend
          const backendUser = await getUserProfile();
          const frontendUser = convertBackendUser(backendUser);
          setUser(frontendUser);
        } else {
          // Check for legacy stored user
          const storedUser = localStorage.getItem('edumall_user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
            } catch (error) {
              console.error('Error parsing stored user:', error);
              localStorage.removeItem('edumall_user');
            }
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid tokens
        clearTokens();
        localStorage.removeItem('edumall_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const sendOtp = async (mobile: string): Promise<boolean> => {
    try {
      const response = await sendOtpApi(mobile);
      return response.success;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  };

  const login = async (mobile: string, otp: string, firstName?: string, lastName?: string, email?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const response = await verifyOtp({
        phone_number: mobile,
        otp: otp,
        first_name: firstName,
        last_name: lastName,
        email: email
      });
      
      if (response.success) {
        const frontendUser = convertBackendUser(response.user);
        setUser(frontendUser);
        
        // Store user data for backward compatibility
        localStorage.setItem('edumall_user', JSON.stringify(frontendUser));
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (mobile: string, name: string, otp: string, email?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Split name into first and last name
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const response = await verifyOtp({
        phone_number: mobile,
        otp: otp,
        first_name: firstName,
        last_name: lastName,
        email: email
      });
      
      if (response.success) {
        const frontendUser = convertBackendUser(response.user);
        setUser(frontendUser);
        
        // Store user data for backward compatibility
        localStorage.setItem('edumall_user', JSON.stringify(frontendUser));
        
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('edumall_user');
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    sendOtp,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}