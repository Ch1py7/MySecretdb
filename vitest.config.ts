import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: './',
  optimizeDeps: {
    entries: [],
  },
  resolve: {
    alias: {
      tests: path.resolve(__dirname, 'src/__tests__'),
      application: path.resolve(__dirname, 'src/application/'),
      domain: path.resolve(__dirname, 'src/domain/'),
      infrastructure: path.resolve(__dirname, 'src/infrastructure/'),
    },
  }
})