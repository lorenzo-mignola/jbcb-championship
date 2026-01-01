import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit(), devtoolsJson()],

  test: {
    expect: { requireAssertions: true },

    projects: [
      {
        extends: './vite.config.ts',

        test: {
          environment: 'node',
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          include: ['src/**/*.{test,spec}.{js,ts}'],
          name: 'server',
        },
      },
    ],
  },
});
