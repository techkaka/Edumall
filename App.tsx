import React, { Suspense, lazy, useCallback, useEffect } from 'react';
import { RouterProvider, useRouter } from './components/Router';
import { AuthProvider } from './components/auth/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import { initQuickCart } from './utils/quickCartLoader';

// Simple lazy loading without complex error handling
const HomePage = lazy(() => import('./components/pages/HomePage').then(module => ({ default: module.HomePage })));
const ProductsPage = lazy(() => import('./components/pages/ProductsPage').then(module => ({ default: module.ProductsPage })));
const ProductDetailPage = lazy(() => import('./components/pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const CartPage = lazy(() => import('./components/pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('./components/pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const AccountPage = lazy(() => import('./components/pages/AccountPage').then(module => ({ default: module.AccountPage })));
const WishlistPage = lazy(() => import('./components/pages/WishlistPage').then(module => ({ default: module.WishlistPage })));
const SearchPage = lazy(() => import('./components/pages/SearchPage').then(module => ({ default: module.SearchPage })));
const OrderTrackingPage = lazy(() => import('./components/pages/OrderTrackingPage').then(module => ({ default: module.OrderTrackingPage })));
const CategoriesPage = lazy(() => import('./components/pages/CategoriesPage').then(module => ({ default: module.CategoriesPage })));
const AboutPage = lazy(() => import('./components/pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(module => ({ default: module.ContactPage })));

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
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, ErrorBoundaryState> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    console.error('Error Boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught error:', error);
    console.error('Error info:', errorInfo);
    this.setState({ errorInfo });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen modern-gradient-bg flex items-center justify-center">
          <div className="text-center p-8 max-w-lg mx-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
              <div className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</div>
              <p className="text-gray-600 mb-6">Please try refreshing the page.</p>
              
              {/* Debug information in development */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <div className="text-sm font-semibold text-red-800 mb-2">Debug Information:</div>
                  <div className="text-xs text-red-700 mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  <div className="text-xs text-red-700 mb-2">
                    <strong>Stack:</strong> {this.state.error.stack?.split('\n').slice(0, 3).join('\n')}
                  </div>
                  {this.state.errorInfo && (
                    <div className="text-xs text-red-700">
                      <strong>Component Stack:</strong> {this.state.errorInfo.componentStack?.split('\n').slice(0, 3).join('\n')}
                    </div>
                  )}
                </div>
              )}
              
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
    try {
      console.log('🚀 Initializing EduMall app...');
      initQuickCart();
      console.log('✅ App initialization completed');
    } catch (error) {
      console.error('❌ Error during app initialization:', error);
    }
  }, []);

  const renderPage = useCallback((): React.ReactElement => {
    try {
      console.log('📄 Rendering page:', currentPage);
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
    } catch (error) {
      console.error('❌ Error rendering page:', currentPage, error);
      throw error; // Re-throw to be caught by Error Boundary
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
      <Toaster />
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