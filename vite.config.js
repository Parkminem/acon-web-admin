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
        additionalData: `@import "@/assets/manager/style/_vars.scss"; @import "@/assets/manager/style/_mixin.scss";`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          var info = assetInfo.name.split('.');
          var extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/woff|woff2/.test(extType)) {
            extType = 'css';
          }
          return `static/admin/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'static/admin/js/[name]-[hash].js',
        entryFileNames: 'static/admin/js/[name]-[hash].js'
      }
    }
  }
});
