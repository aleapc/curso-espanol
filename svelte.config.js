import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    paths: {
      relative: false,
      base: process.env.BASE_PATH ?? ''
    },
    prerender: {
      // As "fotos" dos cards (static/img/<id>.jpg) são opcionais — geradas depois
      // pelo usuário. Sem elas o card cai no emoji (onerror no runtime). Não deixar
      // o prerender quebrar por causa desses 404.
      handleHttpError: ({ path, message }) => {
        if (path.includes('/img/')) return;
        throw new Error(message);
      }
    }
  }
};

export default config;
