<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { decodeSync, importSync } from '$lib/sync';

  // 'fora' = link aberto no navegador (não no PWA instalado): no iOS o storage é
  // SEPARADO — importar aqui gravava no lugar errado e mostrava sucesso falso.
  let estado = $state<'lendo' | 'preview' | 'ok' | 'erro' | 'fora'>('lendo');
  let detalhe = $state('');
  let codigo = $state('');
  let previa = $state<{ ale: number; dea: number } | null>(null);
  let copiado = $state(false);

  onMount(() => {
    const m = window.location.hash.match(/s=(CE1\.[A-Za-z0-9_-]+)/);
    if (!m) {
      estado = 'erro';
      detalhe = 'Link sem código. Peça pra gerar de novo.';
      return;
    }
    codigo = m[1];
    const data = decodeSync(codigo);
    if (!data) {
      estado = 'erro';
      detalhe = 'Código inválido — peça pra gerar e mandar de novo.';
      return;
    }
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (!standalone) {
      estado = 'fora';
      return;
    }
    // Dentro do app: mostra o que vai entrar e ESPERA confirmação (merge é
    // irreversível — união sem undo).
    previa = { ale: data.ale.length, dea: data.dea.length };
    estado = 'preview';
  });

  function confirmar() {
    const r = importSync(codigo);
    if (r) {
      estado = 'ok';
      detalhe = `Juntei +${r.ale} do Alê e +${r.dea} da Andréia. 🎉`;
    } else {
      estado = 'erro';
      detalhe = 'Código inválido.';
    }
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo);
      copiado = true;
    } catch {
      /* iOS antigo sem clipboard API — o textarea abaixo permite copiar na mão */
    }
  }
</script>

<div class="mt-10 text-center">
  {#if estado === 'lendo'}
    <p>Lendo o código…</p>
  {:else if estado === 'preview'}
    <h1 class="text-2xl font-extrabold">Sincronizar? 🔄</h1>
    <p class="mt-2 text-carvao/70">
      O código traz {previa?.ale ?? 0} lições do Alê e {previa?.dea ?? 0} da Andréia. Importar junta
      tudo (não remove nada).
    </p>
    <button class="btn-primary mt-4" onclick={confirmar}>Importar agora</button>
  {:else if estado === 'ok'}
    <h1 class="text-2xl font-extrabold text-salvia">Pronto! ✅</h1>
    <p role="status" class="mt-2 text-carvao/70">{detalhe}</p>
  {:else if estado === 'fora'}
    <h1 class="text-2xl font-extrabold">Quase lá! 📲</h1>
    <p class="mx-auto mt-2 max-w-sm text-carvao/70">
      Este link abriu no <b>navegador</b> — mas o seu progresso vive no <b>app Hablá</b> da tela de
      início. Copie o código e cole lá dentro:
    </p>
    <ol class="mx-auto mt-3 max-w-sm space-y-1 text-left text-sm text-carvao/70">
      <li>1. Toque em <b>Copiar código</b> abaixo</li>
      <li>2. Abra o app <b>Hablá</b> na tela de início (no computador: a home do curso)</li>
      <li>3. Em <b>Sincronizar</b>, cole e importe</li>
    </ol>
    <button class="btn-primary mt-4" onclick={copiar}>
      {copiado ? '✅ Copiado!' : '📋 Copiar código'}
    </button>
    <textarea
      class="mx-auto mt-3 block w-full max-w-sm rounded-xl border border-black/10 bg-white p-2 text-[10px] text-carvao/60"
      rows="3"
      readonly
      onclick={(e) => (e.currentTarget as HTMLTextAreaElement).select()}>{codigo}</textarea
    >
  {:else}
    <h1 class="text-2xl font-extrabold text-terracota">Hmm… 🤔</h1>
    <p role="status" class="mt-2 text-carvao/70">{detalhe}</p>
  {/if}
  <a href="{base}/" class="btn-primary mt-6 inline-block">Ir pro curso</a>
</div>
