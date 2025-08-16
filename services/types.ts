// TypeScript interfaces for Kaka Store data structures

export interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  category: string;
  subject: string;
  image: string;
  bestseller: boolean;
  discount: number;
  publisher: string;
  year: number;
  pages: number;
  language: string;
  type: string;
  stock?: number;
  description?: string;
  specifications?: {
    isbn?: string;
    edition?: string;
    binding?: string;
    dimensions?: string;
    weight?: string;
  };
}

// FIXED: Clean Category interface - removed inconsistent fields
export interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  bgGradient: string;
  categories: string[];
  highlights: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  achievement: string;
  year: string;
  exam: string;
  college: string;
  rating: number;
  image: string;
  testimonial: string;
  products: string[];
  location: string;
  verified: boolean;
  category: string;
  bgGradient: string;
  accent: string;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface FilterOptions {
  category?: string;
  subject?: string;
  publisher?: string;
  priceRange?: PriceRange;
  type?: string;
}

export interface SortOptions {
  sortBy: 'popularity' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface SearchParams {
  query?: string;
  filters?: FilterOptions;
  sort?: SortOptions;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  total?: number;
  page?: number;
  totalPages?: number;
  error?: string;
  message?: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface WishlistItem {
  productId: number;
  product: Product;
  addedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  shippingAddress: Address;
  couponCode?: string;
}

export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  orders: string[]; // Array of order IDs
  wishlist: WishlistItem[];
  createdAt: string;
}

// API Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Network simulation types
export interface NetworkConfig {
  delay: {
    min: number;
    max: number;
  };
  failureRate: number; // 0-1, percentage of requests that should fail
  enableNetworkDelay: boolean;
  enableRandomFailures: boolean;
}