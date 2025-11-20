import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [vue()],
    define: {
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      'import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY': JSON.stringify(env.VITE_MERCADOPAGO_PUBLIC_KEY),
      'import.meta.env.VITE_MERCADOPAGO_ACCESS_TOKEN': JSON.stringify(env.VITE_MERCADOPAGO_ACCESS_TOKEN),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
