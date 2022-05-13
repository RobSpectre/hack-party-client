import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import EnvironmentPlugin from 'vite-plugin-environment'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/')
    }
  },
  plugins: [
    vue(),
    EnvironmentPlugin(['VUE_APP_TOKEN_URI'])
  ]
})
