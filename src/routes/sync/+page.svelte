<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { importSync } from '$lib/sync';

  let estado = $state<'lendo' | 'ok' | 'erro'>('lendo');
  let detalhe = $state('');

  onMount(() => {
    const hash = window.location.hash;
    const m = hash.match(/s=(CE1\.[A-Za-z0-9_-]+)/);
    if (!m) {
      estado = 'erro';
      detalhe = 'Link sem código. Peça pra gerar de novo.';
      return;
    }
    const r = importSync(m[1]);
    if (r) {
      estado = 'ok';
      detalhe = `Juntei +${r.ale} do Alê e +${r.dea} da Andréia. 🎉`;
    } else {
      estado = 'erro';
      detalhe = 'Código inválido.';
    }
  });
</script>

<div class="mt-10 text-center">
  {#if estado === 'lendo'}
    <p>Sincronizando…</p>
  {:else if estado === 'ok'}
    <h1 class="text-2xl font-extrabold text-salvia">Pronto! ✅</h1>
    <p class="mt-2 text-carvao/70">{detalhe}</p>
  {:else}
    <h1 class="text-2xl font-extrabold text-terracota">Hmm… 🤔</h1>
    <p class="mt-2 text-carvao/70">{detalhe}</p>
  {/if}
  <a href="{base}/" class="btn-primary mt-6 inline-block">Ir pro curso</a>
</div>
