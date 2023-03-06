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
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://hypofriend.de',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/^\/api/', ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
          "Accept-Language": "en,de;q=0.9,cs;q=0.8",
          'foo': 'bar'
        }
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