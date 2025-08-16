/**
 * Professional Production Configuration
 * Optimized settings for production deployment
 */

import { AppConfig } from '../utils/environment';

// Production-specific environment variables interface
interface ProductionEnvVars {
  // Core
  REACT_APP_VERSION: string;
  REACT_APP_BUILD_TIME: string;
  REACT_APP_BUILD_ID: string;
  
  // APIs and Services
  REACT_APP_API_URL: string;
  REACT_APP_CDN_URL: string;
  REACT_APP_WEBSOCKET_URL: string;
  
  // Analytics and Monitoring
  REACT_APP_ANALYTICS_KEY: string;
  REACT_APP_SENTRY_DSN: string;
  REACT_APP_HOTJAR_ID: string;
  REACT_APP_GTM_ID: string;
  
  // Authentication
  REACT_APP_AUTH_DOMAIN: string;
  REACT_APP_OAUTH_CLIENT_ID: string;
  
  // Payment Gateway
  REACT_APP_RAZORPAY_KEY_ID: string;
  REACT_APP_STRIPE_PUBLIC_KEY: string;
  
  // External Services
  REACT_APP_FIREBASE_CONFIG: string;
  REACT_APP_CLOUDFLARE_ZONE_ID: string;
  
  // Feature Flags
  REACT_APP_ENABLE_PWA: string;
  REACT_APP_ENABLE_OFFLINE_MODE: string;
  REACT_APP_ENABLE_PUSH_NOTIFICATIONS: string;
  REACT_APP_ENABLE_CHAT_SUPPORT: string;
  
  // Performance
  REACT_APP_IMAGE_OPTIMIZATION: string;
  REACT_APP_LAZY_LOADING: string;
  REACT_APP_PRELOAD_CRITICAL_RESOURCES: string;
  
  // Security
  REACT_APP_CSP_NONCE: string;
  REACT_APP_HSTS_MAX_AGE: string;
}

// Production configuration
export const productionConfig: Partial<AppConfig> & {
  // Additional production-specific settings
  build: {
    optimization: boolean;
    minification: boolean;
    compression: boolean;
    sourceMap: boolean;
    bundleAnalysis: boolean;
  };
  performance: {
    enableWebVitals: boolean;
    enableResourceTiming: boolean;
    enableNavigationTiming: boolean;
    enableMemoryMonitoring: boolean;
    performanceBudget: {
      maxBundleSize: number; // KB
      maxInitialLoad: number; // seconds
      maxLCP: number; // seconds
      maxFID: number; // milliseconds
      maxCLS: number; // score
    };
  };
  security: {
    enableCSP: boolean;
    enableHSTS: boolean;
    enableXSSProtection: boolean;
    enableReferrerPolicy: boolean;
    enablePermissionsPolicy: boolean;
    trustedDomains: string[];
    allowedImageSources: string[];
    allowedScriptSources: string[];
  };
  monitoring: {
    enableErrorBoundaryReporting: boolean;
    enablePerformanceMonitoring: boolean;
    enableUserSessionRecording: boolean;
    enableA11yMonitoring: boolean;
    errorSamplingRate: number;
    performanceSamplingRate: number;
  };
  caching: {
    staticAssetsCacheDuration: number;
    apiResponseCacheDuration: number;
    imageCacheDuration: number;
    enableServiceWorkerCaching: boolean;
    cacheStrategies: {
      pages: 'network-first' | 'cache-first' | 'stale-while-revalidate';
      api: 'network-first' | 'cache-first' | 'stale-while-revalidate';
      images: 'cache-first' | 'network-first' | 'stale-while-revalidate';
      fonts: 'cache-first' | 'network-first' | 'stale-while-revalidate';
    };
  };
  seo: {
    enableStructuredData: boolean;
    enableOpenGraph: boolean;
    enableTwitterCards: boolean;
    enableCanonicalUrls: boolean;
    enableSitemap: boolean;
    enableRobotsTxt: boolean;
  };
} = {
  // Base configuration
  environment: 'production',
  enableAnalytics: true,
  enableErrorReporting: true,
  enableServiceWorker: true,
  enableDevTools: false,
  
  // Request configuration
  maxRetries: 2,
  requestTimeout: 8000,
  cacheTimeout: 10 * 60 * 1000, // 10 minutes
  
  // Feature flags
  features: {
    auth: true,
    cart: true,
    wishlist: true,
    notifications: true,
    recommendations: true,
    analytics: true,
    experiments: true
  },
  
  // Limits
  limits: {
    maxCartItems: 100,
    maxWishlistItems: 200,
    maxSearchResults: 50,
    maxFileSize: 10 * 1024 * 1024 // 10MB
  },
  
  // URLs
  urls: {
    privacyPolicy: 'https://edumall.in/privacy-policy',
    termsOfService: 'https://edumall.in/terms-of-service',
    contactUs: 'https://edumall.in/contact-us',
    helpCenter: 'https://help.edumall.in',
    socialMedia: {
      facebook: 'https://www.facebook.com/EduMallOfficial',
      instagram: 'https://www.instagram.com/edumall_official',
      youtube: 'https://www.youtube.com/@EduMallOfficial',
      linkedin: 'https://www.linkedin.com/company/edumall-india'
    }
  },
  
  // Build configuration
  build: {
    optimization: true,
    minification: true,
    compression: true,
    sourceMap: false, // Disable in production for security
    bundleAnalysis: false
  },
  
  // Performance configuration
  performance: {
    enableWebVitals: true,
    enableResourceTiming: true,
    enableNavigationTiming: true,
    enableMemoryMonitoring: true,
    performanceBudget: {
      maxBundleSize: 2048, // 2MB
      maxInitialLoad: 3, // 3 seconds
      maxLCP: 2.5, // 2.5 seconds
      maxFID: 100, // 100ms
      maxCLS: 0.1 // 0.1 score
    }
  },
  
  // Security configuration
  security: {
    enableCSP: true,
    enableHSTS: true,
    enableXSSProtection: true,
    enableReferrerPolicy: true,
    enablePermissionsPolicy: true,
    trustedDomains: [
      'edumall.in',
      '*.edumall.in',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'api.razorpay.com',
      'checkout.razorpay.com',
      'js.stripe.com',
      'checkout.stripe.com'
    ],
    allowedImageSources: [
      'self',
      'data:',
      '*.edumall.in',
      'images.unsplash.com',
      'via.placeholder.com',
      'cdn.razorpay.com'
    ],
    allowedScriptSources: [
      'self',
      '*.edumall.in',
      'checkout.razorpay.com',
      'js.stripe.com',
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'static.hotjar.com',
      'script.hotjar.com'
    ]
  },
  
  // Monitoring configuration
  monitoring: {
    enableErrorBoundaryReporting: true,
    enablePerformanceMonitoring: true,
    enableUserSessionRecording: true,
    enableA11yMonitoring: false, // Enable in staging first
    errorSamplingRate: 1.0, // 100% error tracking
    performanceSamplingRate: 0.1 // 10% performance tracking
  },
  
  // Caching configuration
  caching: {
    staticAssetsCacheDuration: 365 * 24 * 60 * 60, // 1 year
    apiResponseCacheDuration: 10 * 60, // 10 minutes
    imageCacheDuration: 30 * 24 * 60 * 60, // 30 days
    enableServiceWorkerCaching: true,
    cacheStrategies: {
      pages: 'stale-while-revalidate',
      api: 'network-first',
      images: 'cache-first',
      fonts: 'cache-first'
    }
  },
  
  // SEO configuration
  seo: {
    enableStructuredData: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
    enableCanonicalUrls: true,
    enableSitemap: true,
    enableRobotsTxt: true
  }
};

// Content Security Policy
export const getContentSecurityPolicy = (nonce?: string): string => {
  const policies = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${nonce ? `'nonce-${nonce}'` : ''} checkout.razorpay.com js.stripe.com www.googletagmanager.com www.google-analytics.com static.hotjar.com script.hotjar.com`,
    "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
    "font-src 'self' fonts.gstatic.com",
    "img-src 'self' data: *.edumall.in images.unsplash.com via.placeholder.com cdn.razorpay.com www.google-analytics.com static.hotjar.com",
    "connect-src 'self' *.edumall.in api.razorpay.com checkout.razorpay.com api.stripe.com www.google-analytics.com *.hotjar.com wss://*.hotjar.com",
    "frame-src checkout.razorpay.com js.stripe.com vars.hotjar.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' checkout.razorpay.com",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ];
  
  return policies.join('; ');
};

// Security Headers
export const getSecurityHeaders = (): Record<string, string> => ({
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Content-Security-Policy': getContentSecurityPolicy(),
  'X-Robots-Tag': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
});

// Performance monitoring configuration
export const getPerformanceMonitoringConfig = () => ({
  // Core Web Vitals thresholds
  thresholds: {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 }
  },
  
  // Monitoring settings
  sampleRate: productionConfig.monitoring.performanceSamplingRate,
  enableLongTasks: true,
  enableResourceTiming: true,
  enableNavigationTiming: true,
  enableMemoryInfo: true,
  
  // Budgets
  budgets: productionConfig.performance.performanceBudget
});

// Error reporting configuration
export const getErrorReportingConfig = () => ({
  enableSourceMaps: false,
  enableUserContext: true,
  enableBreadcrumbs: true,
  enablePerformanceMonitoring: true,
  sampleRate: productionConfig.monitoring.errorSamplingRate,
  maxBreadcrumbs: 100,
  attachStacktrace: true,
  sendDefaultPii: false,
  beforeSend: (event: any) => {
    // Filter out sensitive information
    if (event.request?.headers) {
      delete event.request.headers.Authorization;
      delete event.request.headers.Cookie;
    }
    return event;
  }
});

// PWA configuration
export const getPWAConfig = () => ({
  name: 'EduMall - India Ka Edu Bazaar',
  shortName: 'EduMall',
  description: 'Your trusted partner for NEET, JEE, and UPSC exam preparation materials',
  themeColor: '#00B4D8',
  backgroundColor: '#FFFFFF',
  display: 'standalone',
  orientation: 'portrait-primary',
  startUrl: '/',
  scope: '/',
  categories: ['education', 'books', 'shopping'],
  lang: 'en-IN',
  icons: [
    { src: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png', purpose: 'maskable any' },
    { src: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png', purpose: 'maskable any' },
    { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png', purpose: 'maskable any' },
    { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png', purpose: 'maskable any' },
    { src: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png', purpose: 'maskable any' },
    { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable any' },
    { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png', purpose: 'maskable any' },
    { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable any' }
  ],
  shortcuts: [
    {
      name: 'NEET Books',
      shortName: 'NEET',
      description: 'Browse NEET preparation materials',
      url: '/products?category=neet',
      icons: [{ src: '/icons/neet-shortcut.png', sizes: '96x96' }]
    },
    {
      name: 'JEE Books',
      shortName: 'JEE',
      description: 'Browse JEE preparation materials',
      url: '/products?category=jee',
      icons: [{ src: '/icons/jee-shortcut.png', sizes: '96x96' }]
    },
    {
      name: 'UPSC Materials',
      shortName: 'UPSC',
      description: 'Browse UPSC preparation materials',
      url: '/products?category=upsc',
      icons: [{ src: '/icons/upsc-shortcut.png', sizes: '96x96' }]
    },
    {
      name: 'My Cart',
      shortName: 'Cart',
      description: 'View shopping cart',
      url: '/cart',
      icons: [{ src: '/icons/cart-shortcut.png', sizes: '96x96' }]
    }
  ]
});

// Deployment validation
export const validateProductionDeployment = (): { valid: boolean; errors: string[]; warnings: string[] } => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check required environment variables
  const requiredEnvVars = [
    'REACT_APP_VERSION',
    'REACT_APP_API_URL',
    'REACT_APP_CDN_URL'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`);
    }
  });
  
  // Check optional but recommended environment variables
  const recommendedEnvVars = [
    'REACT_APP_ANALYTICS_KEY',
    'REACT_APP_SENTRY_DSN',
    'REACT_APP_RAZORPAY_KEY_ID'
  ];
  
  recommendedEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      warnings.push(`Missing recommended environment variable: ${envVar}`);
    }
  });
  
  // Check security headers
  if (!productionConfig.security.enableCSP) {
    warnings.push('Content Security Policy should be enabled in production');
  }
  
  if (!productionConfig.security.enableHSTS) {
    warnings.push('HSTS should be enabled in production');
  }
  
  // Check performance budget
  const budget = productionConfig.performance.performanceBudget;
  if (budget.maxBundleSize > 3072) { // 3MB
    warnings.push('Bundle size exceeds recommended limit of 3MB');
  }
  
  if (budget.maxInitialLoad > 4) { // 4 seconds
    warnings.push('Initial load time exceeds recommended limit of 4 seconds');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
};

// Export default configuration
export default productionConfig;