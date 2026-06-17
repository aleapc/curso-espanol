# Curso de Español 🌎

PWA de espanhol latino-americano pro casal (Alexandre + Andréia). Offline-first,
com áudio premium (ElevenLabs) + voz do navegador, exercícios e sync de casal por
código de WhatsApp. Mesmo padrão dos outros PWAs (SvelteKit 2 + Svelte 5 + Tailwind
+ adapter-static, deploy no GitHub Pages).

## Rodar local

```bash
npm install
npm run dev      # http://localhost:5173
```

## Áudio (ElevenLabs)

1. Crie uma API key no ElevenLabs (Settings → API Keys) e cole no arquivo `.env`:
   ```
   ELEVENLABS_API_KEY=sk_xxx
   ```
2. Escolha as vozes latino-americanas (por ouvido, no site):
   ```bash
   npm run audio:list          # lista as vozes da conta com os IDs
   ```
   Ponha os IDs escolhidos em `audio.config.json` (narrador / Ana / Diego).
3. Gere os mp3 (idempotente — só gera o que falta):
   ```bash
   npm run audio
   ```
   Os arquivos vão pra `static/audio/<key>.mp3` e o app passa a tocá-los.
   Sem mp3, o app usa a voz do navegador automaticamente (grátis).

- Modelo: **Flash v2.5** (~0,5 crédito por caractere).
- As "frases-chave", o diálogo e a escuta usam áudio premium; o vocabulário avulso
  usa a voz do navegador (toque no 🔊).

## Arquitetura de conteúdo

- `src/lib/types.ts` — tipos (Lesson, Exercise, etc.).
- `src/lib/course/` — lições (uma por arquivo) + `index.ts` (registro + `outline` do curso completo).
- `scripts/audio-jobs.json` — lista de áudios premium a gerar (key + voz + texto).
- `src/lib/state.svelte.ts` — perfil do casal + progresso (localStorage `ce-`).
- `src/lib/sync.ts` — sync de casal (prefixo `CE1.`, união idempotente).

## Deploy (GitHub Pages)

```powershell
.\deploy.ps1     # build com BASE_PATH=/curso-espanol e push pra branch gh-pages
```
Publica em `https://aleapc.github.io/curso-espanol/`.
> Precisa do repo git já criado e da branch `gh-pages`. Por causa do Norton,
> o `.git` fica fora de `D:\dev` (worktree no `%LOCALAPPDATA%`), igual aos outros PWAs.
> Falta gerar os ícones PNG (192/512) em `static/` antes do primeiro deploy.
