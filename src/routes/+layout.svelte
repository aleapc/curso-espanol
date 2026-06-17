<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
  import { PROFILES, store, setProfile } from '$lib/state.svelte';

  let { children } = $props();
</script>

<div class="mx-auto flex min-h-dvh max-w-xl flex-col">
  <header
    class="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-black/5 bg-creme/90 px-4 py-3 backdrop-blur"
  >
    <a href="{base}/" class="flex items-center gap-2 font-bold text-terracota">
      <span class="text-xl">🌎</span> Curso de Español
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
