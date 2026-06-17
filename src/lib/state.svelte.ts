// Estado do app: perfil atual (casal) + lições concluídas por perfil.
// Persiste em localStorage com namespace `ce-` pra não colidir com os outros
// PWAs que vivem no mesmo domínio (aleapc.github.io).

const KEY = 'ce-state';

export type Profile = 'ale' | 'dea';

export const PROFILES: { id: Profile; nome: string; emoji: string }[] = [
  { id: 'ale', nome: 'Alexandre', emoji: '🧉' },
  { id: 'dea', nome: 'Andréia', emoji: '🌺' }
];

interface Persisted {
  current: Profile;
  done: Record<Profile, string[]>;
}

function load(): Persisted {
  const fallback: Persisted = { current: 'ale', done: { ale: [], dea: [] } };
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return fallback;
    const p = JSON.parse(raw);
    return {
      current: p.current === 'dea' ? 'dea' : 'ale',
      done: { ale: p.done?.ale ?? [], dea: p.done?.dea ?? [] }
    };
  } catch {
    return fallback;
  }
}

export const store = $state<Persisted>(load());

function save() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(store));
  }
}

export function setProfile(p: Profile) {
  store.current = p;
  save();
}

export function isDone(id: string, p: Profile = store.current): boolean {
  return store.done[p].includes(id);
}

export function markDone(id: string, p: Profile = store.current) {
  if (!store.done[p].includes(id)) {
    store.done[p].push(id);
    save();
  }
}

export function toggleDone(id: string, p: Profile = store.current) {
  const arr = store.done[p];
  const i = arr.indexOf(id);
  if (i >= 0) arr.splice(i, 1);
  else arr.push(id);
  save();
}

export function countDone(p: Profile): number {
  return store.done[p].length;
}

// --- Sincronização de casal (união idempotente, sem servidor) ---
export interface SyncData {
  ale: string[];
  dea: string[];
}

export function exportSyncData(): SyncData {
  return { ale: [...store.done.ale], dea: [...store.done.dea] };
}

export function mergeFromPeer(data: SyncData): { ale: number; dea: number } {
  const added = { ale: 0, dea: 0 };
  (['ale', 'dea'] as Profile[]).forEach((p) => {
    for (const id of data[p] ?? []) {
      if (!store.done[p].includes(id)) {
        store.done[p].push(id);
        added[p]++;
      }
    }
  });
  save();
  return added;
}
