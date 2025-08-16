import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Define aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@components': resolve(__dirname, './components'),
      '@utils': resolve(__dirname, './utils'),
      '@services': resolve(__dirname, './services'),
      '@styles': resolve(__dirname, './styles')
    }
  },
  
  // Development server configuration
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          utils: ['react-hook-form']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  // CSS configuration
  css: {
    postcss: './postcss.config.js',
    devSourcemap: true
  },
  
  // Environment variables
  envPrefix: 'VITE_',
  
  // Optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react'
    ]
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    host: true,
    cors: true
  }
});