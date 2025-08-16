// Enhanced React hooks for consuming the complete mock API service
import { useState, useEffect, useCallback } from 'react';
import { mockApi } from './mockApi';
import { 
  Product, 
  Category, 
  Testimonial, 
  ApiResponse, 
  SearchParams, 
  CartItem, 
  WishlistItem, 
  ApiError,
  User,
  Address,
  Order
} from './types';

// Generic API hook for handling loading states and errors
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// Specific hooks for different API endpoints

// Products hooks
export function useProducts(params: SearchParams = {}) {
  return useApi(
    () => mockApi.getProducts(params),
    [JSON.stringify(params)]
  );
}

export function useProduct(id: number) {
  return useApi(
    () => mockApi.getProductById(id),
    [id]
  );
}

export function useFeaturedProducts(limit: number = 6) {
  return useApi(
    () => mockApi.getFeaturedProducts(limit),
    [limit]
  );
}

export function useProductsByCategory(category: string, limit?: number) {
  return useApi(
    () => mockApi.getProductsByCategory(category, limit),
    [category, limit]
  );
}

export function useBestsellers(limit: number = 8) {
  return useApi(
    () => mockApi.getBestsellers(limit),
    [limit]
  );
}

// Categories hook
export function useCategories() {
  return useApi(() => mockApi.getCategories());
}

// Testimonials hook
export function useTestimonials(limit?: number) {
  return useApi(
    () => mockApi.getTestimonials(limit),
    [limit]
  );
}

// Static data hooks
export function useProductCategories() {
  return useApi(() => mockApi.getProductCategories());
}

export function useProductSubjects() {
  return useApi(() => mockApi.getProductSubjects());
}

export function useProductPublishers() {
  return useApi(() => mockApi.getProductPublishers());
}

export function usePriceRanges() {
  return useApi(() => mockApi.getPriceRanges());
}

// Enhanced Cart hooks with full functionality
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.getCart();
      setCart(response.data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch cart';
      setError(errorMessage);
      console.error('Cart Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (productId: number, quantity: number = 1) => {
    try {
      setActionLoading('add');
      setError(null);
      const response = await mockApi.addToCart(productId, quantity);
      setCart(response.data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to add to cart';
      setError(errorMessage);
      throw err;
    } finally {
      setActionLoading(null);
    }
  }, []);

  const removeFromCart = useCallback(async (productId: number) => {
    try {
      setActionLoading('remove');
      setError(null);
      const response = await mockApi.removeFromCart(productId);
      setCart(response.data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to remove from cart';
      setError(errorMessage);
      throw err;
    } finally {
      setActionLoading(null);
    }
  }, []);

  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    try {
      setActionLoading('update');
      setError(null);
      const response = await mockApi.updateCartQuantity(productId, quantity);
      setCart(response.data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to update quantity';
      setError(errorMessage);
      throw err;
    } finally {
      setActionLoading(null);
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      setActionLoading('clear');
      setError(null);
      const response = await mockApi.clearCart();
      setCart(response.data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to clear cart';
      setError(errorMessage);
      throw err;
    } finally {
      setActionLoading(null);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalOriginalPrice = cart.reduce((sum, item) => sum + (item.product.originalPrice * item.quantity), 0);
  const totalSavings = totalOriginalPrice - totalPrice;

  return {
    cart,
    loading,
    error,
    actionLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refetch: fetchCart,
    totalItems,
    totalPrice,
    totalOriginalPrice,
    totalSavings
  };
}

// Enhanced Wishlist hooks with full functionality
export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.getWishlist();
      setWishlist(response.data);
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch wishlist';
      setError(errorMessage);
      console.error('Wishlist Error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToWishlist = useCallback(async (productId: number) => {
    try {
      setActionLoading('add');
      setError(null);
      const response = await mockApi.addToWishlist(productId);
      setWishlist(response.data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to add to wishlist';
      setError(errorMessage);
      throw err;
    } finally {
      setActionLoading(null);
    }
  }, []);

  const removeFromWishlist = useCallback(async (productId: number) => {
    try {
      setActionLoading('remove');
      setError(null);
      const response = await mockApi.removeFromWishlist(productId);
      setWishlist(response.data);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to remove from wishlist';
      setError(errorMessage);
      throw err;
    } finally {
      setActionLoading(null);
    }
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  const toggleWishlist = useCallback(async (productId: number) => {
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return {
    wishlist,
    loading,
    error,
    actionLoading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    refetch: fetchWishlist,
    count: wishlist.length
  };
}

// User management hooks
export function useCurrentUser() {
  return useApi(() => mockApi.getCurrentUser());
}

export function useUserUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = useCallback(async (userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.updateUser(userData);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { updateUser, loading, error };
}

// Address management hooks
export function useAddresses() {
  return useApi(() => mockApi.getUserAddresses());
}

export function useAddressManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addAddress = useCallback(async (address: Address) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.addAddress(address);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to add address';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAddress = useCallback(async (index: number, address: Address) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.updateAddress(index, address);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to update address';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAddress = useCallback(async (index: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.deleteAddress(index);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to delete address';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addAddress, updateAddress, deleteAddress, loading, error };
}

// Order management hooks
export function useOrders() {
  return useApi(() => mockApi.getUserOrders());
}

export function useOrder(orderId: string) {
  return useApi(
    () => mockApi.getOrderById(orderId),
    [orderId]
  );
}

export function useOrderCreation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (orderData: {
    items: CartItem[];
    shippingAddress: Address;
    paymentMethod: string;
    couponCode?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.createOrder(orderData);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to create order';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createOrder, loading, error };
}

// Coupon validation hook
export function useCouponValidation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCoupon = useCallback(async (couponCode: string, cartTotal: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApi.validateCoupon(couponCode, cartTotal);
      return response;
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : 'Failed to validate coupon';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { validateCoupon, loading, error };
}

// Search hook with debouncing
export function useSearch(initialParams: SearchParams = {}) {
  const [params, setParams] = useState<SearchParams>(initialParams);
  const [debouncedParams, setDebouncedParams] = useState<SearchParams>(initialParams);

  // Debounce search parameters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(params);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [params]);

  const { data: products, loading, error, refetch } = useProducts(debouncedParams);

  const updateSearch = useCallback((newParams: Partial<SearchParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const clearSearch = useCallback(() => {
    setParams({});
  }, []);

  return {
    products,
    loading,
    error,
    params: debouncedParams,
    updateSearch,
    clearSearch,
    refetch
  };
}

// Combined checkout hook for complex flows
export function useCheckout() {
  const { cart, clearCart, loading: cartLoading } = useCart();
  const { data: addresses, refetch: refetchAddresses } = useAddresses();
  const { createOrder, loading: orderLoading, error: orderError } = useOrderCreation();
  const { validateCoupon, loading: couponLoading } = useCouponValidation();

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<string>('');

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal - couponDiscount + shipping;

  const applyCoupon = useCallback(async () => {
    if (!couponCode.trim()) return;

    try {
      const response = await validateCoupon(couponCode, subtotal);
      if (response.data.valid) {
        setCouponDiscount(response.data.discount);
        setCouponMessage(response.data.message);
      } else {
        setCouponDiscount(0);
        setCouponMessage(response.data.message);
      }
    } catch (err) {
      setCouponDiscount(0);
      setCouponMessage('Failed to validate coupon');
    }
  }, [couponCode, subtotal, validateCoupon]);

  const removeCoupon = useCallback(() => {
    setCouponCode('');
    setCouponDiscount(0);
    setCouponMessage('');
  }, []);

  const placeOrder = useCallback(async () => {
    if (!selectedAddress) {
      throw new Error('Please select a shipping address');
    }
    if (!paymentMethod) {
      throw new Error('Please select a payment method');
    }
    if (cart.length === 0) {
      throw new Error('Cart is empty');
    }

    const orderData = {
      items: cart,
      shippingAddress: selectedAddress,
      paymentMethod,
      couponCode: couponDiscount > 0 ? couponCode : undefined
    };

    const response = await createOrder(orderData);
    
    // Clear checkout state after successful order
    setSelectedAddress(null);
    setPaymentMethod('');
    setCouponCode('');
    setCouponDiscount(0);
    setCouponMessage('');

    return response;
  }, [cart, selectedAddress, paymentMethod, couponCode, couponDiscount, createOrder]);

  return {
    // Cart data
    cart,
    clearCart,
    cartLoading,

    // Address data
    addresses: addresses || [],
    selectedAddress,
    setSelectedAddress,
    refetchAddresses,

    // Payment data
    paymentMethod,
    setPaymentMethod,

    // Coupon data
    couponCode,
    setCouponCode,
    couponDiscount,
    couponMessage,
    applyCoupon,
    removeCoupon,
    couponLoading,

    // Price calculations
    subtotal,
    shipping,
    total,
    savings: couponDiscount,

    // Order creation
    placeOrder,
    orderLoading,
    orderError
  };
}

// Error boundary hook for API errors
export function useApiErrorHandler() {
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const handleApiError = useCallback((error: unknown) => {
    if (error instanceof ApiError) {
      setApiError(error);
    } else {
      setApiError(new ApiError('An unexpected error occurred'));
    }
  }, []);

  const clearError = useCallback(() => {
    setApiError(null);
  }, []);

  return {
    apiError,
    handleApiError,
    clearError
  };
}