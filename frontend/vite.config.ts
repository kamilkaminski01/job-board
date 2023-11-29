import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    host: true,
    port: 3000
  },

  css: {
    preprocessorOptions: { scss: { additionalData: '@import "src/utils/variables.scss";' } }
  }
})
