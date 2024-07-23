import { defineConfig } from 'vite';
import baseConfig from './vite.config.mjs';

export default defineConfig({
  ...baseConfig,
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://newsapi.org',
        changeOrigin: true,
      },
    },
  },
});
