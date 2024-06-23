import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd())
  const useGithubActions = process.env.VITE_USE_GITHUB_ACTIONS
  return {
    base: useGithubActions ? '/interactive-comic/' : '/',
    plugins: [react()]
  }
});
