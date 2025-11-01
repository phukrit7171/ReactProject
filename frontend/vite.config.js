import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    host: true, // Allow access from outside container
    port: 3000,
    strictPort: true, // Don't change port automatically
    hmr: {
      host: 'localhost',
      port: 3000,
      clientPort: 3000,
      protocol: 'ws'
    },
    watch: {
      usePolling: true,      // Required for Docker on Windows
      interval: 1000,        // Reduce CPU usage
      followSymlinks: false  // Don't follow symlinks
    }
  },
  plugins: [react()]
});