import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const base = process.env.BASE_PATH ?? '';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      manifest: {
        name: 'Curso de Español',
        short_name: 'Español',
        description: 'Curso de espanhol (latino-americano) do casal · áudio + offline',
        lang: 'pt-BR',
        theme_color: '#C84B31',
        background_color: '#FFF7EC',
        display: 'standalone',
        orientation: 'portrait',
        start_url: `${base}/`,
        scope: `${base}/`,
        id: `${base}/`,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Precache o app shell, as páginas pré-renderizadas E os mp3 do curso → offline total.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webp,jpg,jpeg,woff2,json,txt,mp3}'],
        navigateFallback: `${base}/`,
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true
      },
      devOptions: { enabled: false }
    })
  ]
});
