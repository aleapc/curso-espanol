// Sincronização entre os dois celulares do casal, sem servidor: as lições
// concluídas (dos dois perfis) viram um código curto que viaja pelo WhatsApp.
// Quem recebe cola o código (ou abre o link /sync#s=...) e o app funde por
// união — trocar nos dois sentidos deixa os aparelhos iguais. Prefixo: CE1.

import { exportSyncData, mergeFromPeer, type SyncData } from './state.svelte';
import { base } from '$app/paths';

interface Payload {
  v: 1;
  a: string[];
  b: string[];
}

function b64uEncode(s: string): string {
  return btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function b64uDecode(s: string): string {
  return decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))));
}

export function encodeSync(): string {
  const d = exportSyncData();
  const payload: Payload = { v: 1, a: d.ale, b: d.dea };
  return 'CE1.' + b64uEncode(JSON.stringify(payload));
}

export function decodeSync(code: string): SyncData | null {
  try {
    const m = code.trim().match(/CE1\.([A-Za-z0-9_-]+)/);
    if (!m) return null;
    const p = JSON.parse(b64uDecode(m[1])) as Payload;
    if (p.v !== 1 || !Array.isArray(p.a)) return null;
    return { ale: p.a, dea: p.b ?? [] };
  } catch {
    return null;
  }
}

/** Decodifica e funde. Retorna o que entrou de novo, ou null se o código for inválido. */
export function importSync(code: string): { ale: number; dea: number } | null {
  const data = decodeSync(code);
  if (!data) return null;
  return mergeFromPeer(data);
}

export function shareUrl(code: string): string {
  return `https://aleapc.github.io${base}/sync#s=${code}`;
}

export function whatsappUrl(code: string): string {
  const text =
    `📚 *Curso de Español* — meu progresso!\n` +
    `Abre esse link que o app junta tudo no seu celular:\n${shareUrl(code)}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
