<script lang="ts">
  import { base } from '$app/paths';
  import { outline } from '$lib/course';
  import { store, isDone, PROFILES } from '$lib/state.svelte';
  import { encodeSync, importSync, whatsappUrl } from '$lib/sync';

  const perfil = $derived(PROFILES.find((p) => p.id === store.current)!);

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

  const corClasse: Record<string, string> = {
    salvia: 'bg-salvia',
    oceano: 'bg-oceano',
    terracota: 'bg-terracota'
  };
</script>

<section class="mt-2">
  <h1 class="text-2xl font-extrabold leading-tight">
    ¡Hola, {perfil.nome.split(' ')[0]}! 👋
  </h1>
  <p class="mt-1 text-carvao/70">
    Áudio-curso de espanhol uruguaio — ouça, fale e aprenda. Pouca leitura, muita conversa.
  </p>
</section>

{#each outline as mod}
  {@const feitas = mod.licoes.filter((l) => isDone(l.id)).length}
  <section class="mt-6">
    <div class="mb-2 flex items-center gap-2">
      <span class="h-3 w-3 rounded-full {corClasse[mod.cor]}"></span>
      <h2 class="text-lg font-bold">{mod.nome}</h2>
      <span class="text-xs text-carvao/50">{feitas}/{mod.licoes.length} feitas</span>
    </div>
    <p class="mb-3 text-sm text-carvao/60">{mod.descricao}</p>
    <div class="space-y-2">
      {#each mod.licoes as l}
        {#if l.pronta}
          <a
            href="{base}/episodio/{l.id}/"
            class="card flex items-center justify-between gap-2 p-3 transition hover:ring-oceano/30"
          >
            <span class="flex items-center gap-2 font-medium"><span>🎧</span> {l.titulo}</span>
            <span class="text-sm">{isDone(l.id) ? '✅' : '▶'}</span>
          </a>
        {:else}
          <div
            class="flex items-center justify-between rounded-2xl border border-dashed border-black/10 p-3 text-carvao/40"
          >
            <span>{l.titulo}</span>
            <span class="text-xs">em breve</span>
          </div>
        {/if}
      {/each}
    </div>
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
