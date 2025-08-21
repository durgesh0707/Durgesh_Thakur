import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  appType: 'spa', // 👈 This tells Vite to fallback to index.html for all routes
});
