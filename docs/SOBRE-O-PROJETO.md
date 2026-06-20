# Hablá — Curso de Español rioplatense (PWA)

**Repositório:** https://github.com/aleapc/curso-espanol
**App no ar:** https://aleapc.github.io/curso-espanol/

> Sumário do projeto para análise externa. O objetivo é receber insights para
> evoluir o produto (pedagogia, UX, monetização, escala).

## 1. O que é / objetivo
Áudio-curso de **espanhol rioplatense** (variante do Uruguai/Argentina, com **voseo**)
em formato **PWA mobile**, no estilo "podcast/áudio-curso" (inspirado em Pimsleur /
Language Transfer / Michel Thomas). Nasceu como projeto pessoal de um casal brasileiro
que viaja para Uruguai/Argentina; a ênfase é **aprender a falar** (ouvir → responder em
voz alta), com pouca leitura. Curso completo do zero ao avançado.

## 2. Público
Hoje: um casal (dois perfis, progresso separado, sincronizável). Visão futura:
**produtizar** como app de loja para um público amplo de viagem/lifestyle (ver seção 9).

## 3. Metodologia pedagógica (os diferenciais)
- **Híbrido baseado em evidência:** input compreensível + **output obrigatório**
  (pausa "fale agora") + **shadowing** + recordação espaçada/recombinação.
- **Separação dura de vozes:** a narradora PT-BR (Bia) fala **só português**; **todo** o
  espanhol vem de vozes nativas rioplatenses (Ana/Diego). Isso evita "portunhol" sintetizado.
- **Voseo** (vos sos/tenés/querés), falsos amigos PT↔ES tratados cedo, gírias rioplatenses
  (che, dale, bárbaro, posta).
- Cada episódio tem **"Gramática em foco"** (plantio rápido, em PT) + **"Para ir além"**
  (gramática detalhada opcional, fora do fluxo de áudio).
- **Dois modos de player:** 📚 *Estudo* (pausa e espera você falar) e 🚗 *Carro* (contínuo,
  mãos livres, MediaSession/controles de lock-screen).

## 4. Arquitetura técnica
- **SvelteKit 2 + Svelte 5 (runes) + adapter-static + Tailwind 3 + @vite-pwa/sveltekit.**
  Site 100% estático, **deploy no GitHub Pages** (branch `gh-pages`) via script `deploy.ps1`.
- **Conteúdo como dado (fonte única):** cada episódio é um `src/lib/course/ep-*.json`
  (sequência de "steps": intro/ouvir/responde/shadow/recap). O **mesmo JSON** alimenta o
  player E gera os clipes de áudio (`scripts/generate-audio.mjs` → ElevenLabs).
- **PWA offline:** app shell pré-cacheado; áudio e fotos cacheados **sob demanda**
  (CacheFirst) — tocou/abriu uma vez com internet, fica offline.
- **Sync de casal sem servidor:** código compactado (prefixo `CE1.`) trocado por WhatsApp;
  merge idempotente do progresso. Progresso em localStorage.

## 5. Estrutura de conteúdo
- **3 níveis:** Básico, Intermediário, Avançado.
- **22 episódios** divididos em **66 partes** (A/B/C), por situação real: saudações,
  números/preços/horas, direções/transporte, restaurante I e II, compras, hotel,
  mercado/farmácia, falsos amigos; passado/rotina/futuro, saúde, serviços/reclamações,
  socializar, cultura; subjuntivo, condicional, conectores, modismos/registros,
  trâmites/negócios, entender o nativo rápido.
- **Avaliação em 2 camadas:** **22 quizzes por episódio** (diálogo nativo + 6 perguntas
  múltipla escolha em espanhol) + **3 "provas de nível" tipo filme** (cena longa conectada
  + 14–20 perguntas de interpretação, incluindo inferência).

## 6. Pipeline de áudio
- **ElevenLabs** (modelo Flash v2.5, ~0,5 crédito/caractere). ~**2.300+ clipes** mp3
  atômicos (uma frase = um clipe). Vozes: Bia (PT), Ana/Diego (ES rioplatense). O gerador é
  idempotente no **texto** (regenera só o clipe cujo texto mudou).

## 7. Navegação / UI
- Home com **cards roláveis por nível e episódio**, cada card com uma "foto" temática,
  expandindo para as partes + o quiz do episódio.

## 8. Status atual
Curso **completo e no ar** (66 partes + 22 quizzes + 3 provas). PWA instalável (iOS/Android
via "Adicionar à Tela de Início"), áudio nativo premium, navegação em cards.

## 9. Pontos em aberto / onde queremos evoluir
- **Identidade visual das imagens:** as fotos atuais (pintura "golden hour") ficaram
  datadas; queremos uma estética mais "instagramável" 2026.
- **Monetização / App Store:** transformar este e outros PWAs do casal em apps de loja,
  mirando o público de um **influenciador de viagem/lifestyle** (~108K seguidores,
  posicionamento LGBTQIAPN+).
- **Framing inclusivo:** hoje o app pressupõe um casal hétero específico; para escalar a
  outros públicos, parametrizar perfis/pronomes/exemplos.
- **Retenção/gamificação, repetição espaçada automática e feedback de pronúncia**
  (reconhecimento de fala) são candidatos naturais.

## 10. Perguntas para a análise
1. Como **monetizar e levar à App Store/Play** com o mínimo de retrabalho a partir de PWAs
   SvelteKit estáticos?
2. Que **mecânicas de retenção/engajamento** fariam sentido para um áudio-curso de
   casal/viagem?
3. Como **adaptar o produto** para vender ao público de um influenciador de viagem (incl.
   inclusão de configurações além do casal hétero)?
4. Riscos/limitações da abordagem (áudio gerado por IA, conteúdo estático, sem backend) e
   como mitigar ao escalar.
