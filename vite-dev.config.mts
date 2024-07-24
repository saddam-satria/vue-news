import { defineConfig } from 'vite';
import baseConfig from './vite.config.mjs';

export default defineConfig({
  ...baseConfig,
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
