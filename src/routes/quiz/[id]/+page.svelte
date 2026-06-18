<script lang="ts">
  import { base } from '$app/paths';
  import QuizPlayer from '$lib/components/QuizPlayer.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const quiz = data.quiz;

  const nivelLabel: Record<string, string> = {
    basico: 'Básico',
    intermediario: 'Intermediário',
    avancado: 'Avançado'
  };
</script>

<a href="{base}/" class="text-sm text-oceano">← voltar</a>

<header class="mt-2">
  <p class="text-xs font-semibold uppercase tracking-wide text-terracota">
    {nivelLabel[quiz.nivel] ?? ''} · Quiz
  </p>
  <h1 class="text-2xl font-extrabold leading-tight">{quiz.titulo}</h1>
  <p class="text-carvao/70">{quiz.subtitulo}</p>
</header>

<div class="mt-4">
  <QuizPlayer {quiz} />
</div>
