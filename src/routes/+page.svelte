<script lang="ts">
  import { base } from '$app/paths';
  import { niveis } from '$lib/course';
  import { quizDoNivel } from '$lib/course/quizzes';
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
          class="w-40 shrink-0 snap-start overflow-hidden rounded-2xl bg-white text-left shadow-sm transition
            {aberto === ep.id ? ringCor[nivel.cor] : 'ring-1 ring-black/5'}"
        >
          <div class="relative flex h-24 items-center justify-center {softBg[nivel.cor]}">
            <span class="text-4xl">{ep.emoji}</span>
            <img
              src="{base}/img/{ep.id}.jpg"
              alt=""
              loading="lazy"
              class="absolute inset-0 h-full w-full object-cover"
              onerror={(e) => (e.currentTarget.style.display = 'none')}
            />
            {#if f === ep.partes.length}
              <span class="absolute right-1.5 top-1.5 rounded-full bg-white/90 px-1.5 text-xs">✅</span>
            {/if}
          </div>
          <div class="p-2.5">
            <div class="text-[11px] font-semibold uppercase tracking-wide {textCor[nivel.cor]}">
              Episódio {i + 1}
            </div>
            <div class="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug">{ep.nome}</div>
            <div class="mt-1.5 flex gap-1">
              {#each ep.partes as p}
                <span
                  class="h-1.5 flex-1 rounded-full {isDone(p.id) ? dotBg[nivel.cor] : 'bg-black/10'}"
                ></span>
              {/each}
            </div>
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
          </div>
        </div>
      {/if}
    {/each}

    <!-- Quiz do nível -->
    {#if quizDoNivel[nivel.nivel]}
      <a
        href="{base}/quiz/{quizDoNivel[nivel.nivel]}/"
        class="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-black/15 px-4 py-3 transition hover:bg-black/5"
      >
        <span class="text-xl">🎧</span>
        <span class="flex-1">
          <span class="block text-sm font-bold">Quiz do {nivel.nome}</span>
          <span class="block text-xs text-carvao/55">Escute uma conversa e responda em espanhol</span>
        </span>
        <span class="text-sm">{isDone(quizDoNivel[nivel.nivel]) ? '✅' : '▶'}</span>
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
