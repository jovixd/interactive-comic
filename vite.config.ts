import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const useSubDirectory = import.meta.env.PROD === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  base: useSubDirectory ? '/interactive-comic/' : '/',
  plugins: [react()],
});
