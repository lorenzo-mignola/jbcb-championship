import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
  plugins: [
    sveltekit(),
    purgeCss(),
    SvelteKitPWA({
      scope: '/',
      base: '/',
      manifest: {
        short_name: 'JBCB Championship',
        name: 'JBCB Championship',
        theme_color: '#7f2f3b',
        background_color: '#7f2f3b',
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});
