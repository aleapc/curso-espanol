#!/usr/bin/env node
// Gera os mp3 premium do curso via ElevenLabs.
//
//   node scripts/generate-audio.mjs --list   → lista as vozes da sua conta (pra escolher por ouvido)
//   node scripts/generate-audio.mjs           → gera o que falta (idempotente: pula o que já existe)
//
// Lê a chave de .env (ELEVENLABS_API_KEY) e os IDs de voz de audio.config.json.
// Usa o modelo Flash v2.5 (~0,5 crédito por caractere).

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnv() {
  const p = join(root, '.env');
  if (!existsSync(p)) return;
  for (const raw of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (m) {
      if (process.env[m[1]] === undefined) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
      }
    } else if (line.startsWith('sk_') && process.env.ELEVENLABS_API_KEY === undefined) {
      // tolera .env com só a chave colada (sem o prefixo ELEVENLABS_API_KEY=)
      process.env.ELEVENLABS_API_KEY = line;
    }
  }
}
loadEnv();

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY || API_KEY.includes('COLE_SUA_CHAVE')) {
  console.error('\n⚠  Falta a chave. Edite .env e coloque:\n   ELEVENLABS_API_KEY=sk_xxx\n');
  process.exit(1);
}

const API = 'https://api.elevenlabs.io/v1';

function loadConfig() {
  const p = join(root, 'audio.config.json');
  if (existsSync(p)) {
    try {
      return JSON.parse(readFileSync(p, 'utf8'));
    } catch {
      /* usa default */
    }
  }
  return {};
}
const CFG = loadConfig();
const MODEL = CFG.model || 'eleven_flash_v2_5';
const PER_CHAR = /flash|turbo/.test(MODEL) ? 0.5 : 1;

// Vozes PT-BR (narração) são "expressivas" e oscilam de ritmo com estabilidade baixa.
// Damos mais estabilidade + velocidade fixa só pra elas; o espanhol fica como está.
const PT_VOICES = new Set(['Bia', 'Eduardo', 'narrador']);
const ES_SETTINGS = { stability: 0.5, similarity_boost: 0.85, style: 0, use_speaker_boost: true };
const PT_SETTINGS = { stability: 0.8, similarity_boost: 0.9, style: 0, use_speaker_boost: true, speed: 1.0 };
function settingsFor(voz) {
  return PT_VOICES.has(voz) ? PT_SETTINGS : ES_SETTINGS;
}

async function listVoices() {
  const r = await fetch(`${API}/voices`, { headers: { 'xi-api-key': API_KEY } });
  if (!r.ok) {
    console.error(r.status, await r.text());
    process.exit(1);
  }
  const j = await r.json();
  const voices = j.voices || [];
  console.log(`\n${voices.length} vozes disponíveis na sua conta:\n`);
  for (const v of voices) {
    const l = v.labels || {};
    const tag = [l.language, l.accent, l.gender, l.descriptive].filter(Boolean).join(' · ');
    console.log(`  ${String(v.name).padEnd(22)} ${v.voice_id}   ${tag}`);
  }
  console.log('\nOuça no site, escolha as latino-americanas e ponha os IDs em audio.config.json');
  console.log('(narrador = frases-chave, Ana = voz feminina do diálogo, Diego = voz masculina).\n');
}

async function findVoices(lang, preferRe) {
  const r = await fetch(`${API}/shared-voices?page_size=100&language=${lang}`, {
    headers: { 'xi-api-key': API_KEY }
  });
  if (!r.ok) {
    console.error(r.status, await r.text());
    process.exit(1);
  }
  const j = await r.json();
  const list = j.voices || [];
  const score = (v) => {
    const s = `${v.name} ${v.accent || ''} ${v.description || ''} ${v.descriptive || ''}`.toLowerCase();
    return preferRe && preferRe.test(s) ? 0 : 1; // sotaque preferido primeiro
  };
  list.sort((a, b) => score(a) - score(b) || (a.cloned_by_count > b.cloned_by_count ? -1 : 1));
  console.log(`\n${list.length} vozes (${lang}) na biblioteca pública:\n`);
  for (const v of list.slice(0, 30)) {
    const tag = [v.accent, v.gender, v.age, v.descriptive].filter(Boolean).join(' · ');
    console.log(`  ${String(v.name).padEnd(26)} ${tag}\n      id:${v.voice_id}`);
  }
  console.log('\nNo site (Voice Library) busque pelo nome, ouça e clique "Add" nas que curtir.');
}

async function balance() {
  const r = await fetch(`${API}/user/subscription`, { headers: { 'xi-api-key': API_KEY } });
  if (!r.ok) {
    console.error(r.status, await r.text());
    process.exit(1);
  }
  const j = await r.json();
  const used = j.character_count ?? 0;
  const limit = j.character_limit ?? 0;
  const left = limit - used;
  console.log(`Créditos ElevenLabs: ${used} / ${limit} usados · restam ${left}`);
  console.log(`(em Flash, 0,5/char, isso dá ~${Math.floor(left / 0.5)} caracteres de áudio)`);
}

function loadVoiceMap() {
  const def = {
    narrador: 'FGY2WhTYpPnrIDTdsKH5', // Laura (placeholder — troque por voz LatAm)
    Ana: 'EXAVITQu4vr4xnSDxMaL', // Sarah (placeholder feminina)
    Diego: 'nPczCjzI2devNBz1zQrb' // Brian (placeholder masculina)
  };
  return { ...def, ...CFG };
}

async function tts(voiceId, text, outPath, settings = ES_SETTINGS) {
  const r = await fetch(`${API}/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'content-type': 'application/json' },
    body: JSON.stringify({
      text,
      model_id: MODEL,
      voice_settings: settings
    })
  });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  writeFileSync(outPath, Buffer.from(await r.arrayBuffer()));
  return text.length;
}

// Deriva os jobs de áudio dos episódios (src/lib/course/ep-*.json) — fonte única.
function collectJobs() {
  const dir = join(root, 'src', 'lib', 'course');
  const files = readdirSync(dir).filter((f) => /^ep-.*\.json$/.test(f));
  const jobs = [];
  const seen = new Set();
  const push = (key, voice, text) => {
    if (!key || !text || seen.has(key)) return;
    seen.add(key);
    jobs.push({ key, voice, text });
  };
  for (const f of files) {
    const ep = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    for (const s of ep.steps || []) {
      if (s.tipo === 'intro' || s.tipo === 'recap') push(s.audioKey, s.voz || 'Bia', s.pt);
      else if (s.tipo === 'ouvir' || s.tipo === 'shadow') push(s.audioKey, s.voz || 'Ana', s.es);
      else if (s.tipo === 'responde') {
        push(s.promptAudioKey, s.promptVoz || 'Bia', s.promptPt);
        push(s.audioKey, s.voz || 'Ana', s.es);
      }
    }
  }
  // Quizzes: intro em PT (Bia) + diálogo em vozes nativas. Perguntas ficam em texto.
  for (const f of readdirSync(dir).filter((x) => /^quiz-.*\.json$/.test(x))) {
    const q = JSON.parse(readFileSync(join(dir, f), 'utf8'));
    push(q.introAudioKey, 'Bia', q.introPt);
    for (const d of q.dialogo || []) push(d.audioKey, d.voz || 'Ana', d.es);
  }
  return jobs;
}

// Manifesto key→texto: deixa o gerador idempotente no TEXTO (não só na existência
// do arquivo). Se o texto de um clipe mudou (ex.: correção de portunhol), ele é
// regerado automaticamente. `--snapshot` grava o manifesto do estado atual sem
// chamar a API (assume que os mp3 atuais batem com o texto atual).
function manifestPath() {
  return join(root, 'static', 'audio', 'manifest.json');
}
function loadManifest() {
  const p = manifestPath();
  if (existsSync(p)) {
    try {
      return JSON.parse(readFileSync(p, 'utf8'));
    } catch {
      /* recomeça */
    }
  }
  return {};
}

function snapshot() {
  const jobs = collectJobs();
  const outDir = join(root, 'static', 'audio');
  const man = {};
  let n = 0;
  for (const job of jobs) {
    if (existsSync(join(outDir, `${job.key}.mp3`))) {
      man[job.key] = job.text;
      n++;
    }
  }
  writeFileSync(manifestPath(), JSON.stringify(man, null, 0));
  console.log(`Snapshot: ${n} clipes registrados no manifesto (baseline).`);
}

async function generate() {
  const jobs = collectJobs();
  const voices = loadVoiceMap();
  const outDir = join(root, 'static', 'audio');
  mkdirSync(outDir, { recursive: true });
  const man = loadManifest();

  let made = 0;
  let regen = 0;
  let skipped = 0;
  let chars = 0;
  for (const job of jobs) {
    const out = join(outDir, `${job.key}.mp3`);
    const exists = existsSync(out);
    const textChanged = man[job.key] !== undefined && man[job.key] !== job.text;
    if (exists && !textChanged) {
      skipped++;
      man[job.key] = job.text;
      continue;
    }
    if (exists && textChanged) regen++;
    const voiceId = voices[job.voice] || voices.narrador;
    process.stdout.write(`→ ${job.key} (${job.voice})${textChanged ? ' [texto mudou]' : ''}: "${job.text}" ... `);
    try {
      chars += await tts(voiceId, job.text, out, settingsFor(job.voice));
      made++;
      man[job.key] = job.text;
      console.log('ok');
    } catch (e) {
      console.log('FALHOU:', e.message);
    }
  }

  const keys = readdirSync(outDir)
    .filter((f) => f.endsWith('.mp3'))
    .map((f) => f.replace(/\.mp3$/, ''));
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(keys));
  writeFileSync(manifestPath(), JSON.stringify(man, null, 0));

  console.log(`\nGerados: ${made} (novos + ${regen} regerados por mudança de texto) · já existiam: ${skipped}`);
  console.log(`Caracteres novos: ${chars} → ~${Math.ceil(chars * PER_CHAR)} créditos (${MODEL})`);
  console.log(`Índice: static/audio/index.json (${keys.length} áudios no total)`);
}

// Gera amostras de voz (mesma frase em várias vozes) pra escolher de ouvido.
// Lê scripts/voice-samples.json → static/samples/<key>.mp3
async function genSamples() {
  const cfgS = JSON.parse(readFileSync(join(root, 'scripts', 'voice-samples.json'), 'utf8'));
  const outDir = join(root, 'static', 'samples');
  mkdirSync(outDir, { recursive: true });
  for (const v of cfgS.vozes) {
    const out = join(outDir, `${v.key}.mp3`);
    if (existsSync(out)) {
      console.log('já existe:', v.key);
      continue;
    }
    process.stdout.write(`→ ${v.key} (${v.name}) ... `);
    try {
      await tts(v.voiceId, cfgS.text, out, PT_SETTINGS);
      console.log('ok');
    } catch (e) {
      console.log('FALHOU', e.message);
    }
  }
  console.log('Amostras em static/samples/');
}

if (process.argv.includes('--balance')) balance();
else if (process.argv.includes('--snapshot')) snapshot();
else if (process.argv.includes('--list')) listVoices();
else if (process.argv.includes('--find-es')) findVoices('es', /argent|uruguay|rioplat|platense|porteñ/);
else if (process.argv.includes('--find-pt')) findVoices('pt', /bras|brazil/);
else if (process.argv.includes('--samples')) genSamples();
else generate();
