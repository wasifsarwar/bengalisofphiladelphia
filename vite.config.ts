import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/bengalisofphiladelphia/',
  build: {
    sourcemap: false,
    rollupOptions: { input: { main: 'index.html', concept: 'concept.html' } },
  },
});
