import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA(
      {
        base: '/',
        manifest: {
          background_color: '#7f2f3b',
          icons: [
            {
              sizes: '192x192',
              src: '/192.png',
              type: 'image/png',
            },
            {
              sizes: '512x512',
              src: '/512.png',
              type: 'image/png',
            },
            {
              purpose: 'any maskable',
              sizes: '512x512',
              src: '/512.png',
              type: 'image/png',
            },
          ],
          name: 'JBCB Championship',
          short_name: 'JBCB Championship',
          theme_color: '#7f2f3b',
        },
        scope: '/',
      },
    ),
    devtoolsJson(),
  ],
  test: {
    coverage: {
      include: ['src/**/*.{ts,svelte}'],
      provider: 'v8',
    },
    expect: { requireAssertions: true },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}', 'src/**/*-state.svelte.{test,spec}.{js,ts}'],
          name: 'server',
        },
      },
    ],
  },
});
