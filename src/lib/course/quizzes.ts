import type { Quiz } from '../types';
// Provas de nível (áudio + teste mais longo, "tipo filme")
import qBasico from './quiz-basico.json';
import qIntermediario from './quiz-intermediario.json';
import qAvancado from './quiz-avancado.json';
// Quizzes por episódio
import qB01 from './quiz-ep-b01.json';
import qB02 from './quiz-ep-b02.json';
import qB03 from './quiz-ep-b03.json';
import qB04 from './quiz-ep-b04.json';
import qB05 from './quiz-ep-b05.json';
import qB06 from './quiz-ep-b06.json';
import qB07 from './quiz-ep-b07.json';
import qB08 from './quiz-ep-b08.json';
import qB09 from './quiz-ep-b09.json';
import qB10 from './quiz-ep-b10.json';
import qI01 from './quiz-ep-i01.json';
import qI02 from './quiz-ep-i02.json';
import qI03 from './quiz-ep-i03.json';
import qI04 from './quiz-ep-i04.json';
import qI05 from './quiz-ep-i05.json';
import qI06 from './quiz-ep-i06.json';
import qI07 from './quiz-ep-i07.json';
import qA01 from './quiz-ep-a01.json';
import qA02 from './quiz-ep-a02.json';
import qA03 from './quiz-ep-a03.json';
import qA04 from './quiz-ep-a04.json';
import qA05 from './quiz-ep-a05.json';
import qA06 from './quiz-ep-a06.json';

// Provas de nível (uma por nível) — diálogo + teste mais longo.
export const exames: Quiz[] = [qBasico as Quiz, qIntermediario as Quiz, qAvancado as Quiz];

// Quizzes por episódio.
export const quizzesEpisodio: Quiz[] = [
  qB01, qB02, qB03, qB04, qB05, qB06, qB07, qB08, qB09, qB10,
  qI01, qI02, qI03, qI04, qI05, qI06, qI07,
  qA01, qA02, qA03, qA04, qA05, qA06
].map((q) => q as Quiz);

export const quizzes: Quiz[] = [...quizzesEpisodio, ...exames];

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((q) => q.id === id);
}

// Mapas pra navegação
export const quizDoEpisodio: Record<string, string> = Object.fromEntries(
  quizzesEpisodio.map((q) => [q.id.replace(/^q-/, ''), q.id]) // 'b01' -> 'q-b01'
);
export const examDoNivel: Record<string, string> = {
  basico: 'q-basico',
  intermediario: 'q-intermediario',
  avancado: 'q-avancado'
};
