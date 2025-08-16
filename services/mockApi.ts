// Enhanced Mock API Service - Complete E-commerce functionality
import { 
  Product, 
  Category, 
  Testimonial, 
  ApiResponse, 
  SearchParams, 
  FilterOptions,
  ApiError,
  NetworkConfig,
  CartItem,
  WishlistItem,
  Order,
  User,
  Address
} from './types';

// Import the existing data
import { NEET_KAKA_PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_SUBJECTS, PRODUCT_PUBLISHERS, PRICE_RANGES } from '../utils/productData';

// Network simulation configuration
const NETWORK_CONFIG: NetworkConfig = {
  delay: {
    min: 300,    // Minimum delay in ms
    max: 1200,   // Maximum delay in ms
  },
  failureRate: 0.02,  // 2% chance of random failures
  enableNetworkDelay: true,
  enableRandomFailures: false, // Disable for development
};

// Simulate network delay
const simulateNetworkDelay = async (): Promise<void> => {
  if (!NETWORK_CONFIG.enableNetworkDelay) return;
  
  const delay = Math.random() * 
    (NETWORK_CONFIG.delay.max - NETWORK_CONFIG.delay.min) + 
    NETWORK_CONFIG.delay.min;
  
  await new Promise(resolve => setTimeout(resolve, delay));
};

// Simulate random failures
const simulateRandomFailure = (): void => {
  if (!NETWORK_CONFIG.enableRandomFailures) return;
  
  if (Math.random() < NETWORK_CONFIG.failureRate) {
    throw new ApiError('Network request failed', 500, 'NETWORK_ERROR');
  }
};

// Generate unique IDs
const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substring(2)}`;
};

// Mock data - Enhanced with realistic content
let mockProducts: Product[] = NEET_KAKA_PRODUCTS.map(product => ({
  ...product,
  stock: Math.floor(Math.random() * 100) + 15, // Random stock between 15-114
}));

// UPDATED: Specific icons as requested - Stethoscope for NEET, Crown for UPSC Ashoka emblem
const mockCategories: Category[] = [
  {
    id: 'neet',
    title: 'NEET Preparation',
    subtitle: 'Complete Medical Entrance Guide',
    description: 'Master NEET with our comprehensive Physics, Chemistry, and Biology materials trusted by thousands.',
    icon: 'Stethoscope', // Medical stethoscope icon as requested
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    categories: ['Featured Books', 'Individual Books'],
    highlights: ['NEET Physics Complete', 'NEET Chemistry Master']
  },
  {
    id: 'jee',
    title: 'JEE Preparation', 
    subtitle: 'Engineering Entrance Mastery',
    description: 'Crack JEE Main & Advanced with our expertly designed Physics, Chemistry & Mathematics resources.',
    icon: 'Settings', // Engineering gear icon - keep as is
    gradient: 'from-blue-500 to-blue-700',
    bgGradient: 'from-blue-50 to-blue-100',
    categories: ['JEE Main', 'JEE Advanced'],
    highlights: ['JEE Main Mathematics', 'JEE Advanced Physics']
  },
  {
    id: 'upsc',
    title: 'UPSC Materials',
    subtitle: 'Civil Services Excellence',
    description: 'Comprehensive UPSC preparation materials covering all major subjects systematically.',
    icon: 'Crown', // Crown icon representing Ashoka emblem/government authority
    gradient: 'from-purple-600 to-purple-800',
    bgGradient: 'from-purple-50 to-purple-100',
    categories: ['UPSC'],
    highlights: ['UPSC Polity Complete', 'Geography Guide']
  }
];

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    achievement: "NEET AIR 145",
    year: "2024",
    exam: "NEET",
    college: "AIIMS Delhi",
    rating: 5,
    image: "",
    testimonial: "The study materials from EduMall were my game-changer! The content quality is exceptional and exactly what NEET demands. Got 680/720 marks!",
    products: ["NEET Physics Complete", "NEET Biology Excellence"],
    location: "Delhi",
    verified: true,
    category: "NEET Success",
    bgGradient: "from-green-100 to-emerald-100",
    accent: "green"
  },
  {
    id: 2,
    name: "Rohit Kumar",
    achievement: "JEE Advanced AIR 89",
    year: "2024", 
    exam: "JEE",
    college: "IIT Bombay CSE",
    rating: 5,
    image: "",
    testimonial: "EduMall's study materials are incredibly well-structured. The Mathematics book helped me crack JEE Advanced with confidence. Worth every penny!",
    products: ["JEE Main Mathematics", "JEE Advanced Physics"],
    location: "Mumbai",
    verified: true,
    category: "JEE Success",
    bgGradient: "from-blue-100 to-blue-200", 
    accent: "blue"
  },
  {
    id: 3,
    name: "Anjali Patel",
    achievement: "UPSC CSE Rank 47",
    year: "2023",
    exam: "UPSC",
    college: "IAS Officer",
    rating: 5,
    image: "",
    testimonial: "The UPSC materials are pure gold! Comprehensive yet concise - exactly what UPSC preparation needs. Cleared prelims and mains both in first attempt!",
    products: ["UPSC Polity Complete", "Geography Guide"],
    location: "Gujarat",
    verified: true,
    category: "UPSC Success",
    bgGradient: "from-purple-100 to-purple-200",
    accent: "purple"
  }
];

// Enhanced mock user and order storage
let mockUsers: User[] = [];
let mockOrders: Order[] = [];
let currentUserId: string | null = null;

// Default addresses for demo
const sampleAddresses: Address[] = [
  {
    fullName: "Student User",
    addressLine1: "123 Study Street",
    addressLine2: "Near Central Library",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
    phone: "+91-9876543210"
  },
  {
    fullName: "Student User",
    addressLine1: "456 Education Avenue",
    city: "Mumbai",
    state: "Maharashtra", 
    pincode: "400001",
    phone: "+91-9876543210"
  }
];

// Create default user for demo
const createDefaultUser = (): User => {
  const userId = generateId();
  const defaultUser: User = {
    id: userId,
    name: "Student User",
    email: "student@edumall.com",
    phone: "+91-9876543210",
    addresses: sampleAddresses,
    orders: [],
    wishlist: [],
    createdAt: new Date().toISOString()
  };
  
  mockUsers = [defaultUser];
  currentUserId = userId;
  return defaultUser;
};

// Initialize with default user
createDefaultUser();

class MockApiService {
  // Products API
  async getProducts(params: SearchParams = {}): Promise<ApiResponse<Product[]>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      let filteredProducts = [...mockProducts];
      const { query, filters, sort, page = 1, limit = 20 } = params;

      // Apply search query
      if (query?.trim()) {
        const lowerQuery = query.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(lowerQuery) ||
          product.author.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          product.subject.toLowerCase().includes(lowerQuery) ||
          product.publisher.toLowerCase().includes(lowerQuery)
        );
      }

      // Apply filters
      if (filters) {
        if (filters.category && filters.category !== 'All') {
          filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        if (filters.subject && filters.subject !== 'All') {
          filteredProducts = filteredProducts.filter(p => p.subject === filters.subject);
        }
        if (filters.publisher && filters.publisher !== 'All') {
          filteredProducts = filteredProducts.filter(p => p.publisher === filters.publisher);
        }
        if (filters.priceRange) {
          filteredProducts = filteredProducts.filter(p => 
            p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
          );
        }
        if (filters.type) {
          filteredProducts = filteredProducts.filter(p => p.type === filters.type);
        }
      }

      // Apply sorting
      if (sort) {
        switch (sort.sortBy) {
          case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'newest':
            filteredProducts.sort((a, b) => b.year - a.year);
            break;
          case 'popularity':
          default:
            filteredProducts.sort((a, b) => b.reviews - a.reviews);
            break;
        }
      }

      // Apply pagination
      const total = filteredProducts.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        success: true,
        data: paginatedProducts,
        count: paginatedProducts.length,
        total,
        page,
        totalPages
      };
    } catch (error) {
      throw new ApiError('Failed to fetch products', 500);
    }
  }

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      const product = mockProducts.find(p => p.id === id);
      
      if (!product) {
        throw new ApiError(`Product with ID ${id} not found`, 404, 'PRODUCT_NOT_FOUND');
      }

      return {
        success: true,
        data: product
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to fetch product', 500);
    }
  }

  async getFeaturedProducts(limit: number = 6): Promise<ApiResponse<Product[]>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      const featuredProducts = mockProducts
        .filter(product => product.bestseller || product.category === 'Featured Books')
        .slice(0, limit);

      return {
        success: true,
        data: featuredProducts,
        count: featuredProducts.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch featured products', 500);
    }
  }

  async getProductsByCategory(category: string, limit?: number): Promise<ApiResponse<Product[]>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      let categoryProducts = mockProducts.filter(product => product.category === category);
      
      if (limit) {
        categoryProducts = categoryProducts.slice(0, limit);
      }

      return {
        success: true,
        data: categoryProducts,
        count: categoryProducts.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch products by category', 500);
    }
  }

  async getBestsellers(limit: number = 8): Promise<ApiResponse<Product[]>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      const bestsellers = mockProducts
        .filter(product => product.bestseller)
        .slice(0, limit);

      return {
        success: true,
        data: bestsellers,
        count: bestsellers.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch bestsellers', 500);
    }
  }

  // Categories API
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      return {
        success: true,
        data: mockCategories,
        count: mockCategories.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch categories', 500);
    }
  }

  // Testimonials API
  async getTestimonials(limit?: number): Promise<ApiResponse<Testimonial[]>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      let testimonials = [...mockTestimonials];
      
      if (limit) {
        testimonials = testimonials.slice(0, limit);
      }

      return {
        success: true,
        data: testimonials,
        count: testimonials.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch testimonials', 500);
    }
  }

  // Static data APIs
  async getProductCategories(): Promise<ApiResponse<string[]>> {
    await simulateNetworkDelay();
    return { success: true, data: PRODUCT_CATEGORIES };
  }

  async getProductSubjects(): Promise<ApiResponse<string[]>> {
    await simulateNetworkDelay();
    return { success: true, data: PRODUCT_SUBJECTS };
  }

  async getProductPublishers(): Promise<ApiResponse<string[]>> {
    await simulateNetworkDelay();
    return { success: true, data: PRODUCT_PUBLISHERS };
  }

  async getPriceRanges(): Promise<ApiResponse<any[]>> {
    await simulateNetworkDelay();
    return { success: true, data: PRICE_RANGES };
  }

  // Enhanced Cart API with persistence
  async getCart(): Promise<ApiResponse<CartItem[]>> {
    await simulateNetworkDelay();

    try {
      const cartData = localStorage.getItem('edumall_cart');
      const cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      // Validate cart items against current products
      const validCart = cart.filter(item => {
        const product = mockProducts.find(p => p.id === item.productId);
        if (product) {
          item.product = product; // Update product info
          return true;
        }
        return false;
      });

      if (validCart.length !== cart.length) {
        localStorage.setItem('edumall_cart', JSON.stringify(validCart));
      }

      return {
        success: true,
        data: validCart,
        count: validCart.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch cart', 500);
    }
  }

  async addToCart(productId: number, quantity: number = 1): Promise<ApiResponse<CartItem[]>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      const product = mockProducts.find(p => p.id === productId);
      if (!product) {
        throw new ApiError(`Product with ID ${productId} not found`, 404);
      }

      const cartData = localStorage.getItem('edumall_cart');
      let cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      const existingItem = cart.find(item => item.productId === productId);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (product.stock && newQuantity > product.stock) {
          throw new ApiError(`Only ${product.stock} items available in stock`, 400, 'INSUFFICIENT_STOCK');
        }
        existingItem.quantity = newQuantity;
        existingItem.product = product; // Update product info
      } else {
        if (product.stock && quantity > product.stock) {
          throw new ApiError(`Only ${product.stock} items available in stock`, 400, 'INSUFFICIENT_STOCK');
        }
        cart.push({ productId, quantity, product });
      }

      localStorage.setItem('edumall_cart', JSON.stringify(cart));

      return {
        success: true,
        data: cart,
        count: cart.length,
        message: `${product.title} added to cart successfully`
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to add item to cart', 500);
    }
  }

  async removeFromCart(productId: number): Promise<ApiResponse<CartItem[]>> {
    await simulateNetworkDelay();

    try {
      const cartData = localStorage.getItem('edumall_cart');
      let cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      const originalCount = cart.length;
      cart = cart.filter(item => item.productId !== productId);
      localStorage.setItem('edumall_cart', JSON.stringify(cart));

      const message = originalCount > cart.length ? 'Item removed from cart' : 'Item not found in cart';

      return {
        success: true,
        data: cart,
        count: cart.length,
        message
      };
    } catch (error) {
      throw new ApiError('Failed to remove item from cart', 500);
    }
  }

  async updateCartQuantity(productId: number, quantity: number): Promise<ApiResponse<CartItem[]>> {
    await simulateNetworkDelay();

    try {
      const cartData = localStorage.getItem('edumall_cart');
      let cart: CartItem[] = cartData ? JSON.parse(cartData) : [];

      const item = cart.find(item => item.productId === productId);
      if (item) {
        const product = mockProducts.find(p => p.id === productId);
        
        if (quantity <= 0) {
          cart = cart.filter(item => item.productId !== productId);
        } else {
          if (product?.stock && quantity > product.stock) {
            throw new ApiError(`Only ${product.stock} items available in stock`, 400, 'INSUFFICIENT_STOCK');
          }
          item.quantity = quantity;
          if (product) item.product = product; // Update product info
        }
      }

      localStorage.setItem('edumall_cart', JSON.stringify(cart));

      return {
        success: true,
        data: cart,
        count: cart.length
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update cart quantity', 500);
    }
  }

  async clearCart(): Promise<ApiResponse<CartItem[]>> {
    await simulateNetworkDelay();

    try {
      localStorage.removeItem('edumall_cart');
      return {
        success: true,
        data: [],
        count: 0,
        message: 'Cart cleared successfully'
      };
    } catch (error) {
      throw new ApiError('Failed to clear cart', 500);
    }
  }

  // Enhanced Wishlist API with persistence
  async getWishlist(): Promise<ApiResponse<WishlistItem[]>> {
    await simulateNetworkDelay();

    try {
      const wishlistData = localStorage.getItem('edumall_wishlist');
      const wishlist: WishlistItem[] = wishlistData ? JSON.parse(wishlistData) : [];

      // Validate wishlist items against current products
      const validWishlist = wishlist.filter(item => {
        const product = mockProducts.find(p => p.id === item.productId);
        if (product) {
          item.product = product; // Update product info
          return true;
        }
        return false;
      });

      if (validWishlist.length !== wishlist.length) {
        localStorage.setItem('edumall_wishlist', JSON.stringify(validWishlist));
      }

      return {
        success: true,
        data: validWishlist,
        count: validWishlist.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch wishlist', 500);
    }
  }

  async addToWishlist(productId: number): Promise<ApiResponse<WishlistItem[]>> {
    await simulateNetworkDelay();

    try {
      const product = mockProducts.find(p => p.id === productId);
      if (!product) {
        throw new ApiError(`Product with ID ${productId} not found`, 404);
      }

      const wishlistData = localStorage.getItem('edumall_wishlist');
      let wishlist: WishlistItem[] = wishlistData ? JSON.parse(wishlistData) : [];

      const existingItem = wishlist.find(item => item.productId === productId);
      
      if (!existingItem) {
        wishlist.push({
          productId,
          product,
          addedAt: new Date().toISOString()
        });
        
        localStorage.setItem('edumall_wishlist', JSON.stringify(wishlist));
      }

      return {
        success: true,
        data: wishlist,
        count: wishlist.length,
        message: `${product.title} added to wishlist`
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to add item to wishlist', 500);
    }
  }

  async removeFromWishlist(productId: number): Promise<ApiResponse<WishlistItem[]>> {
    await simulateNetworkDelay();

    try {
      const wishlistData = localStorage.getItem('edumall_wishlist');
      let wishlist: WishlistItem[] = wishlistData ? JSON.parse(wishlistData) : [];

      const originalCount = wishlist.length;
      wishlist = wishlist.filter(item => item.productId !== productId);
      localStorage.setItem('edumall_wishlist', JSON.stringify(wishlist));

      const message = originalCount > wishlist.length ? 'Item removed from wishlist' : 'Item not found in wishlist';

      return {
        success: true,
        data: wishlist,
        count: wishlist.length,
        message
      };
    } catch (error) {
      throw new ApiError('Failed to remove item from wishlist', 500);
    }
  }

  // User Management API
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await simulateNetworkDelay();

    try {
      if (!currentUserId) {
        const defaultUser = createDefaultUser();
        return { success: true, data: defaultUser };
      }

      const user = mockUsers.find(u => u.id === currentUserId);
      if (!user) {
        const defaultUser = createDefaultUser();
        return { success: true, data: defaultUser };
      }

      return { success: true, data: user };
    } catch (error) {
      throw new ApiError('Failed to fetch user', 500);
    }
  }

  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    await simulateNetworkDelay();

    try {
      if (!currentUserId) {
        throw new ApiError('User not found', 404, 'USER_NOT_FOUND');
      }

      const userIndex = mockUsers.findIndex(u => u.id === currentUserId);
      if (userIndex === -1) {
        throw new ApiError('User not found', 404, 'USER_NOT_FOUND');
      }

      mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };

      return {
        success: true,
        data: mockUsers[userIndex],
        message: 'User updated successfully'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update user', 500);
    }
  }

  // Address Management API
  async getUserAddresses(): Promise<ApiResponse<Address[]>> {
    await simulateNetworkDelay();

    try {
      const userResponse = await this.getCurrentUser();
      return {
        success: true,
        data: userResponse.data.addresses,
        count: userResponse.data.addresses.length
      };
    } catch (error) {
      throw new ApiError('Failed to fetch addresses', 500);
    }
  }

  async addAddress(address: Address): Promise<ApiResponse<Address[]>> {
    await simulateNetworkDelay();

    try {
      const userResponse = await this.getCurrentUser();
      const updatedAddresses = [...userResponse.data.addresses, address];
      
      await this.updateUser({ addresses: updatedAddresses });

      return {
        success: true,
        data: updatedAddresses,
        count: updatedAddresses.length,
        message: 'Address added successfully'
      };
    } catch (error) {
      throw new ApiError('Failed to add address', 500);
    }
  }

  async updateAddress(index: number, address: Address): Promise<ApiResponse<Address[]>> {
    await simulateNetworkDelay();

    try {
      const userResponse = await this.getCurrentUser();
      const addresses = [...userResponse.data.addresses];
      
      if (index < 0 || index >= addresses.length) {
        throw new ApiError('Address not found', 404, 'ADDRESS_NOT_FOUND');
      }

      addresses[index] = address;
      await this.updateUser({ addresses });

      return {
        success: true,
        data: addresses,
        count: addresses.length,
        message: 'Address updated successfully'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to update address', 500);
    }
  }

  async deleteAddress(index: number): Promise<ApiResponse<Address[]>> {
    await simulateNetworkDelay();

    try {
      const userResponse = await this.getCurrentUser();
      const addresses = [...userResponse.data.addresses];
      
      if (index < 0 || index >= addresses.length) {
        throw new ApiError('Address not found', 404, 'ADDRESS_NOT_FOUND');
      }

      addresses.splice(index, 1);
      await this.updateUser({ addresses });

      return {
        success: true,
        data: addresses,
        count: addresses.length,
        message: 'Address deleted successfully'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Failed to delete address', 500);
    }
  }

  // Order Management API
  async createOrder(orderData: {
    items: CartItem[];
    shippingAddress: Address;
    paymentMethod: string;
    couponCode?: string;
  }): Promise<ApiResponse<Order>> {
    await simulateNetworkDelay();
    simulateRandomFailure();

    try {
      if (!currentUserId) {
        throw new ApiError('User not authenticated', 401, 'USER_NOT_AUTHENTICATED');
      }

      if (orderData.items.length === 0) {
        throw new ApiError('Cart is empty', 400, 'EMPTY_CART');
      }

      // Validate stock for all items
      for (const item of orderData.items) {
        const product = mockProducts.find(p => p.id === item.productId);
        if (!product) {
          throw new ApiError(`Product ${item.productId} not found`, 404, 'PRODUCT_NOT_FOUND');
        }
        if (product.stock && item.quantity > product.stock) {
          throw new ApiError(`Insufficient stock for ${product.title}`, 400, 'INSUFFICIENT_STOCK');
        }
      }

      // Calculate total
      let subtotal = 0;
      const updatedItems = orderData.items.map(item => {
        const product = mockProducts.find(p => p.id === item.productId)!;
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        return {
          ...item,
          product,
          price: product.price,
          total: itemTotal
        };
      });

      // Apply coupon discount if valid
      let discount = 0;
      if (orderData.couponCode) {
        // Simple coupon logic - you can enhance this
        if (orderData.couponCode === 'EDU10') {
          discount = subtotal * 0.1;
        } else if (orderData.couponCode === 'WELCOME20') {
          discount = subtotal * 0.2;
        }
      }

      const shipping = subtotal > 500 ? 0 : 50;
      const total = subtotal - discount + shipping;

      // Create order
      const orderId = generateId();
      const order: Order = {
        id: orderId,
        userId: currentUserId,
        items: updatedItems,
        subtotal,
        discount,
        shipping,
        total,
        status: 'confirmed',
        paymentMethod: orderData.paymentMethod,
        paymentStatus: 'paid',
        shippingAddress: orderData.shippingAddress,
        couponCode: orderData.couponCode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      mockOrders.push(order);

      // Update user orders
      const userIndex = mockUsers.findIndex(u => u.id === currentUserId);
      if (userIndex !== -1) {
        mockUsers[userIndex].orders.push(orderId);
      }

      // Update product stock
      for (const item of orderData.items) {
        const productIndex = mockProducts.findIndex(p => p.id === item.productId);
        if (productIndex !== -1 && mockProducts[productIndex].stock) {
          mockProducts[productIndex].stock! -= item.quantity;
        }
      }

      return {
        success: true,
        data: order,
        message: 'Order placed successfully'
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error('Error creating order:', error);
      throw new ApiError('Failed to create order', 500);
    }
  }

  async getUserOrders(): Promise<ApiResponse<Order[]>> {
    await simulateNetworkDelay();

    try {
      if (!currentUserId) {
        return { success: true, data: [], count: 0 };
      }

      const userOrders = mockOrders.filter(order => order.userId === currentUserId);
      userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      return {
        success: true,
        data: userOrders,
        count: userOrders.length
      };
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw new ApiError('Failed to fetch orders', 500);
    }
  }

  async getOrderById(orderId: string): Promise<ApiResponse<Order>> {
    await simulateNetworkDelay();

    try {
      const order = mockOrders.find(o => o.id === orderId);
      
      if (!order) {
        throw new ApiError(`Order with ID ${orderId} not found`, 404, 'ORDER_NOT_FOUND');
      }

      // Check if user owns this order
      if (currentUserId && order.userId !== currentUserId) {
        throw new ApiError('Unauthorized access to order', 403, 'UNAUTHORIZED_ACCESS');
      }

      return {
        success: true,
        data: order
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      console.error('Error fetching order:', error);
      throw new ApiError('Failed to fetch order', 500);
    }
  }

  // Coupon validation
  async validateCoupon(couponCode: string, cartTotal: number): Promise<ApiResponse<{
    valid: boolean;
    discount: number;
    message: string;
  }>> {
    await simulateNetworkDelay();

    try {
      const validCoupons = {
        'EDU10': { discount: 0.1, minAmount: 500, message: '10% discount applied!' },
        'FIRST20': { discount: 0.2, minAmount: 1000, message: '20% first-time buyer discount applied!' },
        'STUDENT15': { discount: 0.15, minAmount: 300, message: '15% student discount applied!' }
      };

      const coupon = validCoupons[couponCode as keyof typeof validCoupons];

      if (!coupon) {
        return {
          success: true,
          data: {
            valid: false,
            discount: 0,
            message: 'Invalid coupon code'
          }
        };
      }

      if (cartTotal < coupon.minAmount) {
        return {
          success: true,
          data: {
            valid: false,
            discount: 0,
            message: `Minimum order amount of ₹${coupon.minAmount} required`
          }
        };
      }

      const discountAmount = cartTotal * coupon.discount;

      return {
        success: true,
        data: {
          valid: true,
          discount: discountAmount,
          message: coupon.message
        }
      };
    } catch (error) {
      console.error('Error validating coupon:', error);
      throw new ApiError('Failed to validate coupon', 500);
    }
  }
}

// Export singleton instance
export const mockApi = new MockApiService();