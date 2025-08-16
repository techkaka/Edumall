import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  login: (mobile: string, otp: string) => Promise<boolean>;
  signup: (mobile: string, name: string, otp: string) => Promise<boolean>;
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('edumall_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('edumall_user');
      }
    }
    setIsLoading(false);
  }, []);

  const sendOtp = async (mobile: string): Promise<boolean> => {
    try {
      // Simulate API call to send OTP
      console.log(`Sending OTP to ${mobile}`);
      
      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful OTP send
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the mobile number temporarily for validation
      sessionStorage.setItem('otp_mobile', mobile);
      
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  };

  const login = async (mobile: string, otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate OTP verification
      const storedMobile = sessionStorage.getItem('otp_mobile');
      if (storedMobile !== mobile) {
        throw new Error('Invalid mobile number');
      }
      
      // For demo purposes, accept any 6-digit OTP
      if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        throw new Error('Invalid OTP format');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user object (in real app, this would come from API)
      const userData: User = {
        id: Date.now().toString(),
        name: 'Rahul Kumar', // In real app, fetch from database
        mobile: mobile,
        email: 'rahul.kumar@email.com',
        joinDate: new Date().toISOString().split('T')[0],
        isVerified: true
      };
      
      setUser(userData);
      localStorage.setItem('edumall_user', JSON.stringify(userData));
      sessionStorage.removeItem('otp_mobile');
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (mobile: string, name: string, otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate OTP verification
      const storedMobile = sessionStorage.getItem('otp_mobile');
      if (storedMobile !== mobile) {
        throw new Error('Invalid mobile number');
      }
      
      // For demo purposes, accept any 6-digit OTP
      if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        throw new Error('Invalid OTP format');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create new user object
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        mobile: mobile,
        email: '',
        joinDate: new Date().toISOString().split('T')[0],
        isVerified: true
      };
      
      setUser(userData);
      localStorage.setItem('edumall_user', JSON.stringify(userData));
      sessionStorage.removeItem('otp_mobile');
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('edumall_user');
    sessionStorage.removeItem('otp_mobile');
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