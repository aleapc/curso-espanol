// Navegação de quizzes SEM importar nenhum JSON de conteúdo.
// A home só precisa de ids ('b01' → 'q-b01'); importar os 26 quiz-*.json aqui
// colocava ~98 KB (33 KB gzip) no bundle da home à toa.

import { outline } from './index';

// Ids de episódio (b01…a06, b10…) derivados do outline — leve por construção.
const epIds = [...new Set(outline.flatMap((m) => m.licoes.map((l) => l.id.slice(0, -1))))];

export const quizDoEpisodio: Record<string, string> = Object.fromEntries(
  epIds.map((e) => [e, `q-${e}`])
);

export const examDoNivel: Record<string, string> = {
  basico: 'q-basico',
  intermediario: 'q-intermediario',
  avancado: 'q-avancado'
};

/** Todos os ids de quiz existentes (episódios + provas de nível) — usado pelo prerender. */
export const quizIds: string[] = [...epIds.map((e) => `q-${e}`), ...Object.values(examDoNivel)];
