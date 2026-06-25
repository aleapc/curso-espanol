<script lang="ts">
  import { base } from '$app/paths';
  import { niveis } from '$lib/course';
  import { examDoNivel, quizDoEpisodio } from '$lib/course/quizzes';
  import { store, isDone, PROFILES } from '$lib/state.svelte';
  import { encodeSync, importSync, whatsappUrl } from '$lib/sync';

  const perfil = $derived(PROFILES.find((p) => p.id === store.current)!);

  // Episódio aberto (mostra as partes embaixo da fileira)
  let aberto = $state<string | null>(null);

  // Sync de casal
  let codigo = $state('');
  let cola = $state('');
  let msg = $state('');
  function gerar() {
    codigo = encodeSync();
  }
  function importar() {
    const r = importSync(cola);
    msg = r
      ? `Importado: +${r.ale} do Alê, +${r.dea} da Andréia. 🎉`
      : 'Código inválido — confira se copiou inteiro (começa com CE1.).';
  }

  const dotBg: Record<string, string> = {
    salvia: 'bg-salvia',
    oceano: 'bg-oceano',
    terracota: 'bg-terracota'
  };
  const softBg: Record<string, string> = {
    salvia: 'bg-salvia/15',
    oceano: 'bg-oceano/15',
    terracota: 'bg-terracota/15'
  };
  const textCor: Record<string, string> = {
    salvia: 'text-salvia',
    oceano: 'text-oceano',
    terracota: 'text-terracota'
  };
  const ringCor: Record<string, string> = {
    salvia: 'ring-2 ring-salvia',
    oceano: 'ring-2 ring-oceano',
    terracota: 'ring-2 ring-terracota'
  };
  // Degradê de fundo do card (atrás da imagem/emoji), por nível — vibe dos guias
  const grad: Record<string, string> = {
    salvia: 'linear-gradient(155deg, #8FB89B, #5E8870)',
    oceano: 'linear-gradient(155deg, #3E8DA0, #244F5C)',
    terracota: 'linear-gradient(155deg, #E0915A, #B23A22)'
  };

  const feitasDe = (ep: { partes: { id: string }[] }) =>
    ep.partes.filter((p) => isDone(p.id)).length;
</script>

<section class="mt-2">
  <h1 class="text-2xl font-extrabold leading-tight">
    ¡Hola, {perfil.nome.split(' ')[0]}! 👋
  </h1>
  <p class="mt-1 text-carvao/70">
    Áudio-curso de espanhol rioplatense — ouça, fale e aprenda. Pouca leitura, muita conversa.
  </p>
</section>

<a
  href="https://translate.google.com/?sl=pt&tl=es&op=translate"
  target="_blank"
  rel="noopener"
  class="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-md ring-1 ring-black/5"
>
  <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-terracota/15 text-2xl">🗣️</span>
  <span class="min-w-0 flex-1">
    <span class="block font-bold leading-tight text-carvao">Tradutor de conversa</span>
    <span class="block text-xs text-carvao/60"
      >Abre o Google Tradutor (PT ↔ ES). Toque no “Conversa” pra traduzir os dois lados.</span
    >
  </span>
  <span class="shrink-0 text-lg text-carvao/30">↗</span>
</a>
<p class="mt-1 px-1 text-[11px] text-carvao/45">
  💡 Offline: instale o app Google Tradutor e baixe os pacotes Português e Espanhol.
</p>

{#each niveis as nivel}
  {@const feitas = nivel.episodios.reduce((n, e) => n + feitasDe(e), 0)}
  {@const totalP = nivel.episodios.reduce((n, e) => n + e.partes.length, 0)}
  <section class="mt-7">
    <div class="mb-1 flex items-center gap-2">
      <span class="h-3 w-3 rounded-full {dotBg[nivel.cor]}"></span>
      <h2 class="text-lg font-bold">{nivel.nome}</h2>
      <span class="text-xs text-carvao/50">{feitas}/{totalP} partes</span>
    </div>
    <p class="mb-3 text-sm text-carvao/60">{nivel.descricao}</p>

    <!-- fileira rolável de episódios -->
    <div class="row -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2">
      {#each nivel.episodios as ep, i}
        {@const f = feitasDe(ep)}
        <button
          type="button"
          onclick={() => (aberto = aberto === ep.id ? null : ep.id)}
          class="w-44 shrink-0 snap-start overflow-hidden rounded-2xl bg-white text-left shadow-md transition
            {aberto === ep.id ? ringCor[nivel.cor] : 'ring-1 ring-black/5'}"
        >
          <!-- imagem-herói (foto se houver; senão emoji grande sobre degradê) -->
          <div class="relative h-28" style="background: {grad[nivel.cor]}">
            <div class="absolute inset-0 grid place-items-center text-5xl opacity-90">{ep.emoji}</div>
            <img
              src="{base}/img/{ep.id}.jpg"
              alt=""
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover"
              onerror={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>
            <div class="absolute inset-x-2.5 bottom-2 text-white">
              <div class="text-[10px] font-bold uppercase tracking-wide opacity-90">
                Episódio {i + 1}
              </div>
              <div class="line-clamp-2 text-sm font-bold leading-snug drop-shadow">{ep.nome}</div>
            </div>
            {#if f === ep.partes.length}
              <span class="absolute right-1.5 top-1.5 rounded-full bg-white/90 px-1.5 text-xs">✅</span>
            {/if}
          </div>
          <!-- progresso das partes -->
          <div class="flex gap-1 px-2.5 py-2">
            {#each ep.partes as p}
              <span
                class="h-1.5 flex-1 rounded-full {isDone(p.id) ? dotBg[nivel.cor] : 'bg-black/10'}"
              ></span>
            {/each}
          </div>
        </button>
      {/each}
    </div>

    <!-- partes do episódio aberto (se for deste nível) -->
    {#each nivel.episodios as ep}
      {#if aberto === ep.id}
        <div class="card mt-1 p-3">
          <div class="mb-2 flex items-center gap-2">
            <span class="text-2xl">{ep.emoji}</span>
            <span class="font-bold">{ep.nome}</span>
            <button
              type="button"
              class="ml-auto text-sm text-carvao/40"
              onclick={() => (aberto = null)}
              aria-label="Fechar">✕</button
            >
          </div>
          <div class="space-y-1.5">
            {#each ep.partes as p}
              <a
                href="{base}/episodio/{p.id}/"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-black/5"
              >
                <span
                  class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold text-white {dotBg[
                    nivel.cor
                  ]}">{p.letra}</span
                >
                <span class="flex-1 text-sm font-medium">{p.titulo}</span>
                <span class="text-sm">{isDone(p.id) ? '✅' : '▶'}</span>
              </a>
            {/each}
            <!-- Quiz do episódio -->
            {#if quizDoEpisodio[ep.id]}
              <a
                href="{base}/quiz/{quizDoEpisodio[ep.id]}/"
                class="flex items-center gap-3 rounded-xl border border-dashed border-black/15 px-3 py-2.5 transition hover:bg-black/5"
              >
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs {softBg[nivel.cor]}">🎧</span>
                <span class="flex-1 text-sm font-medium">Quiz do episódio</span>
                <span class="text-sm">{isDone(quizDoEpisodio[ep.id]) ? '✅' : '▶'}</span>
              </a>
            {/if}
          </div>
        </div>
      {/if}
    {/each}

    <!-- Prova do nível (áudio + teste mais longo) -->
    {#if examDoNivel[nivel.nivel]}
      <a
        href="{base}/quiz/{examDoNivel[nivel.nivel]}/"
        class="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-white shadow-sm transition hover:brightness-105"
        style="background: {grad[nivel.cor]}"
      >
        <span class="text-xl">🎬</span>
        <span class="flex-1">
          <span class="block text-sm font-bold">Prova do {nivel.nome}</span>
          <span class="block text-xs opacity-90">Áudio mais longo + teste de interpretação</span>
        </span>
        <span class="text-sm">{isDone(examDoNivel[nivel.nivel]) ? '✅' : '▶'}</span>
      </a>
    {/if}
  </section>
{/each}

<!-- Sincronizar com o casal -->
<section class="mt-8">
  <div class="card p-4">
    <h2 class="mb-1 font-bold">💞 Sincronizar com o casal</h2>
    <p class="mb-3 text-sm text-carvao/60">
      Gere um código e mande no WhatsApp pra juntar o progresso de vocês dois — sem conta, sem
      servidor.
    </p>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="btn-primary" onclick={gerar}>Gerar meu código</button>
      {#if codigo}
        <a class="btn bg-salvia text-white" href={whatsappUrl(codigo)} target="_blank" rel="noopener">
          Enviar no WhatsApp
        </a>
      {/if}
    </div>
    {#if codigo}
      <textarea
        readonly
        class="mt-2 w-full rounded-xl border border-black/10 p-2 text-xs"
        rows="2">{codigo}</textarea
      >
    {/if}

    <div class="mt-4 border-t border-black/5 pt-3">
      <p class="mb-2 text-sm text-carvao/60">Recebeu um código? Cole aqui:</p>
      <textarea
        bind:value={cola}
        placeholder="CE1...."
        class="w-full rounded-xl border border-black/10 p-2 text-xs"
        rows="2"
      ></textarea>
      <button type="button" class="btn-primary mt-2" onclick={importar}>Importar</button>
      {#if msg}<p class="mt-2 text-sm text-oceano">{msg}</p>{/if}
    </div>
  </div>
</section>

<style>
  /* Fileira de cards: rolagem lateral suave, sem barra visível */
  .row {
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .row::-webkit-scrollbar {
    display: none;
  }
</style>
