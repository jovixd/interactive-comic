import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const useGithubActions = process.env.VITE_USE_GITHUB_ACTIONS
  console.log("GitHub Actions is", useGithubActions)
  return {
    base: useGithubActions ? '/interactive-comic/' : '/',
    plugins: [react()]
  }
});
