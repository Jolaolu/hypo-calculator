import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'https://hypofriend.de/',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/main.scss";
        `,
        javascriptEnabled: true,
      },
    },
  },
})