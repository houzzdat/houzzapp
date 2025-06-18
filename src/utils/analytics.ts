interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: string;
  userId?: string;
  sessionId: string;
}

class Analytics {
  private isEnabled: boolean;
  private endpoint: string;
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.isEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
    this.endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT || '/api/analytics';
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }

  track(event: string, properties?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log('Analytics event (tracking disabled):', event, properties);
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId
    };

    this.sendEvent(analyticsEvent);
  }

  trackPageView(page: string) {
    this.track('page_view', { page });
  }

  trackUserAction(action: string, details?: Record<string, any>) {
    this.track('user_action', { action, ...details });
  }

  trackError(error: string, context?: Record<string, any>) {
    this.track('error', { error, ...context });
  }

  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    this.track('performance', { metric, value, unit });
  }

  setUser(userId: string) {
    this.userId = userId;
  }

  private async sendEvent(event: AnalyticsEvent) {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (err) {
      console.error('Failed to send analytics event:', err);
    }
  }
}

export const analytics = new Analytics();

// React hook for analytics
export const useAnalytics = () => {
  return {
    track: analytics.track.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackUserAction: analytics.trackUserAction.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    setUser: analytics.setUser.bind(analytics)
  };
};

// Performance monitoring
export const setupPerformanceMonitoring = () => {
  if (!analytics.isAnalyticsEnabled()) return;

  // Track page load performance
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      analytics.trackPerformance('page_load_time', navigation.loadEventEnd - navigation.loadEventStart);
      analytics.trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
    }
  });

  // Track resource loading performance
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        analytics.trackPerformance('resource_load_time', resourceEntry.duration, resourceEntry.name);
      }
    }
  });

  observer.observe({ entryTypes: ['resource'] });
}; 