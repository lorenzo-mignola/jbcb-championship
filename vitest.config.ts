import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.test.ts']
  },
  resolve: {
    alias: {
      $lib: path.resolve(__dirname, './src/lib'),
      $tests: path.resolve(__dirname, './tests')
    }
  }
});
