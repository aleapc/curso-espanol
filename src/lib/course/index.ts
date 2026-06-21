import type { ModuloOutline } from '../types';

// Syllabus situacional completo (ver docs/syllabus.md). Episódios longos, cada tema
// explorado a fundo. `pronta: true` = já tem áudio; o resto aparece como "em breve".
export const outline: ModuloOutline[] = [
  {
    nivel: 'basico',
    nome: 'Básico',
    descricao: 'Me viro de verdade: situações reais do dia a dia e da viagem, falando desde o episódio 1.',
    cor: 'salvia',
    licoes: [
      { id: 'b01a', titulo: 'Saludos 1A — Cumprimentar e responder', pronta: true },
      { id: 'b01b', titulo: 'Saludos 1B — Ser educado e se virar', pronta: true },
      { id: 'b01c', titulo: 'Saludos 1C — Apresentar-se', pronta: true },
      { id: 'b02a', titulo: 'Números 2A — De 0 a 20', pronta: true },
      { id: 'b02b', titulo: 'Números 2B — Dezenas, centenas e preços', pronta: true },
      { id: 'b02c', titulo: 'Números 2C — Horas e datas', pronta: true },
      { id: 'b03a', titulo: 'Na rua 3A — Direções', pronta: true },
      { id: 'b03b', titulo: 'Na rua 3B — Transportes', pronta: true },
      { id: 'b03c', titulo: 'Na rua 3C — Passagem e situações', pronta: true },
      { id: 'b10a', titulo: 'Chegada 10A — Imigração e bagagem', pronta: true },
      { id: 'b10b', titulo: 'Chegada 10B — Sair do aeroporto', pronta: true },
      { id: 'b10c', titulo: 'Chegada 10C — Internet e dinheiro', pronta: true },
      { id: 'b04a', titulo: 'Restaurante 1A — Chegar e a mesa', pronta: true },
      { id: 'b04b', titulo: 'Restaurante 1B — Pedir', pronta: true },
      { id: 'b04c', titulo: 'Restaurante 1C — Pagar e resolver', pronta: true },
      { id: 'b05a', titulo: 'Restaurante 2A — La parrilla', pronta: true },
      { id: 'b05b', titulo: 'Restaurante 2B — Outros pratos', pronta: true },
      { id: 'b05c', titulo: 'Restaurante 2C — Sobremesa, café e restrições', pronta: true },
      { id: 'b06a', titulo: 'Compras 3A — Na loja', pronta: true },
      { id: 'b06b', titulo: 'Compras 3B — Tamanho e provar', pronta: true },
      { id: 'b06c', titulo: 'Compras 3C — Preço, pagar e trocar', pronta: true },
      { id: 'b07a', titulo: 'Hotel 4A — Check-in', pronta: true },
      { id: 'b07b', titulo: 'Hotel 4B — O quarto e problemas', pronta: true },
      { id: 'b07c', titulo: 'Hotel 4C — Check-out e serviços', pronta: true },
      { id: 'b08a', titulo: 'Mercado 5A — Comprar comida', pronta: true },
      { id: 'b08b', titulo: 'Mercado 5B — Quantidades e o caixa', pronta: true },
      { id: 'b08c', titulo: 'Farmácia 5C — Dor, remédios e receita', pronta: true },
      { id: 'b09a', titulo: 'Armadilhas 6A — Na mesa e na loja', pronta: true },
      { id: 'b09b', titulo: 'Armadilhas 6B — Pessoas e lugares', pronta: true },
      { id: 'b09c', titulo: 'Armadilhas 6C — Tempo e estados', pronta: true }
    ]
  },
  {
    nivel: 'intermediario',
    nome: 'Intermediário',
    descricao: 'Converso de verdade: contar, planejar, opinar e resolver — passados, futuro e vida social.',
    cor: 'oceano',
    licoes: [
      { id: 'i01a', titulo: 'Pasado 1A — O que eu fiz', pronta: true },
      { id: 'i01b', titulo: 'Pasado 1B — Contar a viagem', pronta: true },
      { id: 'i01c', titulo: 'Pasado 1C — Perguntar e reagir', pronta: true },
      { id: 'i02a', titulo: 'Rutinas 2A — Minha rotina', pronta: true },
      { id: 'i02b', titulo: 'Rutinas 2B — Como era antes', pronta: true },
      { id: 'i02c', titulo: 'Rutinas 2C — Pintar a cena', pronta: true },
      { id: 'i03a', titulo: 'Planes 3A — O que vou fazer', pronta: true },
      { id: 'i03b', titulo: 'Planes 3B — Quando', pronta: true },
      { id: 'i03c', titulo: 'Planes 3C — Combinar encontros', pronta: true },
      { id: 'i04a', titulo: 'Salud 4A — Como me sinto', pronta: true },
      { id: 'i04b', titulo: 'Salud 4B — Emergência', pronta: true },
      { id: 'i04c', titulo: 'Salud 4C — Resolver e melhorar', pronta: true },
      { id: 'i05a', titulo: 'Servicios 5A — Banco e dinheiro', pronta: true },
      { id: 'i05b', titulo: 'Servicios 5B — Celular e internet', pronta: true },
      { id: 'i05c', titulo: 'Servicios 5C — Reclamar e resolver', pronta: true },
      { id: 'i06a', titulo: 'Socializar 6A — Gostos', pronta: true },
      { id: 'i06b', titulo: 'Socializar 6B — Convidar', pronta: true },
      { id: 'i06c', titulo: 'Socializar 6C — Dar opinião', pronta: true },
      { id: 'i07a', titulo: 'Cultura 7A — O mate', pronta: true },
      { id: 'i07b', titulo: 'Cultura 7B — Fútbol, asado e sair', pronta: true },
      { id: 'i07c', titulo: 'Cultura 7C — Gírias rioplatenses', pronta: true }
    ]
  },
  {
    nivel: 'avancado',
    nome: 'Avançado',
    descricao: 'Fluência e nuance: subjuntivo, registros, idiomatismos e entender o nativo rápido.',
    cor: 'terracota',
    licoes: [
      { id: 'a01a', titulo: 'Subjuntivo 1A — Desejos e votos', pronta: true },
      { id: 'a01b', titulo: 'Subjuntivo 1B — Querer que alguém faça', pronta: true },
      { id: 'a01c', titulo: 'Subjuntivo 1C — Dúvida e recomendação', pronta: true },
      { id: 'a02a', titulo: 'Condicional 2A — Pedidos educados', pronta: true },
      { id: 'a02b', titulo: 'Condicional 2B — Hipóteses', pronta: true },
      { id: 'a02c', titulo: 'Condicional 2C — Dar conselhos', pronta: true },
      { id: 'a03a', titulo: 'Conectores 3A — Ligar ideias', pronta: true },
      { id: 'a03b', titulo: 'Conectores 3B — Dar opinião', pronta: true },
      { id: 'a03c', titulo: 'Conectores 3C — Contrastar e concluir', pronta: true },
      { id: 'a04a', titulo: 'Modismos 4A — Expressões do dia a dia', pronta: true },
      { id: 'a04b', titulo: 'Modismos 4B — Intensificar e reagir', pronta: true },
      { id: 'a04c', titulo: 'Modismos 4C — Formal vs informal', pronta: true },
      { id: 'a05a', titulo: 'Trâmites 5A — Burocracia e documentos', pronta: true },
      { id: 'a05b', titulo: 'Trâmites 5B — Reuniões e negócios', pronta: true },
      { id: 'a05c', titulo: 'Trâmites 5C — Reclamar e negociar', pronta: true },
      { id: 'a06a', titulo: 'Nativos 6A — Pedir pra repetir', pronta: true },
      { id: 'a06b', titulo: 'Nativos 6B — Muletillas', pronta: true },
      { id: 'a06c', titulo: 'Nativos 6C — O grande teste', pronta: true }
    ]
  }
];

// ── Navegação em cards (home) ────────────────────────────────────────────────
// Agrupa as partes (licoes) em EPISÓDIOS, cada um com tema/emoji e uma "foto"
// opcional em static/img/<id>.jpg (cai num gradiente+emoji se a foto não existir).
const EP_META: Record<string, { nome: string; emoji: string }> = {
  b01: { nome: 'Saludos y presentaciones', emoji: '👋' },
  b02: { nome: 'Números, precios y horas', emoji: '🔢' },
  b03: { nome: 'En la calle: direcciones y bondis', emoji: '🧭' },
  b10: { nome: 'Llegada: aeropuerto y primeros 60', emoji: '🛬' },
  b04: { nome: 'Restaurante I: llegar y pedir', emoji: '🍽️' },
  b05: { nome: 'Restaurante II: la parrilla', emoji: '🥩' },
  b06: { nome: 'Compras: ropa y talles', emoji: '🛍️' },
  b07: { nome: 'Hotel: check-in y problemas', emoji: '🏨' },
  b08: { nome: 'Mercado y farmacia', emoji: '🛒' },
  b09: { nome: 'Trampas del portuñol', emoji: '⚠️' },
  i01: { nome: 'Hablar del pasado', emoji: '🕰️' },
  i02: { nome: 'Rutinas y cómo era antes', emoji: '☀️' },
  i03: { nome: 'Planes y futuro', emoji: '📅' },
  i04: { nome: 'Salud y emergencias', emoji: '🩺' },
  i05: { nome: 'Servicios y reclamos', emoji: '🏦' },
  i06: { nome: 'Socializar', emoji: '🎉' },
  i07: { nome: 'Cultura rioplatense', emoji: '🧉' },
  a01: { nome: 'El subjuntivo', emoji: '🌟' },
  a02: { nome: 'Condicional e hipótesis', emoji: '🎩' },
  a03: { nome: 'Conectores y argumentación', emoji: '🔗' },
  a04: { nome: 'Modismos y registros', emoji: '💬' },
  a05: { nome: 'Trámites y negocios', emoji: '📑' },
  a06: { nome: 'Entender a los nativos', emoji: '👂' }
};

export interface ParteCard {
  id: string;
  letra: string;
  titulo: string;
  pronta: boolean;
}
export interface EpisodioCard {
  id: string;
  nome: string;
  emoji: string;
  partes: ParteCard[];
}
export interface NivelCards {
  nivel: string;
  nome: string;
  cor: string;
  descricao: string;
  episodios: EpisodioCard[];
}

export const niveis: NivelCards[] = outline.map((mod) => {
  const groups: Record<string, EpisodioCard> = {};
  const ordem: string[] = [];
  for (const l of mod.licoes) {
    const epId = l.id.slice(0, -1); // b01a -> b01
    if (!groups[epId]) {
      const meta = EP_META[epId] ?? { nome: l.titulo, emoji: '🎧' };
      groups[epId] = { id: epId, nome: meta.nome, emoji: meta.emoji, partes: [] };
      ordem.push(epId);
    }
    const titulo = l.titulo.includes('—') ? l.titulo.split('—').pop()!.trim() : l.titulo;
    groups[epId].partes.push({
      id: l.id,
      letra: l.id.slice(-1).toUpperCase(),
      titulo,
      pronta: l.pronta
    });
  }
  return {
    nivel: mod.nivel,
    nome: mod.nome,
    cor: mod.cor,
    descricao: mod.descricao,
    episodios: ordem.map((id) => groups[id])
  };
});
