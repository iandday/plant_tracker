import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const base = process.env.BASE

// https://vitejs.dev/config/
export default defineConfig({
  base: '/static',
  plugins: [react()],
})
