import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite} from "@tanstack/router-plugin/vite"

// https://vitejs.dev/config/
export default defineConfig(() => {
  const useGithubActions = process.env.VITE_USE_GITHUB_ACTIONS
  return {
    base: useGithubActions ? '/interactive-comic/' : '/',
    plugins: [
      TanStackRouterVite(),
      react()
    ]
  }
});
