import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the router context type
interface RouterContextType {
  currentPage: string;
  navigate: (page: string, params?: Record<string, string>) => void;
  params: Record<string, string>;
  setParams: (params: Record<string, string>) => void;
  // Helper navigation methods for better UX
  goToHome: () => void;
  goToProducts: (params?: Record<string, string>) => void;
  goToCart: () => void;
  goToWishlist: () => void;
  goToAccount: () => void;
  goToSearch: (query?: string) => void;
  goToCategories: (params?: Record<string, string>) => void;
  goToProductDetail: (id: string) => void;
  goToCheckout: () => void;
  goToOrderTracking: () => void;
  goToAbout: () => void;
  goToContact: () => void;
}

// Create the router context
const RouterContext = createContext<RouterContextType | null>(null);

// Hook to use the router
export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

// Backward compatibility alias - useNavigation is the same as useRouter
export const useNavigation = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useNavigation must be used within a RouterProvider');
  }
  return context;
};

// Router provider props
interface RouterProviderProps {
  children: ReactNode;
}

// Router provider component
export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [params, setParams] = useState<Record<string, string>>({});

  // Initialize router from URL
  useEffect(() => {
    const updateFromURL = () => {
      const hash = window.location.hash.slice(1); // Remove #
      const [path, queryString] = hash.split('?');
      
      // Parse query parameters
      const urlParams = new URLSearchParams(queryString || '');
      const parsedParams: Record<string, string> = {};
      urlParams.forEach((value, key) => {
        parsedParams[key] = value;
      });
      
      // Determine page from path
      let page = 'home';
      if (path) {
        if (path.startsWith('products/')) {
          page = 'product-detail';
          parsedParams.id = path.split('/')[1];
        } else if (path === 'products') {
          page = 'products';
        } else if (path === 'categories') {
          page = 'categories';
        } else if (path === 'cart') {
          page = 'cart';
        } else if (path === 'checkout') {
          page = 'checkout';
        } else if (path === 'account') {
          page = 'account';
        } else if (path === 'wishlist') {
          page = 'wishlist';
        } else if (path === 'search') {
          page = 'search';
        } else if (path === 'about') {
          page = 'about';
        } else if (path === 'contact') {
          page = 'contact';
        } else if (path === 'order-tracking') {
          page = 'order-tracking';
        } else {
          page = path;
        }
      }
      
      setCurrentPage(page);
      setParams(parsedParams);
    };

    // Initial load
    updateFromURL();

    // Listen for hash changes
    window.addEventListener('hashchange', updateFromURL);
    window.addEventListener('popstate', updateFromURL);

    return () => {
      window.removeEventListener('hashchange', updateFromURL);
      window.removeEventListener('popstate', updateFromURL);
    };
  }, []);

  // Navigation function
  const navigate = (page: string, newParams: Record<string, string> = {}) => {
    let path = page;
    
    // Handle special page routing
    if (page === 'product-detail' && newParams.id) {
      path = `products/${newParams.id}`;
      delete newParams.id; // Remove from query params since it's in the path
    }
    
    // Build query string
    const queryParams = new URLSearchParams(newParams);
    const queryString = queryParams.toString();
    
    // Build final URL
    const url = `#${path}${queryString ? '?' + queryString : ''}`;
    
    // Update URL and state
    window.location.hash = url;
    setCurrentPage(page);
    setParams(newParams);
  };

  // Helper navigation methods
  const goToHome = () => navigate('home');
  
  const goToProducts = (params: Record<string, string> = {}) => navigate('products', params);
  
  const goToCart = () => navigate('cart');
  
  const goToWishlist = () => navigate('wishlist');
  
  const goToAccount = () => navigate('account');
  
  const goToSearch = (query?: string) => {
    const searchParams = query ? { q: query } : {};
    navigate('search', searchParams);
  };
  
  const goToCategories = (params: Record<string, string> = {}) => navigate('categories', params);
  
  const goToProductDetail = (id: string) => navigate('product-detail', { id });
  
  const goToCheckout = () => navigate('checkout');
  
  const goToOrderTracking = () => navigate('order-tracking');
  
  const goToAbout = () => navigate('about');
  
  const goToContact = () => navigate('contact');

  const value: RouterContextType = {
    currentPage,
    navigate,
    params,
    setParams,
    // Helper methods
    goToHome,
    goToProducts,
    goToCart,
    goToWishlist,
    goToAccount,
    goToSearch,
    goToCategories,
    goToProductDetail,
    goToCheckout,
    goToOrderTracking,
    goToAbout,
    goToContact
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

// Export both for convenience and backward compatibility
export { RouterContext };
export default RouterProvider;