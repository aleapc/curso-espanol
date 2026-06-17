import { error } from '@sveltejs/kit';
import { lessons, getLesson } from '$lib/course';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => lessons.map((l) => ({ id: l.id }));

export const load: PageLoad = ({ params }) => {
  const licao = getLesson(params.id);
  if (!licao) throw error(404, 'Lição não encontrada');
  return { licao };
};
