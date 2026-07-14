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

// NOTA: quizDoEpisodio assume que TODO episódio do outline tem quiz-ep-<id>.json.
// O prerender (rotas quiz/[id]) deriva as páginas dos ARQUIVOS reais, então um
// episódio novo sem quiz não quebra o build — mas o link do card daria 404 até
// o quiz ser gravado. Regra prática: episódio novo = gravar o quiz junto.
