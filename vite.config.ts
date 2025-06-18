import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-toast'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'date-fns', 'zod'],
          'charts-vendor': ['recharts'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers'],
          // Feature chunks - using specific files instead of directories
          'estimation': [
            './src/utils/estimationAlgorithms.ts',
            './src/utils/enhancedEstimationAlgorithms.ts'
          ],
          'materials': [
            './src/hooks/useMaterials.ts',
            './src/services/materialTrackingService.ts'
          ],
          'labor': [
            './src/hooks/useLaborData.ts',
            './src/services/laborService.ts',
            './src/services/laborPaymentService.ts'
          ],
          'finance': [
            './src/services/financialTransactionService.ts',
            './src/services/invoicePaymentService.ts'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}));
