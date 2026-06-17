import type { Lesson } from '../types';

// Básico · Lição 1 — Saudações e apresentações.
// Espanhol RIOPLATENSE (Uruguai/Argentina): usamos voseo ("vos"), com o "tú"
// neutro mostrado ao lado pra não perder o resto da América Latina.
// Pensada pra um casal brasileiro: foco em uso real (viagem) + os falsos
// amigos PT→ES que mais derrubam brasileiro.
export const b01: Lesson = {
  id: 'b01',
  nivel: 'basico',
  titulo: 'Saludos y presentaciones',
  subtitulo: 'Cumprimentar, se apresentar e se despedir (jeito uruguaio)',
  objetivos: [
    'Cumprimentar conforme o horário do dia',
    'Perguntar e dizer o próprio nome (no "vos" rioplatense)',
    'Perguntar como alguém está — e responder',
    'Se despedir com naturalidade'
  ],
  vocab: [
    { es: 'hola', pt: 'oi / olá' },
    { es: 'buenos días', pt: 'bom dia' },
    { es: 'buenas tardes', pt: 'boa tarde' },
    { es: 'buenas noches', pt: 'boa noite (e boa madrugada)' },
    { es: '¿cómo estás?', pt: 'como você está?' },
    { es: 'muy bien', pt: 'muito bem' },
    { es: 'gracias', pt: 'obrigado(a)' },
    { es: '¿cómo te llamás?', pt: 'como você se chama? (voseo)' },
    { es: 'me llamo…', pt: 'meu nome é… / eu me chamo…' },
    { es: 'mucho gusto', pt: 'muito prazer' },
    { es: '¿y vos?', pt: 'e você? (rioplatense)' },
    { es: 'por favor', pt: 'por favor' },
    { es: 'de nada', pt: 'de nada' },
    { es: 'hasta luego', pt: 'até logo' },
    { es: 'adiós', pt: 'tchau / adeus' }
  ],
  gramatica: [
    {
      titulo: 'O "vos" rioplatense (e o "ustedes")',
      explicacao:
        'No Uruguai e na Argentina não se usa "tú": usa-se vos, com formas próprias do verbo — vos sos (você é), vos tenés (você tem), vos te llamás (você se chama). O sentido é o mesmo do "tú", só muda a forma. E o plural de "você" é sempre ustedes (nunca "vosotros").',
      exemplos: [
        { es: 'vos sos  (= tú eres)', pt: 'você é' },
        { es: 'vos tenés  (= tú tienes)', pt: 'você tem' },
        { es: 'vos te llamás  (= tú te llamas)', pt: 'você se chama' },
        { es: 'ustedes son', pt: 'vocês são' }
      ]
    },
    {
      titulo: 'ser, estar e llamarse',
      explicacao:
        'Use ser pro permanente (nome, origem) e estar pro passageiro (como você está agora). No rioplatense: "vos sos de Brasil", "¿cómo estás?", "¿cómo te llamás?".',
      exemplos: [
        { es: 'Yo soy de Brasil. / Vos sos de Brasil.', pt: 'Eu sou / Você é do Brasil.' },
        { es: '¿Cómo estás hoy?', pt: 'Como você está hoje?' },
        { es: 'Me llamo Alexandre.', pt: 'Eu me chamo Alexandre.' }
      ]
    }
  ],
  dialogo: {
    titulo: 'Dois viajantes se conhecem',
    linhas: [
      { speaker: 'Ana', es: '¡Hola! Buenos días.', pt: 'Oi! Bom dia.', audioKey: 'b01-d1' },
      { speaker: 'Diego', es: '¡Buenos días! ¿Cómo estás?', pt: 'Bom dia! Como você está?', audioKey: 'b01-d2' },
      { speaker: 'Ana', es: 'Muy bien, gracias. ¿Y vos?', pt: 'Muito bem, obrigada. E você?', audioKey: 'b01-d3' },
      { speaker: 'Diego', es: 'Bien también. ¿Cómo te llamás?', pt: 'Bem também. Como você se chama?', audioKey: 'b01-d4' },
      { speaker: 'Ana', es: 'Me llamo Ana. ¿Y vos?', pt: 'Eu me chamo Ana. E você?', audioKey: 'b01-d5' },
      { speaker: 'Diego', es: 'Me llamo Diego. ¡Mucho gusto!', pt: 'Eu me chamo Diego. Muito prazer!', audioKey: 'b01-d6' },
      { speaker: 'Ana', es: '¡Mucho gusto! Hasta luego.', pt: 'Muito prazer! Até logo.', audioKey: 'b01-d7' },
      { speaker: 'Diego', es: '¡Adiós!', pt: 'Tchau!', audioKey: 'b01-d8' }
    ]
  },
  falsosAmigos: [
    {
      es: 'exquisito',
      pareceQue: 'esquisito (estranho)',
      significa: 'delicioso, refinado',
      exemplo: 'La comida está exquisita. → A comida está deliciosa.'
    },
    {
      es: 'largo',
      pareceQue: 'largo (de largura)',
      significa: 'comprido, longo',
      exemplo: 'Un camino largo. → Um caminho comprido.'
    },
    {
      es: 'oficina',
      pareceQue: 'oficina (mecânica)',
      significa: 'escritório',
      exemplo: 'Trabajo en una oficina. → Trabalho num escritório.'
    },
    {
      es: 'rato',
      pareceQue: 'rato (o bicho)',
      significa: 'um instante, um momentinho',
      exemplo: 'Esperá un rato. → Espera um instante.'
    }
  ],
  frasesChave: [
    { es: 'Mucho gusto.', pt: 'Muito prazer.', audioKey: 'b01-f1' },
    { es: '¿Cómo te llamás?', pt: 'Como você se chama?', audioKey: 'b01-f2' },
    { es: 'Me llamo Alexandre.', pt: 'Eu me chamo Alexandre.', audioKey: 'b01-f3' }
  ],
  exercicios: [
    {
      tipo: 'mcq',
      pergunta: 'Como se diz "bom dia"?',
      opcoes: ['Buenas noches', 'Buenos días', 'Hasta luego', 'De nada'],
      correta: 1
    },
    {
      tipo: 'mcq',
      pergunta: '"Exquisito" quer dizer…',
      opcoes: ['Estranho', 'Delicioso', 'Comprido', 'Cansado'],
      correta: 1,
      explica: 'Pegadinha de falso amigo: em espanhol é elogio!'
    },
    {
      tipo: 'preencher',
      frase: '¿Cómo te ___? — Me llamo Ana.',
      resposta: 'llamás',
      dica: 'verbo llamarse na forma "vos" (rioplatense)'
    },
    {
      tipo: 'escuta',
      texto: 'Mucho gusto.',
      audioKey: 'b01-f1',
      opcoes: ['Muito prazer', 'Boa noite', 'De nada'],
      correta: 0
    },
    {
      tipo: 'parear',
      pares: [
        { es: 'gracias', pt: 'obrigado' },
        { es: 'adiós', pt: 'tchau' },
        { es: '¿y vos?', pt: 'e você?' },
        { es: '¿cómo estás?', pt: 'como vai?' }
      ]
    },
    {
      tipo: 'falar',
      alvo: 'Mucho gusto',
      pt: 'Diga "Muito prazer" em espanhol'
    }
  ]
};
