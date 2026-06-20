# Hablá — plano de evolução do produto, distribuição e escala

> **Análise externa** gerada pelo ChatGPT (20/jun/2026) a partir do `SOBRE-O-PROJETO.md`
> e do repositório público. Guardada aqui como referência para a futura fase de
> "produtizar". **Nota:** a seção 2.2 ("app pode estar incompleto") foi um mal-entendido —
> o ChatGPT confundiu o sistema legado de transcrição (`lessons`/`/licao`, já removido)
> com o curso de áudio real (`episodes.ts`), que está completo (66 partes + 22 quizzes +
> 3 provas). Os preços e prazos são hipóteses para testar, não números definitivos.

**Data:** 20 de junho de 2026
**Escopo:** recomendação de produto, pedagogia, UX, monetização, arquitetura, App Store/Google Play, privacidade e go-to-market.

---

## 1. Tese executiva
O Hablá tem um ativo raro: não é um curso genérico de espanhol transformado em app. Combina três diferenciais que fazem sentido juntos:
1. **Espanhol rioplatense real**, com voseo, pragmática local e interferências específicas do brasileiro;
2. **Áudio-first orientado à produção oral**, em vez de exercícios predominantemente textuais;
3. **Contexto de viagem e vida real**, que dá ao aluno uma razão imediata para estudar.

A oportunidade não é competir com Duolingo/Babbel/Busuu pela promessa de "aprender espanhol". É resolver uma dor específica:
> "Quero chegar ao Uruguai ou à Argentina falando o suficiente para viver a viagem com autonomia, naturalidade e menos portunhol."

A evolução recomendada não é "adicionar gamificação, IA e App Store" de uma vez. É converter o curso de uma biblioteca excelente de conteúdo em um **produto com loop diário, valor comercial claro e camada mínima de confiança**.

### Decisões recomendadas
- **Produto inicial para venda:** uma jornada curta e concreta — **Passaporte Rio da Prata / 7 dias para chegar falando**.
- **Curso de 66 partes:** manter como ativo premium e caminho de continuidade, não como única porta de entrada.
- **Receita inicial:** compra avulsa web; pacote individual e pacote dupla/companhia de viagem.
- **Assinatura:** não lançar para financiar conteúdo finito; só criar quando houver valor contínuo real (revisão adaptativa, novos cenários, feedback de fala, conteúdo de destino).
- **Lojas:** usar **Capacitor** como caminho canônico (iOS + Android). Não submeter WebView que só abre o GitHub Pages.
- **Android:** TWA é viável como teste técnico, mas Capacitor evita dois modelos e facilita compra/push/gravação/offline.
- **Backend:** desnecessário no protótipo pessoal; obrigatório antes de cobrar, proteger premium, sincronizar dispositivos e operar compras de loja.
- **Pronúncia:** primeiro gravação + comparação guiada; depois reconhecimento como apoio; só numa 3ª etapa feedback fonético calibrado.
- **"Modo casal":** preservar, mas reposicionar como **Modo Companhia de Viagem / Travel Party**, opcional e sem pressupor relação/gênero/configuração.

---

## 2. Diagnóstico

### 2.1. Pontos fortes a preservar
- **Voseo como produto, não rodapé.**
- **Separação rigorosa instrução PT-BR × modelo nativo ES** (qualidade difícil de replicar).
- **Clipe atômico + conteúdo declarativo** (base certa para player adaptativo, SRS, revisão por microhabilidade).
- **Dois contextos de consumo** (Estudo e Carro) — produtos de uso distintos.
- **Conteúdo situacional** (restaurante, hotel, farmácia, transporte) — vendável para viajante.

### 2.2. Inconsistência pública a resolver antes de vender
(*Ver nota no topo: parte disso foi mal-entendido sobre o `lessons` legado.*) Mesmo assim, vale a auditoria de release:
1. `content-status.json` gerado automaticamente (parte, quiz, prova, duração, nº de clipes, status de revisão, status de publicação).
2. Build falhar se item "publicado" não tiver áudio/rota/metadados/arte/teste.
3. Separar "outline planejado", "em produção" e "liberado".
4. Catálogo comercial com promessas verificáveis.
5. Tirar de páginas públicas texto que descreva como pronto o que não está acessível.

---

## 3. Reposicionamento
**Posicionamento:** "O espanhol rioplatense que faz o brasileiro falar antes de viajar — em voz alta, no ritmo da vida real."

**Segmentos por necessidade, não identidade** (onboarding pergunta situação/objetivo):
- Viagem iminente (≤60 dias) → trilha curta sobrevivência + fluidez.
- Viagem recorrente → revisão contínua + cultura + naturalidade.
- Estadia longa/mudança → curso completo + serviços + burocracia.
- Companhia de viagem → perfis separados + desafios compartilhados.
- Aprendiz independente → percurso completo por nível/objetivo.

**Modo Companhia de Viagem:** camada social pequena, opt-in (2+ perfis numa viagem, meta conjunta, checklist compartilhável opcional, convite por link/código, sem compartilhamento automático de progresso detalhado). Inclusão objetiva: exemplos alternam nomes/gêneros/contextos sem destacar identidades; UI aceita nomes livres e pronomes opcionais.

---

## 4. Evolução pedagógica: de episódios fixos a domínio mensurável
- **Organizar por "can-do"** (estilo CEFR, sem alegar certificação): cada episódio declara o que ensina, o que revisa e a evidência mínima de domínio.
- **Trocar "episódio concluído" por estados de domínio** por **frase/microhabilidade**: `novo → praticado → lembrado com apoio → recuperado sem apoio → consolidado → revisão vencida → reativado`. Cada item com metadados (texto-alvo, variante rioplatense, prompt PT, áudio, contextos, can-dos, dificuldade, armadilha PT-ES, foco de pronúncia, última prática, próxima revisão, qualidade da recuperação). Começar simples (não precisa de FSRS no 1º incremento).
- **Sessão diária dinâmica:** chegada (frase conhecida) → revisão vencida → 3–5 frases novas → recombinação → produção sem apoio (10–20s) → fecho. Revisão tem prioridade sobre ordem cronológica.
- **Avaliação sem falsa precisão** (pronúncia em camadas): gravar+comparar → ASR como apoio → feedback explícito calibrado. **Não** lançar "score de sotaque". Validar es-AR/es-UY nos navegadores, corpus consentido, comparar com revisores nativos, medir falso pos/neg, deixar claro retenção do áudio.
- **QA pedagógico/linguístico** por item (AR/UY, registro, alternativa com tú, risco de mal-entendido, responsável/data, direitos de voz, segurança em saúde/farmácia/documentos). Saúde ensina comunicação/encaminhamento, não instrução médica.

---

## 5. UX e retenção (sem virar caça-níquel de streak)
- **Loop:** situação real próxima → microprática 8–15 min → fala em voz alta → sensação de preparo → revisão agendada → cenário dominado → próxima situação.
- **Métrica norte:** *sessões semanais com produção oral significativa e cenários recuperados sem apoio* (não "minutos" nem "streak").
- **Mecânicas boas:** Missão de hoje; contagem regressiva de viagem; "Revisar agora"; checklist de autonomia por cenário; desafio com companhia (opt-in, sem ranking); recap semanal; coleções offline salváveis.
- **Evitar:** streak punitivo, moedas/baús, ranking entre perfis, notificação genérica de culpa, desbloqueio artificial do que já foi comprado, chamar exercício curto de "fluência".
- **Home** começa com decisão útil (`Continuar missão / Revisar o que vence hoje / Preparar viagem / Explorar curso completo`); biblioteca por nível vira navegação secundária.

---

## 6. Identidade visual: "Editorial Rio da Prata contemporâneo"
Sair do "golden hour ilustrado". Fotografia documental/editorial com textura real (cidade, mesa, transporte, fachada, mercado); luz natural; mapas/bilhetes/cardápios/azulejos/couro/papel como texturas; tipografia forte com espaço negativo; ilustração só para explicar ação/gramática; pessoas com diversidade natural sem estereótipo de casal; imagens geradas com disciplina (sem texto falso/placa ilegível/logo acidental/rosto não revisado).
Paleta: marrom/vinho profundo; azul-prata; verde mate contido; creme de papel; laranja sinalização só como acento.
Sistema visual por episódio: `tema → cenário → textura → ícone funcional → cor de contexto`.

---

## 7. Monetização
- **Erro a evitar:** assinatura só para "ter acesso às aulas" (conteúdo finito → relação frágil + exigência das lojas).
- **Escada:** Grátis (diagnóstico + 1ª missão + 1 cenário) → Entrada (**Passaporte Rio da Prata**, 7 dias) → Principal (**Hablá Integral**: curso + SRS + provas) → Dupla/Travel Party (2 licenças + preparação compartilhada) → Clube futuro (novos cenários/revisão/voz/cultura).
- **Hipóteses de preço (testar):** Passaporte R$ 49–79; Integral individual R$ 129–199; dupla 1,5–1,7×; clube R$ 19,90–29,90/mês (só após valor recorrente).
- **Influenciador:** parceria editorial ("Hablá apresentado por [criador], trilha curada para [destino]"), com contrato (uso de nome/voz/imagem, divulgação, revisão linguística, comissão/receita, UGC, transparência publicitária, suporte/reembolso/privacidade). Funil com conteúdo concreto ("As 12 frases que mudam sua chegada em Buenos Aires").

---

## 8. Arquitetura
- **Atual serve para:** protótipo, beta fechado, conteúdo grátis, validação, offline pós-1º load, sync manual entre conhecidos.
- **Não serve sozinha para:** paywall real, compra restaurável, sync multi-dispositivo, recuperação de conta, push, analytics confiável, suporte, exclusão/exportação de dados, proteção de áudio premium.
- **Alvo mínimo:** PWA estático + API/edge (auth, perfis/progresso, entitlement, agenda SRS, URLs temporárias p/ áudio premium, eventos) + banco + storage privado de mídia. Princípios: content-as-data; separar conteúdo de identidade; separar acesso de mídia (MP3 público não é protegido); offline×proteção tem tensão; migrar o `ce-state` atual.
- **Distribuição nativa:** PWA (web/beta) → TWA/Bubblewrap (teste Android) → **Capacitor** (produto comercial iOS+Android). App nativo deve entregar benefícios reais (downloads/armazenamento, gravação robusta, notificações opt-in, IAP+restauração, share nativo, áudio em segundo plano, offline explícito) — não só abrir URL remota.
- **Cobrança:** web (PIX/cartão + entitlement backend); iOS (IAP + restauração); Android (Play Billing + verificação no servidor); conta só exigida para sync/compra/social; unificar entitlements numa tabela de direitos.

---

## 9. Privacidade / IA / confiança
- **Vozes:** confirmar licença comercial do plano ElevenLabs; guardar evidência (plano/data/modelo); documentar direitos de voz; procedimento para trocar voz sem quebrar IDs; revisão humana nativa antes de lotes grandes.
- **Gravações do aluno:** local por padrão → upload só sob solicitação → explicar finalidade → retenção curta/configurável → exclusão simples. Voz é dado pessoal de alto cuidado.
- **Checklist:** política + termos, inventário de SDKs/provedores, base legal/consentimento, gestão/exclusão de conta, exportação de progresso, retenção definida, consentimento de microfone, Data Safety (Play) e rótulos (App Store) consistentes, plano de incidente. Brasil: revisar LGPD/ANPD antes de gravação em nuvem e segmentação.

---

## 10. Métricas e experimentos
- **Eventos mínimos:** landing/waitlist/onboarding/goal/trip_date/lesson started+completed/first_spoken_prompt/review due+completed/download/recording (kept_local | sent_for_feedback)/purchase started+completed+restored/support/account_deleted. Não coletar conteúdo de gravação, transcrição ou localização em analytics geral.
- **Funil:** aquisição (entende que é rioplatense de viagem?) → ativação (1ª fala em voz alta) → engajamento (2ª sessão) → aprendizagem (recupera com menos apoio) → conversão (cenário grátis deixa clara a razão de pagar) → retenção comercial (valor depois/antes da viagem).
- **Experimentos prioritários:** framing; porta de entrada (aula vs missão de 5 min); onboarding (pedir data de viagem?); oferta (Passaporte vs Integral); social; notificação (cenário vencido vs genérica); visual (editorial vs ilustração). Um teste por vez, com hipótese/métrica/decisão pré-definidas.

---

## 11. Sequenciamento por gates
- **Gate A — Verdade do produto:** auditoria de conteúdo/código; status gerado por item; revisão de áudio/texto de alto valor; corrigir docs públicas; uma trilha curta polida; nova proposta de valor + landing.
- **Gate B — Loop de aprendizagem:** SRS por frase; tela "Revisar agora"; onboarding por objetivo; Missão de Hoje; estado de domínio; analytics mínimo + política; gravação local opcional.
- **Gate C — Beta comercial web:** conta opcional; entitlement backend; checkout web; produto de entrada; pacote dupla; suporte/reembolso/termos; coorte fechada; processo de feedback.
- **Gate D — Lojas nativas:** Capacitor; downloads offline; StoreKit/Play Billing; restauração; teste fechado iOS/Android; privacidade/Data Safety/notas; features nativas visíveis ao revisor; suporte.
- **Gate E — Escala/portfólio:** CMS/editorial; catálogo multi-curso; componentes reutilizáveis (player/SRS/entitlement/Travel Party); painel de qualidade de áudio; governança para influenciadores/coautores; novos destinos sem clonar apps.

---

## 12. Riscos principais (resumo)
Curso finito vendido como assinatura → compra avulsa primeiro. Áudio premium público → mídia privada + URLs temporárias. App visto como site empacotado → Capacitor + offline/gravação/compra/push. ASR erra com sotaque → usar como apoio, validar, não prometer nota. Conteúdo ≠ promessa → catálogo verificável + QA + release notes. Dados de voz → local-first/consentimento/retenção/exclusão. Inclusão como estética → segmentação por objetivo + exemplos diversos + Travel Party opt-in. Escopo excessivo → gates. Imagens inconsistentes → direção de arte + sistema visual. Dependência de fornecedor de voz → manifest + versão + backup + plano de troca.

---

## 13. Decisão final em uma frase
**Transformar o Hablá de um curso completo para um produto de autonomia em viagem: uma entrada curta e vendável, um núcleo pedagógico adaptativo e um curso premium que cresce com conta, confiança e distribuição nativa.**

---

## 14. Fontes citadas pelo ChatGPT
Apple App Review Guidelines · Google Android (TWA, Play Billing) · Capacitor docs · CEFR Companion Volume · Cepeda et al. (2006) e Karpicke & Roediger (2008) (prática distribuída / recuperação ativa) · Ngo, Chen & Lai (2024) meta-análise de ASR em pronúncia · MDN Web Speech API · ElevenLabs Help Center (licença comercial) · LGPD/ANPD.

> Políticas de lojas/fornecedores mudam com frequência — revalidar distribuição, cobrança e privacidade antes de cada submissão.
