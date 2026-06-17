import { error } from '@sveltejs/kit';
import { episodes, getEpisodio } from '$lib/course/episodes';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => episodes.map((e) => ({ id: e.id }));

export const load: PageLoad = ({ params }) => {
  const episodio = getEpisodio(params.id);
  if (!episodio) throw error(404, 'Episódio não encontrado');
  return { episodio };
};
