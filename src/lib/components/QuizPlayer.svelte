<script lang="ts">
  import { base } from '$app/paths';
  import type { Quiz } from '$lib/types';
  import { markDone } from '$lib/state.svelte';

  let { quiz }: { quiz: Quiz } = $props();

  let audio: HTMLAudioElement;
  let tocando = $state(false);
  let idxFala = $state(-1); // -1 = intro; 0..n = linha do diálogo
  let token = 0;

  let mostrarTranscricao = $state(false);
  let respostas = $state<(number | null)[]>(quiz.perguntas.map(() => null));
  let corrigido = $state(false);

  const acertos = $derived(
    quiz.perguntas.reduce((n, p, i) => n + (respostas[i] === p.correta ? 1 : 0), 0)
  );

  function src(key: string) {
    return `${base}/audio/${key}.mp3`;
  }

  function playClip(key: string): Promise<void> {
    return new Promise((resolve) => {
      if (!key || !audio) return resolve();
      audio.onended = () => {
        audio.onended = null;
        resolve();
      };
      audio.src = src(key);
      audio.play().catch(() => resolve());
    });
  }

  async function escutar() {
    if (tocando) {
      parar();
      return;
    }
    const meu = ++token;
    tocando = true;
    idxFala = -1;
    await playClip(quiz.introAudioKey);
    for (let i = 0; i < quiz.dialogo.length; i++) {
      if (meu !== token) return;
      idxFala = i;
      await playClip(quiz.dialogo[i].audioKey);
      if (meu !== token) return;
      await new Promise((r) => setTimeout(r, 250));
    }
    if (meu === token) {
      tocando = false;
      idxFala = -1;
    }
  }

  function parar() {
    token++;
    tocando = false;
    idxFala = -1;
    if (audio) {
      audio.onended = null;
      audio.pause();
    }
  }

  function responder(qi: number, oi: number) {
    if (corrigido) return;
    respostas[qi] = oi;
  }

  function corrigir() {
    parar();
    corrigido = true;
    markDone(quiz.id);
    // rola pro topo do resultado
    if (typeof document !== 'undefined') {
      document.getElementById('quiz-resultado')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function refazer() {
    respostas = quiz.perguntas.map(() => null);
    corrigido = false;
  }

  const tudoRespondido = $derived(respostas.every((r) => r !== null));
</script>

<audio bind:this={audio} preload="none"></audio>

<!-- Cenário -->
<div class="card p-4">
  <p class="text-sm text-carvao/70">🎬 {quiz.cenario}</p>
  <div class="mt-3 flex flex-wrap items-center gap-2">
    <button type="button" class="btn-primary" onclick={escutar}>
      {tocando ? '⏸ Pausar' : '▶ Escutar a conversa'}
    </button>
    <button
      type="button"
      class="btn bg-white ring-1 ring-black/10"
      onclick={() => (mostrarTranscricao = !mostrarTranscricao)}
    >
      {mostrarTranscricao ? 'Esconder transcrição' : 'Ver transcrição'}
    </button>
  </div>

  {#if mostrarTranscricao}
    <div class="mt-3 space-y-2 border-t border-black/5 pt-3">
      {#each quiz.dialogo as d, i}
        <div class="rounded-xl p-2 {idxFala === i ? 'bg-sol/20' : ''}">
          <p class="text-sm font-medium">{d.es}</p>
          {#if corrigido}<p class="text-xs text-carvao/50">{d.pt}</p>{/if}
        </div>
      {/each}
    </div>
  {:else if tocando && idxFala >= 0}
    <p class="mt-3 text-center text-sm text-carvao/50">🔊 Reproduzindo… ({idxFala + 1}/{quiz.dialogo.length})</p>
  {/if}
</div>

<!-- Perguntas -->
<div class="mt-5 space-y-4">
  {#each quiz.perguntas as p, qi}
    <div class="card p-4">
      <p class="font-semibold">{qi + 1}. {p.es}</p>
      {#if corrigido && p.pt}<p class="mt-0.5 text-xs text-carvao/50">{p.pt}</p>{/if}
      <div class="mt-3 space-y-2">
        {#each p.opcoes as opcao, oi}
          {@const escolhida = respostas[qi] === oi}
          {@const certa = oi === p.correta}
          <button
            type="button"
            disabled={corrigido}
            onclick={() => responder(qi, oi)}
            class="flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition
              {corrigido && certa ? 'border-salvia bg-salvia/15 font-medium' : ''}
              {corrigido && escolhida && !certa ? 'border-terracota bg-terracota/10' : ''}
              {!corrigido && escolhida ? 'border-oceano bg-oceano/10' : 'border-black/10'}"
          >
            <span
              class="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold
                {!corrigido && escolhida ? 'bg-oceano text-white' : 'bg-black/5 text-carvao/60'}
                {corrigido && certa ? 'bg-salvia text-white' : ''}
                {corrigido && escolhida && !certa ? 'bg-terracota text-white' : ''}"
            >
              {String.fromCharCode(65 + oi)}
            </span>
            <span class="flex-1">{opcao}</span>
            {#if corrigido && certa}<span>✅</span>{/if}
            {#if corrigido && escolhida && !certa}<span>❌</span>{/if}
          </button>
        {/each}
      </div>
    </div>
  {/each}
</div>

<!-- Ação / resultado -->
<div id="quiz-resultado" class="mt-5">
  {#if !corrigido}
    <button
      type="button"
      class="btn-primary w-full disabled:opacity-40"
      disabled={!tudoRespondido}
      onclick={corrigir}
    >
      {tudoRespondido ? 'Corrigir' : `Responda todas (${respostas.filter((r) => r !== null).length}/${quiz.perguntas.length})`}
    </button>
  {:else}
    <div class="card p-5 text-center">
      <p class="text-4xl font-extrabold text-terracota">{acertos}/{quiz.perguntas.length}</p>
      <p class="mt-1 text-carvao/70">
        {acertos === quiz.perguntas.length
          ? '¡Perfecto! Você entendeu tudo. 🎉'
          : acertos >= quiz.perguntas.length - 2
            ? '¡Muy bien! Quase lá. 👏'
            : 'Bom começo — escute de novo e tente outra vez. 💪'}
      </p>
      <div class="mt-4 flex justify-center gap-2">
        <button type="button" class="btn bg-white ring-1 ring-black/10" onclick={refazer}>Refazer</button>
        <button type="button" class="btn-primary" onclick={escutar}>Escutar de novo</button>
      </div>
    </div>
  {/if}
</div>
