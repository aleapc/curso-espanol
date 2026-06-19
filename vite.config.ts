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
      // KILL SWITCH: o service worker do curso estava dando 505 no Safari/iOS
      // (o Garoa, mesmo stack, funciona). Este SW autodestrutivo desregistra o
      // SW quebrado e limpa os caches no aparelho → o app volta a ser site
      // estático puro (verificado 200). Offline volta depois, testado.
      selfDestroying: true,
      manifest: {
        name: 'Hablá — Español rioplatense',
        short_name: 'Hablá',
        description: 'Curso de espanhol rioplatense (voseo) do casal · áudio-first + offline',
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
        // Precache SÓ o app shell (leve). Os ~2.300 mp3 + fotos (150 MB+) NÃO entram
        // no precache — no iOS isso estourava a cota e travava o app (erro 500).
        // Áudio e imagens são cacheados sob demanda (CacheFirst): tocou/abriu uma vez
        // com internet → fica offline depois.
        globPatterns: ['**/*.{js,css,html,svg,ico,woff2,txt}', 'icon-*.png', 'favicon.svg', 'manifest.webmanifest'],
        navigateFallback: `${base}/`,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /\/audio\/[^?]+\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-clips',
              expiration: { maxEntries: 3000, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /\/img\/[^?]+\.(?:jpg|jpeg|png|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'card-img',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      devOptions: { enabled: false }
    })
  ]
});
