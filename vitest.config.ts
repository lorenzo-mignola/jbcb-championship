import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';

const defaultCoverageExclude = configDefaults.coverage.exclude || [];
const defaultCoverageReporter = configDefaults.coverage.reporter || [];

export default defineConfig(({ mode }) => ({
  plugins: [svelte()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup/testing-library-setup.ts'],
    include: ['**/*.test.ts'],
    silent: process.env.CI === 'true',
    watch: false,
    coverage: {
      exclude: [...defaultCoverageExclude, '**/+page.server.ts', '**/*.config.*'],
      reporter: [...defaultCoverageReporter, 'html']
    }
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
