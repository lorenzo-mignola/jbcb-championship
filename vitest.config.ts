import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup/testing-library-setup.ts'],
    include: ['**/*.test.ts'],
    silent: process.env.CI === 'true'
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
    alias: {
      $lib: path.resolve(__dirname, './src/lib'),
      $tests: path.resolve(__dirname, './tests'),
      $app: path.resolve(__dirname, './tests/mock/$app-mock')
    }
  }
}));
