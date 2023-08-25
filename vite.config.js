import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //  配置代理
  server: {
    open: true, // 自动启动浏览器
    host: "192.168.2.144", // localhost
    port: 5173, // 端口号
    https: false
  }
})
