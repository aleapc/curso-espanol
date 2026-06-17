<script lang="ts">
  import { base } from '$app/paths';
  import { onMount } from 'svelte';
  import type { Episode, Step } from '$lib/types';
  import { markDone } from '$lib/state.svelte';

  let { episodio }: { episodio: Episode } = $props();
  const steps = episodio.steps;
  const total = steps.length;

  type Fase = 'parado' | 'tocando' | 'pausa' | 'aguardando' | 'fim';

  let index = $state(0);
  let fase = $state<Fase>('parado');
  let mostrarEs = $state(false);
  let gravando = $state(false);
  let recUrl = $state<string | null>(null);

  // Modo: estudo (controle passo a passo) ou carro (áudio-livro contínuo, mãos livres)
  let modo = $state<'estudo' | 'carro'>(
    typeof localStorage !== 'undefined' && localStorage.getItem('ce-modo') === 'carro'
      ? 'carro'
      : 'estudo'
  );
  function setModo(m: 'estudo' | 'carro') {
    modo = m;
    if (typeof localStorage !== 'undefined') localStorage.setItem('ce-modo', m);
  }

  // Velocidade da pausa pra responder (persistida)
  const velocidades = [
    { nome: 'curta', f: 0.7 },
    { nome: 'média', f: 1 },
    { nome: 'longa', f: 1.5 }
  ];
  let fator = $state(
    typeof localStorage !== 'undefined' ? Number(localStorage.getItem('ce-pausa')) || 1 : 1
  );
  function setFator(f: number) {
    fator = f;
    if (typeof localStorage !== 'undefined') localStorage.setItem('ce-pausa', String(f));
  }

  const step = $derived(steps[index]);
  const ehPt = $derived(step?.tipo === 'intro' || step?.tipo === 'recap');

  let audio: HTMLAudioElement;
  let token = 0;
  let cancelCurrent: (() => void) | null = null;

  function src(key?: string) {
    return `${base}/audio/${key}.mp3`;
  }

  function playClip(key?: string): Promise<void> {
    return new Promise((resolve) => {
      if (!key || !audio) return resolve();
      cancelCurrent = () => {
        audio.onended = null;
        audio.pause();
        resolve();
      };
      audio.onended = () => {
        audio.onended = null;
        resolve();
      };
      audio.src = src(key);
      audio.play().catch(() => resolve());
    });
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const t = setTimeout(resolve, ms);
      cancelCurrent = () => {
        clearTimeout(t);
        resolve();
      };
    });
  }

  function halt() {
    token++;
    const c = cancelCurrent;
    cancelCurrent = null;
    if (c) c();
    void stopRec();
  }

  function pausaMs(s: Step) {
    const txt = s.es || '';
    return Math.max(2600, txt.length * 130 + 1400) * fator;
  }

  function setPlaybackState(s: 'playing' | 'paused' | 'none') {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      navigator.mediaSession.playbackState = s;
    }
  }

  async function run(from: number) {
    halt();
    const my = token;
    setPlaybackState('playing');
    for (let i = from; i < steps.length; i++) {
      if (my !== token) return;
      index = i;
      const s = steps[i];
      mostrarEs = false;

      if (s.tipo === 'responde') {
        fase = 'tocando';
        await playClip(s.promptAudioKey);
        if (my !== token) return;
        fase = 'pausa';
        recUrl = null;
        if (gravando) await startRec();
        await wait(pausaMs(s));
        if (my !== token) return;
        if (gravando) await stopRec();
        if (modo === 'carro') {
          mostrarEs = true;
          fase = 'tocando';
          await playClip(s.audioKey);
        } else {
          // modo estudo: espera o usuário (ouvir resposta / próximo)
          fase = 'aguardando';
          setPlaybackState('paused');
          return;
        }
      } else if (s.tipo === 'shadow') {
        fase = 'tocando';
        await playClip(s.audioKey);
        if (my !== token) return;
        fase = 'pausa';
        await wait(pausaMs(s));
      } else {
        if (s.tipo === 'ouvir') mostrarEs = true;
        fase = 'tocando';
        await playClip(s.audioKey);
      }

      if (my !== token) return;
      await wait(350);
      if (my !== token) return;
    }
    fase = 'fim';
    setPlaybackState('none');
    markDone(episodio.id);
  }

  // Modo estudo: tocar a resposta nativa sob demanda, sem avançar.
  async function ouvirResposta() {
    halt();
    const my = token;
    mostrarEs = true;
    fase = 'tocando';
    setPlaybackState('playing');
    await playClip(steps[index].audioKey);
    if (my !== token) return;
    fase = 'aguardando';
    setPlaybackState('paused');
  }

  function comecar() {
    run(index);
  }
  function pausar() {
    halt();
    fase = 'parado';
    setPlaybackState('paused');
  }
  function repetir() {
    run(index);
  }
  function proximo() {
    if (index < total - 1) run(index + 1);
    else {
      fase = 'fim';
      markDone(episodio.id);
    }
  }
  function anterior() {
    run(Math.max(0, index - 1));
  }
  function reiniciar() {
    run(0);
  }

  // Botão central depende da fase
  function botaoCentral() {
    if (fase === 'tocando' || fase === 'pausa') pausar();
    else if (fase === 'aguardando') ouvirResposta();
    else if (fase === 'fim') reiniciar();
    else comecar();
  }

  // --- gravação opcional (comparar a sua voz) ---
  let mediaStream: MediaStream | null = null;
  let recorder: MediaRecorder | null = null;
  let chunks: BlobPart[] = [];

  async function startRec() {
    try {
      if (!mediaStream) mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = [];
      recorder = new MediaRecorder(mediaStream);
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.start();
    } catch {
      gravando = false;
    }
  }
  function stopRec(): Promise<void> {
    return new Promise((resolve) => {
      if (!recorder || recorder.state === 'inactive') return resolve();
      recorder.onstop = () => {
        recUrl = URL.createObjectURL(new Blob(chunks, { type: 'audio/webm' }));
        resolve();
      };
      recorder.stop();
    });
  }
  function ouvirVoce() {
    if (recUrl) new Audio(recUrl).play();
  }

  const vozNome: Record<string, string> = {
    Bia: 'Bia',
    Eduardo: 'Eduardo',
    Ana: 'Ana',
    Diego: 'Diego'
  };
  const acao: Record<string, string> = {
    ouvir: 'Escute',
    responde: 'Sua vez',
    shadow: 'Repita junto'
  };
  function badge(s?: Step): string {
    if (!s) return '';
    if (s.tipo === 'intro' || s.tipo === 'recap') return vozNome[s.voz ?? ''] ?? 'Professor(a)';
    return acao[s.tipo] ?? '';
  }

  onMount(() => {
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: `${episodio.titulo} (Ep. ${episodio.numero}${episodio.parte ? ' · ' + episodio.parte : ''})`,
          artist: 'Curso de Español',
          album: 'Curso de Español'
        });
        navigator.mediaSession.setActionHandler('play', () => botaoCentral());
        navigator.mediaSession.setActionHandler('pause', () => pausar());
        navigator.mediaSession.setActionHandler('nexttrack', () => proximo());
        navigator.mediaSession.setActionHandler('previoustrack', () => anterior());
      } catch {
        /* MediaSession parcial em alguns navegadores */
      }
    }
  });
</script>

<audio bind:this={audio}></audio>

<!-- Seletor de modo -->
<div class="mb-3 flex items-center justify-center gap-1 rounded-full bg-black/5 p-1 text-sm">
  <button
    type="button"
    onclick={() => setModo('estudo')}
    class="flex-1 rounded-full px-3 py-1.5 font-medium transition {modo === 'estudo'
      ? 'bg-white shadow text-terracota'
      : 'text-carvao/60'}"
  >
    📚 Estudo
  </button>
  <button
    type="button"
    onclick={() => setModo('carro')}
    class="flex-1 rounded-full px-3 py-1.5 font-medium transition {modo === 'carro'
      ? 'bg-white shadow text-terracota'
      : 'text-carvao/60'}"
  >
    🚗 Carro
  </button>
</div>

<div class="flex items-center justify-between text-sm">
  <span class="font-semibold text-oceano">
    Episódio {episodio.numero}{episodio.parte ? ` · ${episodio.parte}` : ''}
  </span>
  <span class="text-carvao/50">{index + 1} / {total}</span>
</div>
<div class="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
  <div class="h-full bg-terracota transition-all" style="width: {((index + 1) / total) * 100}%"></div>
</div>

<!-- Palco do passo atual -->
<div class="card mt-4 flex min-h-[220px] flex-col items-center justify-center gap-3 p-5 text-center">
  <span
    class="pill {step?.tipo === 'responde' || step?.tipo === 'shadow'
      ? 'bg-terracota/15 text-terracota'
      : ehPt
        ? 'bg-sol/30 text-carvao/70'
        : 'bg-oceano/15 text-oceano'}"
  >
    {badge(step)}
  </span>

  {#if fase === 'pausa' && step?.tipo === 'responde'}
    <p class="text-lg font-medium text-carvao/80">{step.promptPt}</p>
    <p class="text-2xl font-extrabold text-terracota">🎤 Fale agora!</p>
    {#key index}
      <div class="h-2 w-40 overflow-hidden rounded-full bg-black/10">
        <div class="barra h-full bg-terracota" style="animation-duration: {pausaMs(step)}ms"></div>
      </div>
    {/key}
  {:else if fase === 'aguardando' && step?.tipo === 'responde'}
    <p class="text-lg font-medium text-carvao/80">{step.promptPt}</p>
    {#if mostrarEs}
      <p class="text-2xl font-extrabold">{step.es}</p>
      <p class="text-carvao/55">{step.pt}</p>
    {:else}
      <p class="text-sm text-carvao/50">Falou? Ouça o nativo ou siga quando quiser.</p>
    {/if}
    {#if recUrl}
      <button class="btn bg-oceano text-white text-sm" onclick={ouvirVoce}>▶ ouvir você</button>
    {/if}
  {:else if fase === 'pausa' && step?.tipo === 'shadow'}
    <p class="text-2xl font-extrabold text-terracota">🗣️ Repita junto!</p>
    <p class="text-sm text-carvao/50">tente sem ler</p>
  {:else if ehPt}
    <p class="text-lg leading-relaxed text-carvao/90">{step?.pt}</p>
  {:else}
    {#if mostrarEs}
      <p class="text-2xl font-extrabold">{step?.es}</p>
    {:else}
      <p class="text-2xl font-extrabold tracking-widest text-carvao/30">· · ·</p>
    {/if}
    <p class="text-carvao/55">{step?.pt}</p>
  {/if}

  {#if !ehPt && !mostrarEs && fase !== 'pausa'}
    <button class="text-xs text-oceano underline" onclick={() => (mostrarEs = true)}>ver texto</button>
  {/if}
</div>

<!-- Controles -->
<div class="mt-4 flex items-center justify-center gap-3">
  <button
    class="btn bg-white text-lg ring-1 ring-black/10"
    onclick={anterior}
    aria-label="Passo anterior">⏮</button
  >

  {#if fase === 'aguardando'}
    <button class="btn-primary px-6 py-3" onclick={ouvirResposta}>▶ ouvir resposta</button>
    <button class="btn bg-salvia px-6 py-3 text-white" onclick={proximo}>⏭ próximo</button>
  {:else}
    <button class="btn-primary px-8 py-3 text-lg" onclick={botaoCentral}>
      {#if fase === 'parado'}{index === 0 ? '▶ Começar' : '▶ Continuar'}
      {:else if fase === 'fim'}↺ De novo
      {:else}⏸ Pausar{/if}
    </button>
  {/if}

  <button
    class="btn bg-white text-lg ring-1 ring-black/10"
    onclick={proximo}
    aria-label="Próximo passo">⏭</button
  >
</div>

<div class="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm">
  <button class="text-oceano" onclick={repetir}>⟲ repetir passo</button>
  <label class="flex cursor-pointer items-center gap-1 text-carvao/60">
    <input type="checkbox" bind:checked={gravando} />
    🎙️ gravar minha voz
  </label>
</div>

<div class="mt-2 flex items-center justify-center gap-2 text-xs text-carvao/50">
  <span>Pausa pra falar:</span>
  {#each velocidades as v}
    <button
      type="button"
      onclick={() => setFator(v.f)}
      class="rounded-full px-2 py-0.5 {fator === v.f ? 'bg-oceano text-white' : 'ring-1 ring-black/10'}"
    >
      {v.nome}
    </button>
  {/each}
</div>

{#if modo === 'carro'}
  <p class="mt-3 text-center text-xs text-carvao/45">
    🚗 Modo Carro: toca tudo sozinho. Use os botões do volante / tela bloqueada pra play, pausa e
    pular.
  </p>
{/if}

{#if fase === 'fim'}
  <p class="mt-5 text-center text-lg font-semibold text-salvia">✅ Parte concluída!</p>
{/if}

<style>
  @keyframes encolher {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
  .barra {
    animation-name: encolher;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
</style>
