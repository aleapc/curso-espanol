<script lang="ts">
  import { base } from '$app/paths';

  const vozes = [
    { key: 'voz-leticia', name: 'Letícia', nota: 'a atual (você achou meio carioca/artificial)' },
    { key: 'voz-dani', name: 'Dani', nota: 'calorosa' },
    { key: 'voz-elena', name: 'Elena Vinter', nota: 'sofisticada, sóbria' },
    { key: 'voz-bia', name: 'Bia', nota: 'expressiva, clara' },
    { key: 'voz-nina', name: 'Nina M.', nota: 'jovem, confiante' },
    { key: 'voz-mariana', name: 'Mariana M.', nota: 'calma' }
  ];

  let tocando = $state('');
  let audio: HTMLAudioElement;

  function tocar(key: string) {
    audio.src = `${base}/samples/${key}.mp3`;
    audio.play();
    tocando = key;
  }
</script>

<audio bind:this={audio} onended={() => (tocando = '')}></audio>

<a href="{base}/" class="text-sm text-oceano">← voltar</a>

<header class="mt-2">
  <h1 class="text-2xl font-extrabold leading-tight">Escolha a voz da professora 🎙️</h1>
  <p class="mt-1 text-carvao/70">
    Todas dizem a mesma frase em português. Escolha a que soar mais <strong>natural e neutra</strong>
    pra você — menos "carioca", mais paulista/neutro.
  </p>
</header>

<div class="mt-5 space-y-2">
  {#each vozes as v}
    <button
      type="button"
      onclick={() => tocar(v.key)}
      class="card flex w-full items-center justify-between p-4 text-left transition hover:ring-oceano/30
        {tocando === v.key ? 'ring-2 ring-terracota' : ''}"
    >
      <span>
        <span class="font-semibold">{v.name}</span>
        <span class="block text-sm text-carvao/55">{v.nota}</span>
      </span>
      <span class="text-2xl">{tocando === v.key ? '🔊' : '▶'}</span>
    </button>
  {/each}
</div>

<p class="mt-6 text-sm text-carvao/50">
  Achou a sua? Me diga o nome. Posso também trazer mais opções ou auditar as vozes masculinas.
</p>
