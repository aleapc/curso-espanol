<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { dev } from '$app/environment';
  import { base } from '$app/paths';
  import { PROFILES, store, setProfile } from '$lib/state.svelte';

  let { children } = $props();

  // Registro MANUAL do service worker (o injectRegister automático não injeta
  // nada em HTML prerenderizado — sem isto o app nunca teve SW em produção).
  // Registro direto com URL absoluta do base: o virtual:pwa-register compila
  // "./sw.js" (relativo à PÁGINA), que quebraria em deep-link de episódio.
  // Com registerType autoUpdate o sw.js já tem skipWaiting+clientsClaim, então
  // register puro + update() horário dá o autoUpdate completo.
  onMount(async () => {
    if (dev || !('serviceWorker' in navigator)) return;
    // Sem base (= vite preview local em localhost:4173/5182, origem COMPARTILHADA
    // com os outros PWAs do casal): só registra com ?sw na URL, senão o precache
    // do Hablá "sequestra" o / dos outros projetos em preview.
    if (!base && !new URLSearchParams(location.search).has('sw')) return;
    try {
      const reg = await navigator.serviceWorker.register(`${base}/sw.js`, { scope: `${base}/` });
      // iOS só checa update no launch; com o app aberto horas (estudo/carro),
      // checa a cada hora pra nova versão chegar sem depender de reabrir 2x.
      setInterval(() => void reg.update().catch(() => {}), 60 * 60 * 1000);
    } catch {
      /* sem SW (navegador antigo / registro falhou) — app segue online */
    }
  });
</script>

<div class="mx-auto flex min-h-dvh max-w-xl flex-col">
  <header
    class="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-black/5 bg-creme/90 px-4 py-3 backdrop-blur"
  >
    <a href="{base}/" class="flex items-baseline gap-1.5">
      <span class="text-lg font-extrabold text-terracota">Hablá</span>
      <span class="hidden text-xs font-medium text-carvao/50 sm:inline">· Español rioplatense</span>
    </a>
    <div class="flex gap-1">
      {#each PROFILES as p}
        <button
          type="button"
          onclick={() => setProfile(p.id)}
          aria-pressed={store.current === p.id}
          class="pill {store.current === p.id
            ? 'bg-terracota text-white'
            : 'bg-white text-carvao/70 ring-1 ring-black/10'}"
        >
          {p.emoji} {p.nome.split(' ')[0]}
        </button>
      {/each}
    </div>
  </header>

  <main class="flex-1 px-4 pb-20 pt-3">
    {@render children()}
  </main>
</div>
