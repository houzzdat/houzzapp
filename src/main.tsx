import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setupGlobalErrorHandling } from './utils/errorTracking'
import { setupPerformanceMonitoring } from './utils/analytics'

// Setup global error handling and performance monitoring
setupGlobalErrorHandling();
setupPerformanceMonitoring();

createRoot(document.getElementById("root")!).render(<App />);
