import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Force it to use 5173
    strictPort: true, // Prevents it from switching to 5174
    host: "0.0.0.0",  // Allows external access if needed
    watch: {
      usePolling: true, // Ensures file changes are detected in Docker
    },
    hmr: {
      clientPort: 5173, // Ensures Vite HMR connects properly
    },
  },
});
