import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  testMatch: /(.+\.)?(spec)\.ts/,
  use: {
    storageState: 'tests/storage/category.json'
  },
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173
  }
});
