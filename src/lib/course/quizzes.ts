import type { Quiz } from '../types';
import qBasico from './quiz-basico.json';
import qIntermediario from './quiz-intermediario.json';
import qAvancado from './quiz-avancado.json';

// Quizzes de compreensão (diálogo nativo + perguntas em espanhol), um por nível.
export const quizzes: Quiz[] = [qBasico as Quiz, qIntermediario as Quiz, qAvancado as Quiz];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

// id do quiz por nível (pra linkar no home)
export const quizDoNivel: Record<string, string> = {
  basico: 'q-basico',
  intermediario: 'q-intermediario',
  avancado: 'q-avancado'
};
