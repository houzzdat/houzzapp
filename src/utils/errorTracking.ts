interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
}

class ErrorTracker {
  private isEnabled: boolean;
  private endpoint: string;

  constructor() {
    this.isEnabled = import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true';
    this.endpoint = import.meta.env.VITE_ERROR_TRACKING_ENDPOINT || '/api/errors';
  }

  captureError(error: Error, errorInfo?: { componentStack?: string }, userId?: string) {
    if (!this.isEnabled) {
      console.error('Error captured (tracking disabled):', error);
      return;
    }

    const errorData: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId
    };

    // Send to error tracking service
    this.sendError(errorData);
  }

  private async sendError(errorData: ErrorInfo) {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      });
    } catch (err) {
      console.error('Failed to send error to tracking service:', err);
    }
  }

  setUser(userId: string) {
    // Set user context for error tracking
    if (this.isEnabled) {
      // Implementation for user context
    }
  }
}

export const errorTracker = new ErrorTracker();

// React Error Boundary hook
export const useErrorBoundary = () => {
  const handleError = (error: Error, errorInfo: { componentStack?: string }) => {
    errorTracker.captureError(error, errorInfo);
  };

  return { handleError };
};

// Global error handler
export const setupGlobalErrorHandling = () => {
  window.addEventListener('error', (event) => {
    errorTracker.captureError(event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.captureError(new Error(event.reason));
  });
}; 