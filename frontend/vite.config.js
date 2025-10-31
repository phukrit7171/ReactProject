import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    host: true, // เพื่อให้เข้าถึงได้จากภายนอก container
    port: 3000,
    strictPort: true, // ไม่ให้เปลี่ยน port อัตโนมัติ
    hmr: {
      host: 'localhost',
      port: 3000,
      clientPort: 3000,
      protocol: 'ws'
    },
    watch: {
      usePolling: true,      // จำเป็นสำหรับ Docker ใน Windows
      interval: 1000,        // ลดการใช้ CPU
      followSymlinks: false  // ไม่ต้องติดตาม symlinks
    }
  },
  plugins: [react()]
});