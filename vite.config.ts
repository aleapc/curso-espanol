import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const base = process.env.BASE_PATH ?? '';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      // Registro é MANUAL no +layout.svelte (onMount): com prerender o 'auto'
      // não injeta script nenhum nos HTMLs — o SW ficava gerado mas nunca registrado.
      injectRegister: null,
      strategies: 'generateSW',
      // Sem isto o precache sai com {url:"/"} (raiz do DOMÍNIO → 404 no Pages →
      // install do SW aborta inteiro) e rotas sem a barra final que o app usa.
      kit: {
        trailingSlash: 'always',
        adapterFallback: '404.html',
        // O plugin lê o base do VITE — mas o nosso vive no svelte.config
        // (kit.paths.base). Sem isto a home saía {url:"/"} ABSOLUTO no precache
        // (raiz do DOMÍNIO = 404 no Pages) e o install do SW abortava inteiro.
        // (Marcada deprecated, mas o código do plugin ainda a usa: base = kit.base ?? vite.base)
        base: `${base}/`
      },
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
        // png cobre os 3 ícones (as fotos dos cards são webp/jpg e ficam DE FORA,
        // cacheadas em runtime). Os padrões avulsos antigos (icon-*.png etc.) não
        // casavam nada e só geravam warnings — os ícones entram via manifest.
        // NUNCA definir manifestTransforms aqui: substituiria o transform interno
        // do plugin que converte prerendered/pages/*.html nas URLs finais.
        globPatterns: ['**/*.{js,css,html,svg,ico,png,woff2,txt}'],
        navigateFallback: `${base}/`,
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // O índice que decide premium vs TTS — sem ele cacheado, offline o app
            // "esquece" que tem áudio premium mesmo com os mp3 no cache.
            urlPattern: /\/audio\/index\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'audio-index',
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // samples/ = amostras da página /vozes. rangeRequests: o Safari do iOS
            // pede áudio com Range (206) — o plugin fatia o 200 cacheado; sem ele,
            // request com Range contra o cache falha.
            urlPattern: /\/(?:audio|samples)\/[^?]+\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-clips',
              expiration: { maxEntries: 6000, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
              rangeRequests: true
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
