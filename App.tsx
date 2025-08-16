import React, { Suspense, lazy, useCallback, useEffect } from 'react';
import { RouterProvider, useRouter } from './components/Router';
import { AuthProvider } from './components/auth/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { initQuickCart } from './utils/quickCartLoader';

// Enhanced lazy loading with simple fallback
const createLazyComponent = (
  importFn: () => Promise<{ [key: string]: React.ComponentType<any> }>,
  componentName: string
) => {
  return lazy(() =>
    importFn()
      .then(module => ({ 
        default: module[componentName] || module.default || (() => (
          <div className="p-8 text-center bg-white rounded-lg border border-primary/20 shadow-md m-4">
            <div className="text-red-600 mb-4">⚠️ Component Error</div>
            <p className="text-gray-600 mb-4">Failed to load {componentName}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        ))
      }))
      .catch(() => ({
        default: () => (
          <div className="p-8 text-center bg-white rounded-lg border border-primary/20 shadow-md m-4">
            <div className="text-amber-600 mb-4">🔄 Loading Error</div>
            <p className="text-gray-600 mb-4">Could not load {componentName}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        )
      }))
  );
};

// Lazy-loaded components
const HomePage = createLazyComponent(
  () => import('./components/pages/HomePage'),
  'HomePage'
);

const ProductsPage = createLazyComponent(
  () => import('./components/pages/ProductsPage'),
  'ProductsPage'
);

const ProductDetailPage = createLazyComponent(
  () => import('./components/pages/ProductDetailPage'),
  'ProductDetailPage'
);

const CartPage = createLazyComponent(
  () => import('./components/pages/CartPage'),
  'CartPage'
);

const CheckoutPage = createLazyComponent(
  () => import('./components/pages/CheckoutPage'),
  'CheckoutPage'
);

const AccountPage = createLazyComponent(
  () => import('./components/pages/AccountPage'),
  'AccountPage'
);

const WishlistPage = createLazyComponent(
  () => import('./components/pages/WishlistPage'),
  'WishlistPage'
);

const SearchPage = createLazyComponent(
  () => import('./components/pages/SearchPage'),
  'SearchPage'
);

const OrderTrackingPage = createLazyComponent(
  () => import('./components/pages/OrderTrackingPage'),
  'OrderTrackingPage'
);

const CategoriesPage = createLazyComponent(
  () => import('./components/pages/CategoriesPage'),
  'CategoriesPage'
);

const AboutPage = createLazyComponent(
  () => import('./components/pages/AboutPage'),
  'AboutPage'
);

const ContactPage = createLazyComponent(
  () => import('./components/pages/ContactPage'),
  'ContactPage'
);

// Loading component
const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        {/* Loading spinner */}
        <div className="relative w-16 h-16 mx-auto mb-8">
          <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* EduMall branding */}
        <div className="p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-blue2 bg-clip-text text-transparent">
            EduMall
          </div>
          <div className="text-blue3 font-medium mt-1">India Ka Edu Bazaar</div>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue2 rounded-full mx-auto mt-4"></div>
        </div>
      </div>
    </div>
  );
};

// Error Boundary
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, ErrorBoundaryState> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught error:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
          <div className="text-center p-8 max-w-lg mx-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
              <div className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</div>
              <p className="text-gray-600 mb-6">Please try refreshing the page.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-primary to-blue2 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90"
                >
                  Reload Page
                </button>
                
                <button 
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-white text-primary px-6 py-3 rounded-xl font-medium border-2 border-primary/30 hover:bg-primary/10"
                >
                  Go Home
                </button>
              </div>
              
              <div className="pt-6 border-t border-gray-200 mt-6">
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-blue2 bg-clip-text text-transparent">
                  EduMall
                </div>
                <div className="text-primary font-medium text-sm">India Ka Edu Bazaar</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// App Content
const AppContent: React.FC = React.memo(() => {
  const { currentPage } = useRouter();

  // Initialize sample cart data on app load (development only)
  useEffect(() => {
    initQuickCart();
  }, []);

  const renderPage = useCallback((): React.ReactElement => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <ProductsPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <AccountPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'search':
        return <SearchPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      default:
        return <HomePage />;
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen modern-gradient-bg w-full overflow-x-hidden">
      <Header />
      
      <main className="w-full relative min-h-screen" role="main">
        <div className="modern-bg-pattern" aria-hidden="true"></div>
        
        <div className="relative z-10">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              {renderPage()}
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>
      
      <Footer />
    </div>
  );
});

AppContent.displayName = 'AppContent';

// Main App component
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;