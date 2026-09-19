import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',
    // Raise warning only for genuinely large chunks (500kB+)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Manual chunk: separate vendor (React + ReactDOM) from app code.
        // Browser can cache the vendor chunk independently of app changes.
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
