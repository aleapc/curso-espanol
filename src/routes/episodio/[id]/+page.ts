import { error } from '@sveltejs/kit';
import { outline } from '$lib/course';
import type { Episode } from '$lib/types';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

// Import DINÂMICO por episódio: cada ep-*.json vira um chunk próprio (~6 KB).
// O import estático antigo (episodes.ts) punha os 69 JSONs num chunk único de
// ~376 KB que TODA página de episódio baixava — e editar 1 episódio invalidava
// o chunk inteiro nos aparelhos.
const mods = import.meta.glob<{ default: Episode }>('$lib/course/ep-*.json');

export const entries: EntryGenerator = () =>
  outline.flatMap((m) => m.licoes.map((l) => ({ id: l.id })));

export const load: PageLoad = async ({ params }) => {
  const mod = mods[`/src/lib/course/ep-${params.id}.json`];
  if (!mod) throw error(404, 'Episódio não encontrado');
  return { episodio: (await mod()).default };
};
