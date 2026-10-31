import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import devtoolsJson from 'vite-plugin-devtools-json';
import { defineConfig } from 'vitest/config';

const pwa = SvelteKitPWA({
  base: '/',
  devOptions: {
    enabled: true,
  },
  manifest: {
    background_color: '#7f2f3b',
    display: 'standalone',
    icons: [
      {
        sizes: '192x192',
        src: '/android-chrome-192x192.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: '/android-chrome-512x512.png',
        type: 'image/png',
      },
      {
        purpose: 'any maskable',
        sizes: '512x512',
        src: '/android-chrome-512x512.png',
        type: 'image/png',
      },
    ],
    name: 'JBCB Championship',
    scope: '/',
    short_name: 'JBCB Championship',
    start_url: '/',
    theme_color: '#7f2f3b',
  },
  registerType: 'autoUpdate',
  scope: '/',
});

for (const p of (pwa as any[])) {
  if (p && 'transformIndexHtml' in p) {
    delete p.transformIndexHtml;
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit({
      adapter: adapter({
        runtime: 'nodejs26.x',
      }),
      preprocess: vitePreprocess(),
    }),
    pwa,
    devtoolsJson(),
  ],
  resolve: {
    conditions: ['browser', 'development'],
  },
  test: {
    coverage: {
      exclude: ['src/**/.svelte-kit/*'],
      include: ['src/**/*.{ts,svelte}'],
      provider: 'v8',
    },
    expect: { requireAssertions: true },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          environment: 'happy-dom',
          include: ['src/**/*.{test,spec}.{js,ts}', 'src/**/*-state.svelte.{test,spec}.{js,ts}'],
          name: 'client',
          setupFiles: ['./tests/setup/testing-library-setup.ts'],
        },
      },
    ],
  },
});
