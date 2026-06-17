<script lang="ts">
  import { base } from '$app/paths';
  import AudioButton from '$lib/components/AudioButton.svelte';
  import Exercicios from '$lib/components/Exercicios.svelte';
  import { markDone, isDone, store } from '$lib/state.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const licao = data.licao;

  const concluida = $derived(isDone(licao.id, store.current));
</script>

<a href="{base}/" class="text-sm text-oceano">← voltar</a>

<header class="mt-2">
  <p class="text-xs font-semibold uppercase tracking-wide text-terracota">Básico · {licao.id}</p>
  <h1 class="text-2xl font-extrabold leading-tight">{licao.titulo}</h1>
  <p class="text-carvao/70">{licao.subtitulo}</p>
</header>

<!-- Objetivos -->
<section class="card mt-4 p-4">
  <h2 class="mb-2 font-bold">🎯 Você vai conseguir</h2>
  <ul class="list-inside list-disc space-y-1 text-sm text-carvao/80">
    {#each licao.objetivos as o}<li>{o}</li>{/each}
  </ul>
</section>

<!-- Vocabulário -->
<section class="mt-6">
  <h2 class="mb-3 text-lg font-bold">📖 Vocabulário</h2>
  <p class="mb-2 text-xs text-carvao/50">Toque no 🔊 pra ouvir (voz do navegador, grátis).</p>
  <div class="grid gap-2 sm:grid-cols-2">
    {#each licao.vocab as v}
      <div class="card flex items-center justify-between gap-2 p-3">
        <div>
          <div class="font-semibold">{v.es}</div>
          <div class="text-sm text-carvao/60">{v.pt}</div>
        </div>
        <AudioButton text={v.es} size="sm" />
      </div>
    {/each}
  </div>
</section>

<!-- Gramática -->
<section class="mt-6">
  <h2 class="mb-3 text-lg font-bold">🧩 Gramática</h2>
  <div class="space-y-3">
    {#each licao.gramatica as g}
      <div class="card p-4">
        <h3 class="font-bold text-oceano">{g.titulo}</h3>
        <p class="mt-1 text-sm text-carvao/80">{g.explicacao}</p>
        <div class="mt-3 space-y-1">
          {#each g.exemplos as ex}
            <div class="flex items-baseline gap-2 text-sm">
              <span class="font-medium">{ex.es}</span>
              <span class="text-carvao/50">— {ex.pt}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Diálogo -->
<section class="mt-6">
  <h2 class="mb-1 text-lg font-bold">💬 Diálogo — {licao.dialogo.titulo}</h2>
  <p class="mb-3 text-xs text-carvao/50">
    🔊 toca o áudio premium (ElevenLabs) quando gerado; senão, a voz do navegador.
  </p>
  <div class="space-y-2">
    {#each licao.dialogo.linhas as linha}
      <div class="card flex items-start gap-3 p-3">
        <span
          class="pill shrink-0 {linha.speaker === 'Ana'
            ? 'bg-terracota/15 text-terracota'
            : 'bg-oceano/15 text-oceano'}">{linha.speaker}</span
        >
        <div class="flex-1">
          <div class="font-medium">{linha.es}</div>
          <div class="text-sm text-carvao/55">{linha.pt}</div>
        </div>
        <AudioButton audioKey={linha.audioKey} text={linha.es} size="sm" />
      </div>
    {/each}
  </div>
</section>

<!-- Frases-chave -->
<section class="mt-6">
  <h2 class="mb-3 text-lg font-bold">⭐ Frases que você leva pra vida</h2>
  <div class="space-y-2">
    {#each licao.frasesChave as f}
      <div class="card flex items-center justify-between gap-2 p-3">
        <div>
          <div class="font-semibold">{f.es}</div>
          <div class="text-sm text-carvao/60">{f.pt}</div>
        </div>
        <AudioButton audioKey={f.audioKey} text={f.es} />
      </div>
    {/each}
  </div>
</section>

<!-- Falsos amigos -->
<section class="mt-6">
  <h2 class="mb-1 text-lg font-bold">⚠️ Falsos amigos (a pegadinha do brasileiro)</h2>
  <p class="mb-3 text-sm text-carvao/60">Palavras que parecem português mas te traem.</p>
  <div class="space-y-2">
    {#each licao.falsosAmigos as fa}
      <div class="card border-l-4 border-terracota p-3">
        <div class="flex items-center gap-2">
          <span class="font-bold text-terracota">{fa.es}</span>
          <span class="text-xs text-carvao/50">≠ {fa.pareceQue}</span>
        </div>
        <div class="text-sm">significa <strong>{fa.significa}</strong></div>
        {#if fa.exemplo}<div class="mt-1 text-xs text-carvao/55">{fa.exemplo}</div>{/if}
      </div>
    {/each}
  </div>
</section>

<!-- Exercícios -->
<section class="mt-6">
  <h2 class="mb-3 text-lg font-bold">✍️ Exercícios</h2>
  <Exercicios exercicios={licao.exercicios} />
</section>

<!-- Concluir -->
<section class="mt-8 text-center">
  {#if concluida}
    <p class="font-semibold text-salvia">✅ Lição concluída por {store.current === 'ale' ? 'Alexandre' : 'Andréia'}!</p>
    <a href="{base}/" class="mt-2 inline-block text-oceano">Voltar ao curso</a>
  {:else}
    <button type="button" class="btn-primary px-8 py-3 text-lg" onclick={() => markDone(licao.id)}>
      Concluir lição ✔
    </button>
  {/if}
</section>
