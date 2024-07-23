import { defineConfig } from 'vite';
import baseConfig from './vite.config.mjs';
export default defineConfig({
  ...baseConfig,
  build: {
    minify: 'esbuild',
    sourcemap: false,
    assetsDir: 'public',
    outDir: 'build',
  },
});
