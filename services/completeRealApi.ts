// Complete Real API service for connecting to Django backend - All endpoints covered
import { 
  Product, 
  Category, 
  Testimonial, 
  ApiResponse, 
  SearchParams, 
  ApiError,
  CartItem,
  WishlistItem,
  Order,
  User,
  Address
} from './types';

const API_BASE_URL = 'http://localhost:8000/api';

// Product image mapping using original ImageKit URLs from frontend data
const PRODUCT_IMAGES: { [key: string]: string } = {
  'NEET AIR Gold Mine Combo - Physics, Chemistry, Biology': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Combo%20DWAR%20&%20JKR.jpg?updatedAt=1754302526099',
  'Dr. Eklavya Perfect Combo (NEET 2025)': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Complete%20Biology%20Package.jpg?updatedAt=1754302529778',
  'Vishwas Offline Study Material': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Vishwas%20offline%20batch.jpg?updatedAt=1754302540558',
  'Solve 16000+ NCERT Based Questions – 5 Books Combo': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20Combo%20.jpg?updatedAt=1754302535205',
  'Combo of NCERT Feel – Physics, Chemistry, Biology': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-FEEL%20Biology%20&%20Chemistry%20in%20hindi.jpg?updatedAt=1754302526275',
  'NEET Physics Mastery': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-FEEL%20Physics.jpg?updatedAt=1754302526245',
  'NEET Chemistry Excellence': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20FEEL%20_%20CHEMISTRY.jpg?updatedAt=1754302539753',
  'NEET Biology Complete': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT-FEEL%20Biology.jpg?updatedAt=1754302540177',
  'JEE Main Physics': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20Physics.jpg?updatedAt=1754302544049',
  'JEE Main Chemistry': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20%E0%A4%A8%E0%A4%BF%E0%A4%9A%E0%A5%8B%E0%A4%A1%E0%A4%BC%20Chemistry.jpg?updatedAt=1754302531318',
  'JEE Main Mathematics': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20%E0%A4%A8%E0%A4%BF%E0%A4%9A%E0%A5%8B%E0%A4%A1%E0%A4%BC%20Maths.jpg?updatedAt=1754302531583',
  'UPSC Civil Services': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/UPSC%20NCERT%20NICHOD%20%20Combo.jpg?updatedAt=1754302537452',
  'UPSC Prelims': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20polity.jpg?updatedAt=1754302526180',
  'UPSC Mains': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Nichod%20History%20.png?updatedAt=1754302535148',
  'Human Body Chart': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Biology%20Examples%20Chart.jpg?updatedAt=1754302544322',
  'Periodic Table Chart': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Organic%20Chemistry%20Chart.jpg?updatedAt=1754302531574',
  'Physics Formulas Chart': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Physics%20Formulas%20Chart.jpg?updatedAt=1754302542744',
  'Study Planner': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Fighter%20Tool%20Afsar,%20Timer%20&%20DWAR.jpg?updatedAt=1754302526191',
  'Timer - Study Timer Tool': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/_Timer%20Amazon.jpg?updatedAt=1754302531367',
  'Motivational Quotes Book': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/JEET%20ki%20RnNEETi%20(English).jpg?updatedAt=1754302537528',
  'NCERT Physics Class 11': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20Physics%20Q-Bank.jpg?updatedAt=1754302533693',
  'NCERT Chemistry Class 12': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20Organic%20Chemistry%20Q-Bank.jpg?updatedAt=1754302533964'
};

// Category-based fallback images
const CATEGORY_IMAGES: { [key: string]: string } = {
  'Featured Combos': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Combo%20DWAR%20&%20JKR.jpg?updatedAt=1754302526099',
  'Individual Books': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/DWAR%20.jpg?updatedAt=1754302526294',
  'UPSC': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/UPSC%20NCERT%20NICHOD%20%20Combo.jpg?updatedAt=1754302537452',
  'Charts': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/All%20PCB%20Charts.jpg?updatedAt=1754302535931',
  'Tools & Registers': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/Fighter%20Tool%20Afsar,%20Timer%20&%20DWAR.jpg?updatedAt=1754302526191',
  'Motivational': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/JEET%20ki%20RnNEETi%20(English).jpg?updatedAt=1754302537528',
  'NCERT Word-to-Word': 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/NCERT%20Word%20to%20Word%20Combo%20.jpg?updatedAt=1754302535205'
};

// Helper function to get product image
function getProductImage(productTitle: string, category: string): string {
  if (PRODUCT_IMAGES[productTitle]) {
    return PRODUCT_IMAGES[productTitle];
  }
  
  if (CATEGORY_IMAGES[category]) {
    return CATEGORY_IMAGES[category];
  }
  
  return 'https://ik.imagekit.io/ipg9fwtnv/NEET%20kaka%20JEE%20Book%20Cover/DWAR%20.jpg?updatedAt=1754302526294';
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

// Helper function to build query parameters
function buildQueryParams(params: SearchParams): string {
  const queryParams = new URLSearchParams();
  
  if (params.query) {
    queryParams.append('q', params.query);
  }
  
  if (params.filters?.category) {
    queryParams.append('category', params.filters.category);
  }
  
  if (params.filters?.subject) {
    queryParams.append('subject', params.filters.subject);
  }
  
  if (params.filters?.publisher) {
    queryParams.append('publisher', params.filters.publisher);
  }
  
  if (params.filters?.priceRange) {
    queryParams.append('min_price', params.filters.priceRange.min.toString());
    queryParams.append('max_price', params.filters.priceRange.max.toString());
  }
  
  if (params.filters?.type) {
    queryParams.append('type', params.filters.type);
  }
  
  // Map frontend sort options to Django ordering
  if (params.sort?.sortBy) {
    let ordering = '-created_at'; // default
    switch (params.sort.sortBy) {
      case 'price-low':
        ordering = 'price';
        break;
      case 'price-high':
        ordering = '-price';
        break;
      case 'newest':
        ordering = '-created_at';
        break;
      case 'rating':
        ordering = '-created_at'; // fallback since we don't have rating ordering yet
        break;
      case 'popularity':
      default:
        ordering = '-created_at';
        break;
    }
    queryParams.append('ordering', ordering);
  }
  
  if (params.page) {
    queryParams.append('page', params.page.toString());
  }
  
  if (params.limit) {
    queryParams.append('page_size', params.limit.toString());
  }
  
  return queryParams.toString();
}

// Transform Django product to frontend product format
function transformProduct(djangoProduct: any): Product {
  const originalPrice = parseFloat(djangoProduct.sale_price || djangoProduct.price);
  const salePrice = parseFloat(djangoProduct.price);
  const discount = djangoProduct.discount_percentage || 0;
  
  return {
    id: djangoProduct.id,
    title: djangoProduct.title,
    author: djangoProduct.author,
    price: salePrice,
    originalPrice: originalPrice,
    rating: 4.5, // Default rating
    reviews: 100, // Default reviews
    category: djangoProduct.category_name || djangoProduct.category?.name || djangoProduct.category,
    subject: djangoProduct.publisher, // Using publisher as subject
    image: djangoProduct.image_url || getProductImage(djangoProduct.title, djangoProduct.category_name || djangoProduct.category?.name || djangoProduct.category),
    bestseller: djangoProduct.featured,
    discount: discount,
    publisher: djangoProduct.publisher || djangoProduct.author,
    year: djangoProduct.publication_year || 2025,
    pages: djangoProduct.pages || 200,
    language: djangoProduct.language || 'Hindi',
    type: 'Book',
    stock: djangoProduct.stock_quantity,
    description: djangoProduct.description || `${djangoProduct.title} by ${djangoProduct.author} - Comprehensive study material for competitive exams`,
    features: [
      "Comprehensive coverage of all topics",
      "Practice questions and exercises", 
      "Previous year questions included",
      "Clear explanations with examples",
      "Updated syllabus coverage"
    ]
  };
}

// Transform Django category to frontend category format
function transformCategory(djangoCategory: any): Category {
  const name = djangoCategory.name.toLowerCase();
  let gradient = 'from-primary to-blue1';
  let bgGradient = 'from-primary/20 to-blue1/20';
  
  if (name.includes('featured') || name.includes('combo')) {
    gradient = 'from-primary to-blue1';
    bgGradient = 'from-primary/20 to-blue1/20';
  } else if (name.includes('individual') || name.includes('book')) {
    gradient = 'from-blue1 to-blue2';
    bgGradient = 'from-blue1/20 to-blue2/20';
  } else if (name.includes('upsc')) {
    gradient = 'from-blue2 to-blue3';
    bgGradient = 'from-blue2/20 to-blue3/20';
  }
  
  return {
    id: djangoCategory.id.toString(),
    title: djangoCategory.name,
    subtitle: djangoCategory.description,
    description: djangoCategory.description,
    icon: '📚',
    gradient: gradient,
    bgGradient: bgGradient,
    categories: [djangoCategory.name],
    highlights: ['Quality Content', 'Expert Authors', 'Comprehensive Coverage']
  };
}

// Get authentication token
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

// Add authorization header
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Complete Real API service
export const completeRealApi = {
  // ========== PRODUCTS API ==========
  async getProducts(params: SearchParams = {}): Promise<ApiResponse<Product[]>> {
    const queryString = buildQueryParams(params);
    const hasFilters = params.query || params.filters?.category || params.filters?.subject || 
                      params.filters?.publisher || params.filters?.priceRange || params.sort?.sortBy;
    
    const endpoint = hasFilters ? '/products/search/' : '/products/';
    const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    const result = await handleResponse<any>(response);
    
    const products = result.data.results || result.data;
    let currentPage = params.page || 1;
    
    if (result.data.previous) {
      const urlParams = new URLSearchParams(result.data.previous.split('?')[1] || '');
      const prevPage = urlParams.get('page');
      if (prevPage) {
        currentPage = parseInt(prevPage) + 1;
      }
    }
    
    return {
      success: true,
      data: Array.isArray(products) ? products.map(transformProduct) : [],
      count: result.data.count || 0,
      total: result.data.count || 0,
      page: currentPage,
      totalPages: Math.ceil((result.data.count || 0) / (params.limit || 12))
    };
  },

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    const response = await fetch(`${API_BASE_URL}/products/${id}/`);
    const result = await handleResponse<any>(response);
    
    return {
      ...result,
      data: transformProduct(result.data)
    };
  },

  async getFeaturedProducts(limit: number = 6): Promise<ApiResponse<Product[]>> {
    const response = await fetch(`${API_BASE_URL}/products/featured/`);
    const result = await handleResponse<any>(response);
    
    const products = Array.isArray(result.data) ? result.data : result.data.results || [];
    const featuredProducts = products.slice(0, limit).map(transformProduct);
    
    return {
      ...result,
      data: featuredProducts
    };
  },

  async getProductsByCategory(category: string, limit?: number): Promise<ApiResponse<Product[]>> {
    const response = await fetch(`${API_BASE_URL}/products/by_category/?category=${encodeURIComponent(category)}`);
    const result = await handleResponse<any>(response);
    
    const products = Array.isArray(result.data) ? result.data : result.data.results || [];
    const categoryProducts = products.slice(0, limit).map(transformProduct);
    
    return {
      ...result,
      data: categoryProducts
    };
  },

  async getBestsellers(limit: number = 8): Promise<ApiResponse<Product[]>> {
    const response = await fetch(`${API_BASE_URL}/products/bestsellers/`);
    const result = await handleResponse<any>(response);
    
    const products = Array.isArray(result.data) ? result.data : result.data.results || [];
    const bestsellers = products.slice(0, limit).map(transformProduct);
    
    return {
      ...result,
      data: bestsellers
    };
  },

  // ========== CATEGORIES API ==========
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    const result = await handleResponse<any>(response);
    
    const categories = result.data.results || result.data;
    
    return {
      ...result,
      data: categories.map(transformCategory)
    };
  },

  // ========== STATIC DATA APIs ==========
  async getProductCategories(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/product-categories/`);
    return await handleResponse<string[]>(response);
  },

  async getProductSubjects(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/product-subjects/`);
    return await handleResponse<string[]>(response);
  },

  async getProductPublishers(): Promise<ApiResponse<string[]>> {
    const response = await fetch(`${API_BASE_URL}/product-publishers/`);
    return await handleResponse<string[]>(response);
  },

  async getPriceRanges(): Promise<ApiResponse<any[]>> {
    const response = await fetch(`${API_BASE_URL}/price-ranges/`);
    return await handleResponse<any[]>(response);
  },

  // ========== TESTIMONIALS API ==========
  async getTestimonials(limit?: number): Promise<ApiResponse<Testimonial[]>> {
    const url = `${API_BASE_URL}/testimonials/${limit ? `?limit=${limit}` : ''}`;
    const response = await fetch(url);
    return await handleResponse<Testimonial[]>(response);
  },

  // ========== CART API ==========
  async getCart(): Promise<ApiResponse<CartItem[]>> {
    const response = await fetch(`${API_BASE_URL}/cart/`, {
      headers: getAuthHeaders()
    });
    const result = await handleResponse<any>(response);
    
    // Transform backend cart response to frontend format
    const cartItems = result.data.items?.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
      product: transformProduct(item.product)
    })) || [];
    
    return {
      success: true,
      data: cartItems,
      count: cartItems.length
    };
  },

  async addToCart(productId: number, quantity: number = 1): Promise<ApiResponse<CartItem[]>> {
    const response = await fetch(`${API_BASE_URL}/cart/add/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId, quantity })
    });
    const result = await handleResponse<any>(response);
    
    const cartItems = result.data.cart?.items?.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
      product: transformProduct(item.product)
    })) || [];
    
    return {
      ...result,
      data: cartItems,
      message: result.data.message
    };
  },

  async removeFromCart(productId: number): Promise<ApiResponse<CartItem[]>> {
    const response = await fetch(`${API_BASE_URL}/cart/remove/${productId}/`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const result = await handleResponse<any>(response);
    
    const cartItems = result.data.cart?.items?.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
      product: transformProduct(item.product)
    })) || [];
    
    return {
      ...result,
      data: cartItems,
      message: result.data.message
    };
  },

  async updateCartQuantity(productId: number, quantity: number): Promise<ApiResponse<CartItem[]>> {
    const response = await fetch(`${API_BASE_URL}/cart/update/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId, quantity })
    });
    const result = await handleResponse<any>(response);
    
    const cartItems = result.data.cart?.items?.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
      product: transformProduct(item.product)
    })) || [];
    
    return {
      ...result,
      data: cartItems,
      message: result.data.message
    };
  },

  async clearCart(): Promise<ApiResponse<CartItem[]>> {
    const response = await fetch(`${API_BASE_URL}/cart/clear/`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const result = await handleResponse<any>(response);
    
    return {
      ...result,
      data: [],
      count: 0,
      message: result.data.message
    };
  },

  // ========== WISHLIST API ==========
  async getWishlist(): Promise<ApiResponse<WishlistItem[]>> {
    const response = await fetch(`${API_BASE_URL}/wishlist/`, {
      headers: getAuthHeaders()
    });
    const result = await handleResponse<any>(response);
    
    const wishlistItems = result.data.items?.map((item: any) => ({
      productId: item.product.id,
      product: transformProduct(item.product),
      addedAt: item.added_at
    })) || [];
    
    return {
      success: true,
      data: wishlistItems,
      count: wishlistItems.length
    };
  },

  async addToWishlist(productId: number): Promise<ApiResponse<WishlistItem[]>> {
    const response = await fetch(`${API_BASE_URL}/wishlist/add/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ product_id: productId })
    });
    const result = await handleResponse<any>(response);
    
    const wishlistItems = result.data.wishlist?.items?.map((item: any) => ({
      productId: item.product.id,
      product: transformProduct(item.product),
      addedAt: item.added_at
    })) || [];
    
    return {
      ...result,
      data: wishlistItems,
      message: result.data.message
    };
  },

  async removeFromWishlist(productId: number): Promise<ApiResponse<WishlistItem[]>> {
    const response = await fetch(`${API_BASE_URL}/wishlist/remove/${productId}/`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const result = await handleResponse<any>(response);
    
    const wishlistItems = result.data.wishlist?.items?.map((item: any) => ({
      productId: item.product.id,
      product: transformProduct(item.product),
      addedAt: item.added_at
    })) || [];
    
    return {
      ...result,
      data: wishlistItems,
      message: result.data.message
    };
  },

  // ========== USER API ==========
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/user/profile/`, {
      headers: getAuthHeaders()
    });
    return await handleResponse<User>(response);
  },

  async updateUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/user/update/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return await handleResponse<User>(response);
  },

  // ========== ADDRESS API ==========
  async getUserAddresses(): Promise<ApiResponse<Address[]>> {
    const response = await fetch(`${API_BASE_URL}/addresses/`, {
      headers: getAuthHeaders()
    });
    return await handleResponse<Address[]>(response);
  },

  async addAddress(address: Address): Promise<ApiResponse<Address[]>> {
    const response = await fetch(`${API_BASE_URL}/addresses/create/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(address)
    });
    return await handleResponse<Address[]>(response);
  },

  async updateAddress(index: number, address: Address): Promise<ApiResponse<Address[]>> {
    const response = await fetch(`${API_BASE_URL}/addresses/${index}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(address)
    });
    return await handleResponse<Address[]>(response);
  },

  async deleteAddress(index: number): Promise<ApiResponse<Address[]>> {
    const response = await fetch(`${API_BASE_URL}/addresses/${index}/`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return await handleResponse<Address[]>(response);
  },

  // ========== ORDER API ==========
  async createOrder(orderData: {
    items: CartItem[];
    shippingAddress: Address;
    paymentMethod: string;
    couponCode?: string;
  }): Promise<ApiResponse<Order>> {
    const response = await fetch(`${API_BASE_URL}/orders/create/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        shipping_address: orderData.shippingAddress,
        payment_method: orderData.paymentMethod,
        coupon_code: orderData.couponCode
      })
    });
    return await handleResponse<Order>(response);
  },

  async getUserOrders(): Promise<ApiResponse<Order[]>> {
    const response = await fetch(`${API_BASE_URL}/orders/`, {
      headers: getAuthHeaders()
    });
    return await handleResponse<Order[]>(response);
  },

  async getOrderById(orderId: string): Promise<ApiResponse<Order>> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
      headers: getAuthHeaders()
    });
    return await handleResponse<Order>(response);
  },

  // ========== COUPON API ==========
  async validateCoupon(couponCode: string, cartTotal: number): Promise<ApiResponse<{
    valid: boolean;
    discount: number;
    message: string;
  }>> {
    const response = await fetch(`${API_BASE_URL}/validate-coupon/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ coupon_code: couponCode, cart_total: cartTotal })
    });
    return await handleResponse<any>(response);
  }
};
