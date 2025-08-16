/**
 * Professional Analytics Service
 * Privacy-first, GDPR-compliant analytics with comprehensive error handling
 */

interface AnalyticsConfig {
  writeKey?: string;
  debug?: boolean;
  enableAutoTrack?: boolean;
  privacyMode?: boolean;
  sessionTimeout?: number;
}

interface UserProperties {
  anonymousId?: string;
  userId?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

interface EventProperties {
  [key: string]: any;
}

interface PageProperties {
  title?: string;
  path?: string;
  url?: string;
  referrer?: string;
  timestamp?: string;
  [key: string]: any;
}

class AnalyticsService {
  private config: AnalyticsConfig = {};
  private initialized = false;
  private queue: Array<() => void> = [];
  private sessionId: string;
  private startTime: number;
  private isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    
    // Only initialize if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Monitor network status
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.flushOfflineEvents();
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });

      // Auto-track page visibility
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.track('page_hidden', {
            sessionDuration: Date.now() - this.startTime
          });
        } else {
          this.track('page_visible');
        }
      });
    }
  }

  /**
   * Initialize analytics service
   */
  init(config: AnalyticsConfig): void {
    this.config = {
      debug: false,
      enableAutoTrack: true,
      privacyMode: false,
      sessionTimeout: 30 * 60 * 1000, // 30 minutes
      ...config
    };

    // Check for consent before initializing
    if (this.hasConsent()) {
      this.initialized = true;
      this.log('Analytics initialized', this.config);
      
      // Process queued events
      this.processQueue();
      
      // Auto-track if enabled
      if (this.config.enableAutoTrack) {
        this.enableAutoTrack();
      }
      
      // Start session monitoring
      this.startSessionMonitoring();
    } else {
      this.log('Analytics not initialized - no consent');
    }
  }

  /**
   * Track events
   */
  track(event: string, properties: EventProperties = {}): void {
    if (!this.shouldTrack()) {
      return;
    }

    const eventData = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        url: typeof window !== 'undefined' ? window.location.href : 'unknown',
        referrer: typeof document !== 'undefined' ? document.referrer : 'unknown',
        screenResolution: typeof screen !== 'undefined' ? `${screen.width}x${screen.height}` : 'unknown',
        viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'unknown',
        language: typeof navigator !== 'undefined' ? navigator.language : 'unknown',
        timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'unknown',
        connectionType: this.getConnectionType(),
        deviceType: this.getDeviceType()
      }
    };

    this.log('Tracking event:', eventData);

    if (this.initialized) {
      this.sendEvent(eventData);
    } else {
      this.queue.push(() => this.sendEvent(eventData));
    }
  }

  /**
   * Track page views
   */
  page(name: string, properties: PageProperties = {}): void {
    this.track('page_viewed', {
      pageName: name,
      ...properties,
      loadTime: Date.now() - this.startTime
    });
  }

  /**
   * Identify users
   */
  identify(properties: UserProperties): void {
    if (!this.shouldTrack()) {
      return;
    }

    const userData = {
      ...properties,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    };

    this.log('Identifying user:', userData);

    if (this.initialized) {
      this.sendIdentify(userData);
    } else {
      this.queue.push(() => this.sendIdentify(userData));
    }

    // Store anonymized user data locally
    if (properties.anonymousId && typeof localStorage !== 'undefined') {
      localStorage.setItem('analytics_anonymous_id', properties.anonymousId);
    }
  }

  /**
   * Track conversion events
   */
  conversion(event: string, value?: number, currency = 'INR', properties: EventProperties = {}): void {
    this.track('conversion', {
      conversionEvent: event,
      value,
      currency,
      ...properties
    });
  }

  /**
   * Track e-commerce events
   */
  ecommerce(action: string, properties: EventProperties = {}): void {
    this.track('ecommerce', {
      action,
      ...properties
    });
  }

  /**
   * Track performance metrics
   */
  performance(metric: string, value: number, properties: EventProperties = {}): void {
    this.track('performance', {
      metric,
      value,
      ...properties
    });
  }

  /**
   * Track errors
   */
  error(error: Error | string, properties: EventProperties = {}): void {
    const errorData = typeof error === 'string' ? { message: error } : {
      message: error.message,
      stack: error.stack,
      name: error.name
    };

    this.track('error', {
      ...errorData,
      ...properties
    });
  }

  /**
   * Set user consent
   */
  setConsent(hasConsent: boolean): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('analytics_consent', hasConsent ? 'granted' : 'denied');
    }
    
    if (hasConsent && !this.initialized && this.config.writeKey) {
      this.init(this.config);
    } else if (!hasConsent && this.initialized) {
      this.reset();
    }
  }

  /**
   * Reset analytics data
   */
  reset(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('analytics_anonymous_id');
      localStorage.removeItem('analytics_session_data');
    }
    this.queue = [];
    this.sessionId = this.generateSessionId();
    this.log('Analytics reset');
  }

  /**
   * Get current session info
   */
  getSession(): { sessionId: string; startTime: number; duration: number } {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      duration: Date.now() - this.startTime
    };
  }

  // Private methods

  private shouldTrack(): boolean {
    // Check DNT header
    if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') {
      return false;
    }

    // Check consent
    if (!this.hasConsent()) {
      return false;
    }

    // Check privacy mode
    if (this.config.privacyMode) {
      return false;
    }

    return true;
  }

  private hasConsent(): boolean {
    if (typeof localStorage === 'undefined') {
      return false;
    }
    const consent = localStorage.getItem('analytics_consent');
    return consent === 'granted';
  }

  private processQueue(): void {
    while (this.queue.length > 0) {
      const fn = this.queue.shift();
      if (fn) fn();
    }
  }

  private async sendEvent(eventData: any): Promise<void> {
    try {
      // Multiple endpoint strategy for reliability
      const endpoints = [
        '/api/analytics/track',
        '/api/events'
      ];

      // Send to primary endpoint
      const promises = endpoints.map(endpoint =>
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Analytics-Key': this.config.writeKey || '',
            'X-Session-Id': this.sessionId
          },
          body: JSON.stringify(eventData),
          keepalive: true
        }).catch(err => {
          this.log('Failed to send to', endpoint, err);
          this.storeOfflineEvent('track', eventData);
        })
      );

      // Don't wait for all to complete
      Promise.allSettled(promises);

    } catch (error) {
      this.log('Error sending event:', error);
      this.storeOfflineEvent('track', eventData);
    }
  }

  private async sendIdentify(userData: any): Promise<void> {
    try {
      await fetch('/api/analytics/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Analytics-Key': this.config.writeKey || '',
          'X-Session-Id': this.sessionId
        },
        body: JSON.stringify(userData),
        keepalive: true
      });
    } catch (error) {
      this.log('Error sending identify:', error);
      this.storeOfflineEvent('identify', userData);
    }
  }

  private storeOfflineEvent(type: string, data: any): void {
    if (!this.isOnline && typeof localStorage !== 'undefined') {
      const offlineEvents = JSON.parse(localStorage.getItem('analytics_offline_events') || '[]');
      offlineEvents.push({
        type,
        data,
        timestamp: Date.now()
      });
      
      // Keep only last 100 events to prevent storage overflow
      if (offlineEvents.length > 100) {
        offlineEvents.splice(0, offlineEvents.length - 100);
      }
      
      localStorage.setItem('analytics_offline_events', JSON.stringify(offlineEvents));
    }
  }

  private flushOfflineEvents(): void {
    if (typeof localStorage === 'undefined') return;
    
    const offlineEvents = JSON.parse(localStorage.getItem('analytics_offline_events') || '[]');
    
    offlineEvents.forEach((event: any) => {
      if (event.type === 'track') {
        this.sendEvent(event.data);
      } else if (event.type === 'identify') {
        this.sendIdentify(event.data);
      }
    });
    
    localStorage.removeItem('analytics_offline_events');
    this.log('Flushed', offlineEvents.length, 'offline events');
  }

  private enableAutoTrack(): void {
    if (typeof document === 'undefined') return;
    
    // Auto-track clicks on important elements
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        const text = target.textContent?.trim().substring(0, 50) || '';
        const href = target.getAttribute('href');
        
        this.track('element_clicked', {
          elementType: target.tagName.toLowerCase(),
          elementText: text,
          elementHref: href,
          elementId: target.id,
          elementClass: target.className
        });
      }
    });

    // Auto-track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.track('form_submitted', {
        formId: form.id,
        formAction: form.action,
        formMethod: form.method
      });
    });

    // Auto-track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth && scrollDepth % 25 === 0) {
        maxScrollDepth = scrollDepth;
        this.track('scroll_depth', { depth: scrollDepth });
      }
    };
    
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScrollDepth, 100);
    });
  }

  private startSessionMonitoring(): void {
    if (typeof window === 'undefined') return;
    
    // Track session duration periodically
    setInterval(() => {
      const sessionData = {
        sessionId: this.sessionId,
        duration: Date.now() - this.startTime,
        pageUrl: window.location.href,
        timestamp: new Date().toISOString()
      };
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('analytics_session_data', JSON.stringify(sessionData));
      }
      
      // Track long sessions
      if (sessionData.duration > 10 * 60 * 1000 && sessionData.duration % (5 * 60 * 1000) === 0) {
        this.track('long_session', { 
          duration: sessionData.duration,
          durationMinutes: Math.round(sessionData.duration / 60000)
        });
      }
    }, 60000); // Every minute

    // Handle session timeout
    let lastActivity = Date.now();
    
    const updateActivity = () => {
      lastActivity = Date.now();
    };
    
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });
    
    // Check for session timeout
    setInterval(() => {
      const sessionTimeout = this.config.sessionTimeout || 30 * 60 * 1000;
      if (Date.now() - lastActivity > sessionTimeout) {
        this.track('session_timeout', {
          inactiveTime: Date.now() - lastActivity,
          sessionDuration: Date.now() - this.startTime
        });
        
        // Start new session
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        lastActivity = Date.now();
      }
    }, 60000); // Check every minute
  }

  private generateSessionId(): string {
    return 'ses_' + Date.now() + '_' + Math.random().toString(36).substring(2);
  }

  private getConnectionType(): string {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection?.effectiveType || 'unknown';
  }

  private getDeviceType(): string {
    if (typeof window === 'undefined') return 'unknown';
    
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log('[Analytics]', ...args);
    }
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// Type-safe wrapper functions
export const trackEvent = (event: string, properties?: EventProperties) => 
  analytics.track(event, properties);

export const trackPage = (name: string, properties?: PageProperties) => 
  analytics.page(name, properties);

export const identifyUser = (properties: UserProperties) => 
  analytics.identify(properties);

export const trackConversion = (event: string, value?: number, currency?: string, properties?: EventProperties) => 
  analytics.conversion(event, value, currency, properties);

export const trackEcommerce = (action: string, properties?: EventProperties) => 
  analytics.ecommerce(action, properties);

export const trackPerformance = (metric: string, value: number, properties?: EventProperties) => 
  analytics.performance(metric, value, properties);

export const trackError = (error: Error | string, properties?: EventProperties) => 
  analytics.error(error, properties);

export default analytics;