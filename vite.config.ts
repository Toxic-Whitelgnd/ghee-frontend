import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Creates a separate chunk for react and react-dom
          react: ['react', 'react-dom'],
          // Separate chunk for lodash
          lodash: ['lodash'],
        },
      },
    },
  }
})
