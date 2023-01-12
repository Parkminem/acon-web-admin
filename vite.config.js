import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // alias: { '@': `${path.resolve(__dirname, 'src')}/` }
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/_vars.scss"; @import "./src/style/_mixin.scss";`
      }
    }
  }
});
