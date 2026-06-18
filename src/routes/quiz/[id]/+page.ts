import { error } from '@sveltejs/kit';
import { quizzes, getQuiz } from '$lib/course/quizzes';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => quizzes.map((q) => ({ id: q.id }));

export const load: PageLoad = ({ params }) => {
  const quiz = getQuiz(params.id);
  if (!quiz) throw error(404, 'Quiz não encontrado');
  return { quiz };
};
