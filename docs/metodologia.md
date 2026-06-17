# Metodologia do Curso de Español (áudio-first)

> Base: pesquisa profunda (jun/2026) — 22 fontes, 25 alegações verificadas com voto
> adversarial (3 juízes), 17 confirmadas / 8 derrubadas. Este doc é a espinha do curso.

## Decisão: modelo HÍBRIDO em 3 camadas

A pesquisa não aponta um "método vencedor" único — aponta um híbrido, porque tanto o
"só input" (estilo Dreaming Spanish) quanto o "output é superior" foram **refutados**.
A posição segura e com mais evidência é combinar:

1. **Esqueleto instrucional** estilo **Michel Thomas / Language Transfer / Pimsleur**:
   entender > memorizar, falar já na 1ª lição, gramática sem jargão, explorar cognatos.
   Conduzido por uma **voz-guia em português** (como o Pimsleur usa o inglês).
2. **Corpo de prática** via **sentence mining** (a unidade é a FRASE, não a palavra solta;
   áudio nativo rioplatense em tudo) + **shadowing** (repetir o áudio quase ao mesmo tempo,
   sem texto) para prosódia e fluência.
3. **Memória** via **repetição espaçada (SRS)** com intervalos que se expandem.

### Por que (evidência)
- **SRS é o pilar mais forte.** Meta-análise de 98 efeitos / 48 experimentos (N=3.411):
  spacing tem efeito **médio-a-grande** em L2. (Kim & Webb 2022, *Language Learning*,
  DOI 10.1111/lang.12479)
- **Intervalos largos rendem retenção muito maior.** Estudo de 9 anos: 13 sessões a 56 dias
  ≈ 26 sessões a 14 dias; recall em 5 anos sobe com o intervalo. (Bahrick et al. 1993,
  *Psychological Science*) — **mas** o ótimo é em U-invertido (não "quanto mais largo melhor"):
  usar curva adaptativa (SM-2/FSRS), não esticar tudo ao máximo.
- **Input é necessário, mas NÃO suficiente.** Entender sem usar não "recabeia" o cérebro;
  Krashen nunca deu o mecanismo de conversão. Logo: **produção oral obrigatória**.
  (Nguyen & Doan 2025, *Frontiers in Psychology*)
- **Shadowing funciona pra fala.** Revisão sistemática 2025 (44 estudos): melhora
  compreensibilidade, inteligibilidade, sotaque e prosódia. (Whitworth & Rose 2025)
- **Glossika** valida o template prático: ~**50/50 ouvido/boca**, frase como unidade,
  sessão de "novo" = **5 frases × 5 reps = 25 reps** (~10 min). (Glossika Method)

### O que a pesquisa DERRUBOU (não cair nessas)
- ❌ "Só input gera fala" (0-3). ❌ "Output é neurologicamente superior" (0-3).
  → Nenhum extremo: **híbrido**.
- ❌ "Minimizar gramática explícita" (0-3) — um pouco de estrutura explícita ajuda,
  desde que sem jargão.
- ❌ "Intervalos sempre mais largos vencem no pós-teste" (0-3) — usar SRS adaptativo.

## Português ↔ Espanhol: a faca de dois gumes
- A proximidade dá ganho real no começo (~85% de cognatos) → **explorar cognatos cedo**
  pra confiança rápida.
- Mas vira fonte de erros que **fossilizam**: o "portunhol" e a *"ilusão de competência
  espontânea"* — o brasileiro sente que já sabe e se apropria por cima. (Celada 2002, tese
  USP; Santos via Helguera & Rodríguez 2019)
- → **Atacar falsos amigos e interferência explicitamente e cedo**, com a voz PT-BR
  nomeando a armadilha. Exigir produção **precisa** nas pausas (não aceitar "mais ou menos").

## Template de episódio (~15–20 min)
| Bloco | Tempo | O quê |
|---|---|---|
| 1. Aquecimento / Revisão SRS | ~30–40% | Frases "prestes a esquecer" voltam no padrão prompt→pausa→você fala→modelo nativo |
| 2. Conteúdo novo | ~núcleo | ~5 frases novas, cada uma ~5× (≈25 reps), padrão **prompt-pausa-resposta-confirmação** |
| 3. Shadowing | 1 bloco | Trecho curto em espanhol; você repete quase junto, sem texto |
| 4. Recombinação | fecho | Mistura o novo com o velho em mini-diálogo/situação |

**Proporção novo:revisão ≈ 30:70** (a favor da revisão — primazia do spacing).

## Progressão iniciante → avançado
- Frases de dificuldade crescente (modelo Glossika de níveis).
- Intervalos de revisão **expandem** ao longo do tempo.
- Início: densidade alta de cognatos. Intermediário/avançado: injetar **módulos
  dedicados de falsos amigos e interferência** antes da fossilização.

## Prática de fala sem humano (no app)
- **Prompt em PT → pausa cronometrada → você fala em voz alta → áudio do nativo** confirma.
- **Shadowing** com o clipe nativo.
- **Gravar e se ouvir** (MediaRecorder) e/ou **reconhecimento de voz** (Web Speech API)
  pra autoconferência. ⚠ A literatura valida a *técnica*; a confiabilidade do reconhecimento
  no navegador pra rioplatense **não foi testada** — tratar como "ajuda", não como nota final.

## Vozes
- **Conteúdo-alvo (espanhol):** rioplatense nativo — **Isabela** (fem.) e **Lucas** (masc.).
- **Voz-guia (instrução em PT-BR):** explica estrutura, sinaliza cognatos, **avisa dos
  falsos amigos/portunhol**. Par escolhido: **Letícia** (professora principal) + **Eduardo S.**
  (alternância/variedade). O espanhol domina o conteúdo; o PT-BR só instrui.

## Arquitetura do app (pivô)
De "PWA de ler lição" para **player de áudio-curso**:
- **Clipe atômico** = uma frase, um arquivo de áudio (já é o que o pipeline gera).
- **Episódio** = sequência ordenada de passos (intro PT, apresenta, prompt-pausa, shadowing,
  recombina), tocada com pausas automáticas.
- **Motor de SRS** monta dinamicamente as sessões de revisão a partir dos clipes "vencidos"
  (SM-2/FSRS) — reconcilia áudio fixo com revisão adaptativa.
- Tela vira "play do episódio" + modo "Revisão de hoje".

## Gramática: "plantar" no fim + aprofundar opcional (decisão do usuário, jun/2026)
O curso é conversacional, mas gramática explícita em dose certa ajuda (a pesquisa REFUTOU
"minimizar gramática" — o conhecimento explícito serve pra autocorreção). Dois níveis:
1. **Gramática em foco** — no FIM de cada episódio, um bloco curto (~1–2 min, Bia em PT,
   com os exemplos na voz nativa) que "planta" o ponto-chave do tema: o tempo verbal e/ou o
   formal vs. informal envolvidos. Faz parte do fluxo. Ex. (Ep1): voseo (vos/tú/usted =
   informal/neutro/formal) e ser vs. estar. Sem jargão pesado.
2. **Para ir além (opcional)** — seção que abre só se a pessoa quiser, FORA do fluxo de áudio:
   explicação gramatical mais detalhada (texto + áudio). Nunca no caminho de quem só quer
   conversar — preserva o propósito conversacional.

Vale pra TODOS os episódios (parte do molde). No modelo de dados: um bloco final de steps
"Gramática em foco" + um campo opcional `aprofundar` no episódio (renderizado fora do player).

## Regra de áudio PT↔ES (investigação confirmada, jun/2026)
**Separação dura de vozes:** a voz PT-BR fala 100% da instrução; a voz rioplatense
fala 100% do espanhol. NUNCA a mesma voz (nem uma voz "multilíngue") faz as duas
línguas — isso **sintetiza portunhol**. É convenção quase universal nos cursos de áudio
(Pimsleur, Michel Thomas, Paul Noble, Glossika só dão o alvo com nativo; Language Transfer
não usa nativo e é criticado justamente por isso).
- Cada palavra/frase em espanhol é um **clipe próprio** da voz nativa, encaixado depois da
  instrução em PT com uma pausa curta no limite. Nunca emendar PT→ES na mesma voz/respiração.
  Ex.: 🇧🇷 "para dizer seu nome, em português é *me chamo*; em espanhol:" → 🇺🇾 "*me llamo* Alexandre."
- **Línguas próximas:** espanhol com sotaque brasileiro É portunhol e modela transferência
  negativa (Lipski, "Too Close for Comfort"; Trude & Tokowicz: cognatos PT-ES disparam erro
  sistemático, o L1 precisa ser inibido). Modelo errado é pior que neutro.
- **ElevenLabs:** vozes default/multilíngues carregam viés fonético; uma voz só nas duas
  línguas tinge o espanhol de português. Vozes separadas (PT nativa + ES rioplatense) e
  concatenar. Conferir que a voz ES não "tinge" números/cognatos antes de gerar em massa.
- **Dosagem do PT:** começar com apoio em PT e ir **reduzindo** ao longo do curso (ACTFL:
  minimizar L1, mirar ≥90% no alvo conforme avança). PT é andaime, não muleta permanente.

Fontes: Pimsleur/Glossika (convenção), Lipski (lingref), Trude & Tokowicz (Language Learning),
ACTFL, docs ElevenLabs.

## Erros a evitar
Escuta passiva só; diluir o 50/50 em modo só-ouvir; permissividade com portunhol;
revisão amontoada; tratar a proximidade como atalho sem mirar a interferência.

## Lacunas em aberto (decidir na implementação)
- Algoritmo SRS concreto (SM-2 vs FSRS vs agenda fixa Pimsleur).
- Confiabilidade do Web Speech API pra rioplatense (testar na prática).
- Cronograma quantitativo de quando injetar cada módulo anti-interferência.
