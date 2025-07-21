import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // 匹配所有以 '/api' 开头的请求
      '/api': {
         /*target: 'http://localhost:3000', // 替换为你的后端实际域名*/
        target: 'https://www.qiangwangsese.top/', // 替换为你的后端实际域名
        changeOrigin: true, // 允许跨域
      },
    },
  },
})
