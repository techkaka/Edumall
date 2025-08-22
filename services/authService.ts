// Authentication service for Django backend integration
import { ApiResponse, ApiError } from './types';

const API_BASE_URL = 'http://localhost:8000/api';

export interface User {
  id: string;
  email?: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_phone_verified: boolean;
  date_of_birth?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  tokens: AuthTokens;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
}

export interface VerifyOtpRequest {
  phone_number: string;
  otp: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    success: true,
    data: data
  };
}

// Get authentication token from localStorage
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

// Get refresh token from localStorage
export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh_token');
}

// Store authentication tokens
export function storeTokens(access: string, refresh: string): void {
  localStorage.setItem('auth_token', access);
  localStorage.setItem('refresh_token', refresh);
}

// Clear authentication tokens
export function clearTokens(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
}

// Add authorization header
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Send OTP to phone number
export async function sendOtp(phoneNumber: string): Promise<SendOtpResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber
      })
    });

    const result = await handleResponse<SendOtpResponse>(response);
    return result.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

// Verify OTP and login/register user
export async function verifyOtp(request: VerifyOtpRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    const result = await handleResponse<LoginResponse>(response);
    
    // Store tokens if login is successful
    if (result.data.success && result.data.tokens) {
      storeTokens(result.data.tokens.access, result.data.tokens.refresh);
    }
    
    return result.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}

// Refresh JWT token
export async function refreshToken(): Promise<{ access: string }> {
  try {
    const refresh = getRefreshToken();
    if (!refresh) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh-token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refresh
      })
    });

    const result = await handleResponse<{ access: string }>(response);
    
    // Update stored access token
    if (result.data.access) {
      localStorage.setItem('auth_token', result.data.access);
    }
    
    return result.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Clear tokens if refresh fails
    clearTokens();
    throw error;
  }
}

// Logout user
export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    const refresh = getRefreshToken();
    if (!refresh) {
      // If no refresh token, just clear local storage
      clearTokens();
      return { success: true, message: 'Logged out successfully' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refresh
      })
    });

    const result = await handleResponse<{ success: boolean; message: string }>(response);
    
    // Clear tokens regardless of response
    clearTokens();
    
    return result.data;
  } catch (error) {
    console.error('Error during logout:', error);
    // Clear tokens even if API call fails
    clearTokens();
    return { success: true, message: 'Logged out successfully' };
  }
}

// Get user profile
export async function getUserProfile(): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const result = await handleResponse<{ user: User }>(response);
    return result.data.user;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
