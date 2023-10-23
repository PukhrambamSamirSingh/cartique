import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define the NODE_ENV variable as "production"
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
