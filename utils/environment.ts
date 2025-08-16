/**
 * Professional Environment Configuration
 * Centralized environment management with type safety and validation
 * Compatible with Vite environment system
 */

// Environment types
export type Environment = 'development' | 'staging' | 'production' | 'test';

// Configuration interface
interface AppConfig {
  environment: Environment;
  version: string;
  buildTime: string;
  apiUrl: string;
  cdnUrl: string;
  enableAnalytics: boolean;
  enableErrorReporting: boolean;
  enableServiceWorker: boolean;
  enableDevTools: boolean;
  maxRetries: number;
  requestTimeout: number;
  cacheTimeout: number;
  features: {
    auth: boolean;
    cart: boolean;
    wishlist: boolean;
    notifications: boolean;
    recommendations: boolean;
    analytics: boolean;
    experiments: boolean;
  };
  limits: {
    maxCartItems: number;
    maxWishlistItems: number;
    maxSearchResults: number;
    maxFileSize: number;
  };
  urls: {
    privacyPolicy: string;
    termsOfService: string;
    contactUs: string;
    helpCenter: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      youtube: string;
      linkedin: string;
    };
  };
}

// Default configuration
const defaultConfig: AppConfig = {
  environment: 'development',
  version: '1.0.0',
  buildTime: new Date().toISOString(),
  apiUrl: '/api',
  cdnUrl: '/static',
  enableAnalytics: false,
  enableErrorReporting: false,
  enableServiceWorker: false,
  enableDevTools: true,
  maxRetries: 3,
  requestTimeout: 10000,
  cacheTimeout: 5 * 60 * 1000, // 5 minutes
  features: {
    auth: true,
    cart: true,
    wishlist: true,
    notifications: false,
    recommendations: false,
    analytics: false,
    experiments: false
  },
  limits: {
    maxCartItems: 50,
    maxWishlistItems: 100,
    maxSearchResults: 100,
    maxFileSize: 5 * 1024 * 1024 // 5MB
  },
  urls: {
    privacyPolicy: '/privacy',
    termsOfService: '/terms',
    contactUs: '/contact',
    helpCenter: '/help',
    socialMedia: {
      facebook: 'https://www.facebook.com/edumall',
      instagram: 'https://www.instagram.com/edumall',
      youtube: 'https://www.youtube.com/edumall',
      linkedin: 'https://www.linkedin.com/company/edumall'
    }
  }
};

// Environment-specific configurations
const environmentConfigs: Record<Environment, Partial<AppConfig>> = {
  development: {
    enableDevTools: true,
    enableAnalytics: false,
    enableErrorReporting: false,
    enableServiceWorker: false,
    apiUrl: 'http://localhost:3000/api',
    cdnUrl: 'http://localhost:3000/static'
  },
  
  staging: {
    environment: 'staging',
    enableAnalytics: true,
    enableErrorReporting: true,
    enableServiceWorker: true,
    enableDevTools: false,
    apiUrl: 'https://staging-api.edumall.in/api',
    cdnUrl: 'https://staging-cdn.edumall.in',
    features: {
      auth: true,
      cart: true,
      wishlist: true,
      notifications: true,
      recommendations: true,
      analytics: true,
      experiments: true
    }
  },
  
  production: {
    environment: 'production',
    enableAnalytics: true,
    enableErrorReporting: true,
    enableServiceWorker: true,
    enableDevTools: false,
    apiUrl: 'https://api.edumall.in/api',
    cdnUrl: 'https://cdn.edumall.in',
    requestTimeout: 5000,
    features: {
      auth: true,
      cart: true,
      wishlist: true,
      notifications: true,
      recommendations: true,
      analytics: true,
      experiments: true
    },
    limits: {
      maxCartItems: 100,
      maxWishlistItems: 200,
      maxSearchResults: 50,
      maxFileSize: 10 * 1024 * 1024 // 10MB
    }
  },
  
  test: {
    environment: 'test',
    enableAnalytics: false,
    enableErrorReporting: false,
    enableServiceWorker: false,
    apiUrl: '/test-api',
    cdnUrl: '/test-static',
    requestTimeout: 1000
  }
};

// Get environment variables with proper Vite support
function getEnvVar(key: string, fallback: string = ''): string {
  // Check if we're in a browser environment with Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || fallback;
  }
  
  // Fallback for Node.js environment (SSR, tests, etc.)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || fallback;
  }
  
  // Final fallback
  return fallback;
}

// Get current environment with better detection
function getCurrentEnvironment(): Environment {
  // Check various environment indicators
  if (typeof window !== 'undefined') {
    // Browser environment
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('local')) {
      return 'development';
    }
    
    if (hostname.includes('staging') || hostname.includes('preview')) {
      return 'staging';
    }
    
    if (hostname.includes('test') || hostname.includes('testing')) {
      return 'test';
    }
    
    // Production by default for custom domains
    if (hostname.includes('edumall.in') || hostname.includes('edumall.com')) {
      return 'production';
    }
  }
  
  // Check environment variables
  const viteMode = getEnvVar('MODE');
  const nodeEnv = getEnvVar('NODE_ENV');
  const appEnv = getEnvVar('VITE_APP_ENV') || getEnvVar('REACT_APP_ENV');
  
  if (appEnv && ['development', 'staging', 'production', 'test'].includes(appEnv)) {
    return appEnv as Environment;
  }
  
  if (viteMode === 'production') return 'production';
  if (viteMode === 'test') return 'test';
  if (nodeEnv === 'test') return 'test';
  if (nodeEnv === 'production') return 'production';
  if (nodeEnv === 'development' || viteMode === 'development') return 'development';
  
  // Fallback to development
  return 'development';
}

// Create application configuration
function createConfig(): AppConfig {
  const environment = getCurrentEnvironment();
  const envConfig = environmentConfigs[environment] || {};
  
  // Merge configurations with environment variables
  const config: AppConfig = {
    ...defaultConfig,
    ...envConfig,
    environment,
    version: getEnvVar('VITE_APP_VERSION') || getEnvVar('REACT_APP_VERSION') || defaultConfig.version,
    buildTime: getEnvVar('VITE_APP_BUILD_TIME') || getEnvVar('REACT_APP_BUILD_TIME') || defaultConfig.buildTime,
    apiUrl: getEnvVar('VITE_APP_API_URL') || getEnvVar('REACT_APP_API_URL') || envConfig.apiUrl || defaultConfig.apiUrl,
    cdnUrl: getEnvVar('VITE_APP_CDN_URL') || getEnvVar('REACT_APP_CDN_URL') || envConfig.cdnUrl || defaultConfig.cdnUrl
  };
  
  // Override with environment variables
  if (getEnvVar('VITE_APP_ENABLE_ANALYTICS') === 'true' || getEnvVar('REACT_APP_ENABLE_ANALYTICS') === 'true') {
    config.enableAnalytics = true;
  }
  if (getEnvVar('VITE_APP_ENABLE_ERROR_REPORTING') === 'true' || getEnvVar('REACT_APP_ENABLE_ERROR_REPORTING') === 'true') {
    config.enableErrorReporting = true;
  }
  if (getEnvVar('VITE_APP_ENABLE_SERVICE_WORKER') === 'true' || getEnvVar('REACT_APP_ENABLE_SERVICE_WORKER') === 'true') {
    config.enableServiceWorker = true;
  }
  
  return config;
}

// Application configuration
export const config = createConfig();

// Environment checking functions
export const isProduction = (): boolean => config.environment === 'production';
export const isDevelopment = (): boolean => config.environment === 'development';
export const isStaging = (): boolean => config.environment === 'staging';
export const isTest = (): boolean => config.environment === 'test';

// Feature flags
export const isFeatureEnabled = (feature: keyof AppConfig['features']): boolean => {
  return config.features[feature] === true;
};

// Environment info
export const getEnvironmentInfo = () => ({
  environment: config.environment,
  version: config.version,
  buildTime: config.buildTime,
  features: config.features,
  userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
  timestamp: new Date().toISOString()
});

// Configuration validation
export const validateConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate required URLs
  if (!config.apiUrl) {
    errors.push('API URL is required');
  }
  
  if (!config.cdnUrl) {
    errors.push('CDN URL is required');
  }
  
  // Validate timeouts
  if (config.requestTimeout < 1000 || config.requestTimeout > 30000) {
    errors.push('Request timeout should be between 1s and 30s');
  }
  
  if (config.cacheTimeout < 60000) {
    errors.push('Cache timeout should be at least 1 minute');
  }
  
  // Validate limits
  if (config.limits.maxCartItems < 1 || config.limits.maxCartItems > 1000) {
    errors.push('Max cart items should be between 1 and 1000');
  }
  
  if (config.limits.maxWishlistItems < 1 || config.limits.maxWishlistItems > 1000) {
    errors.push('Max wishlist items should be between 1 and 1000');
  }
  
  // Production-specific validations
  if (isProduction()) {
    if (!config.enableAnalytics) {
      errors.push('Analytics should be enabled in production');
    }
    
    if (!config.enableErrorReporting) {
      errors.push('Error reporting should be enabled in production');
    }
    
    if (config.enableDevTools) {
      errors.push('Dev tools should be disabled in production');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Performance monitoring
export const getPerformanceConfig = () => ({
  enableMetrics: isProduction() || isStaging(),
  sampleRate: isProduction() ? 0.1 : 1.0, // 10% sampling in production
  maxEvents: isProduction() ? 1000 : 100,
  batchSize: 10,
  flushInterval: 30000 // 30 seconds
});

// Security configuration
export const getSecurityConfig = () => ({
  enableCSP: isProduction(),
  enableHSTS: isProduction(),
  enableXSSProtection: true,
  enableFrameGuard: true,
  sessionTimeout: isProduction() ? 30 * 60 * 1000 : 60 * 60 * 1000, // 30 min in prod, 60 min in dev
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000 // 15 minutes
});

// API configuration
export const getApiConfig = () => ({
  baseURL: config.apiUrl,
  timeout: config.requestTimeout,
  retries: config.maxRetries,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Client-Version': config.version,
    'X-Client-Environment': config.environment
  }
});

// Cache configuration
export const getCacheConfig = () => ({
  defaultTTL: config.cacheTimeout,
  maxSize: isProduction() ? 100 : 50, // MB
  enableCompression: isProduction(),
  enablePersistence: true,
  strategies: {
    api: 'network-first',
    static: 'cache-first',
    images: 'cache-first'
  }
});

// Debug utilities
export const debugInfo = () => {
  if (!isDevelopment()) return;
  
  console.group('🔧 Environment Configuration');
  console.log('Environment:', config.environment);
  console.log('Version:', config.version);
  console.log('Build Time:', config.buildTime);
  console.log('Features:', config.features);
  console.log('Limits:', config.limits);
  console.log('URLs:', config.urls);
  console.log('Full Config:', config);
  console.groupEnd();
  
  const validation = validateConfig();
  if (!validation.valid) {
    console.warn('⚠️ Configuration Issues:', validation.errors);
  }
};

// Export the configuration
export default config;

// Legacy exports for backward compatibility
export const NODE_ENV = config.environment;
export const API_URL = config.apiUrl;
export const CDN_URL = config.cdnUrl;
export const VERSION = config.version;