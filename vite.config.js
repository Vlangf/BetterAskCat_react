import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Настройки для продакшн сборки
    outDir: 'dist',
    assetsDir: 'assets',
    // Минимизация для уменьшения размера
    minify: 'terser',
    // Отключаем source maps в продакшене
    sourcemap: false,
    // Настройки для корректной работы в Telegram Web App
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Убираем хэши из имен файлов для стабильных URL
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  // Настройки для разработки
  server: {
    host: true, // Доступ с других устройств в сети
    port: 5173,
    strictPort: true, // Не менять порт если занят
    // Настройки для работы через HTTPS (нужно для Telegram Web App)
    https: false, // Включите если нужен HTTPS
    // Настройки для прокси если нужно
    proxy: {
      // Пример настройки прокси для API
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
