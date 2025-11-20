
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  // Fix: Define process.env as an empty object to prevent "process is not defined" crash in browser
  define: {
    'process.env': {}
  }
});
