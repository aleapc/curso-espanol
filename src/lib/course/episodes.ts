import type { Episode } from '../types';
import epB01a from './ep-b01a.json';
import epB01b from './ep-b01b.json';
import epB01c from './ep-b01c.json';
import epB04a from './ep-b04a.json';
import epB04b from './ep-b04b.json';
import epB04c from './ep-b04c.json';
import epB05a from './ep-b05a.json';
import epB05b from './ep-b05b.json';
import epB05c from './ep-b05c.json';
import epB06a from './ep-b06a.json';
import epB06b from './ep-b06b.json';
import epB06c from './ep-b06c.json';
import epB07a from './ep-b07a.json';
import epB07b from './ep-b07b.json';
import epB07c from './ep-b07c.json';
import epB08a from './ep-b08a.json';
import epB08b from './ep-b08b.json';
import epB08c from './ep-b08c.json';
import epB09a from './ep-b09a.json';
import epB09b from './ep-b09b.json';
import epB09c from './ep-b09c.json';
import epB02a from './ep-b02a.json';
import epB02b from './ep-b02b.json';
import epB02c from './ep-b02c.json';
import epB03a from './ep-b03a.json';
import epB03b from './ep-b03b.json';
import epB03c from './ep-b03c.json';
import epI01a from './ep-i01a.json';
import epI01b from './ep-i01b.json';
import epI01c from './ep-i01c.json';
import epI02a from './ep-i02a.json';
import epI02b from './ep-i02b.json';
import epI02c from './ep-i02c.json';
import epI03a from './ep-i03a.json';
import epI03b from './ep-i03b.json';
import epI03c from './ep-i03c.json';
import epI04a from './ep-i04a.json';
import epI04b from './ep-i04b.json';
import epI04c from './ep-i04c.json';
import epI05a from './ep-i05a.json';
import epI05b from './ep-i05b.json';
import epI05c from './ep-i05c.json';
import epI06a from './ep-i06a.json';
import epI06b from './ep-i06b.json';
import epI06c from './ep-i06c.json';
import epI07a from './ep-i07a.json';
import epI07b from './ep-i07b.json';
import epI07c from './ep-i07c.json';
import epA01a from './ep-a01a.json';
import epA01b from './ep-a01b.json';
import epA01c from './ep-a01c.json';
import epA02a from './ep-a02a.json';
import epA02b from './ep-a02b.json';
import epA02c from './ep-a02c.json';
import epA03a from './ep-a03a.json';
import epA03b from './ep-a03b.json';
import epA03c from './ep-a03c.json';
import epA04a from './ep-a04a.json';
import epA04b from './ep-a04b.json';
import epA04c from './ep-a04c.json';
import epA05a from './ep-a05a.json';
import epA05b from './ep-a05b.json';
import epA05c from './ep-a05c.json';
import epA06a from './ep-a06a.json';
import epA06b from './ep-a06b.json';
import epA06c from './ep-a06c.json';

// Episódios escritos (áudio-curso). Fonte única: os arquivos ep-*.json
// (o gerador de áudio lê os mesmos para criar os clipes). Temas grandes são
// divididos em quantas partes precisar (1A, 1B, 1C…) — conteúdo manda, tempo não.
export const episodes: Episode[] = [
  epB01a as Episode,
  epB01b as Episode,
  epB01c as Episode,
  epB04a as Episode,
  epB04b as Episode,
  epB04c as Episode,
  epB05a as Episode,
  epB05b as Episode,
  epB05c as Episode,
  epB06a as Episode,
  epB06b as Episode,
  epB06c as Episode,
  epB07a as Episode,
  epB07b as Episode,
  epB07c as Episode,
  epB08a as Episode,
  epB08b as Episode,
  epB08c as Episode,
  epB09a as Episode,
  epB09b as Episode,
  epB09c as Episode,
  epB02a as Episode,
  epB02b as Episode,
  epB02c as Episode,
  epB03a as Episode,
  epB03b as Episode,
  epB03c as Episode,
  epI01a as Episode,
  epI01b as Episode,
  epI01c as Episode,
  epI02a as Episode,
  epI02b as Episode,
  epI02c as Episode,
  epI03a as Episode,
  epI03b as Episode,
  epI03c as Episode,
  epI04a as Episode,
  epI04b as Episode,
  epI04c as Episode,
  epI05a as Episode,
  epI05b as Episode,
  epI05c as Episode,
  epI06a as Episode,
  epI06b as Episode,
  epI06c as Episode,
  epI07a as Episode,
  epI07b as Episode,
  epI07c as Episode,
  epA01a as Episode,
  epA01b as Episode,
  epA01c as Episode,
  epA02a as Episode,
  epA02b as Episode,
  epA02c as Episode,
  epA03a as Episode,
  epA03b as Episode,
  epA03c as Episode,
  epA04a as Episode,
  epA04b as Episode,
  epA04c as Episode,
  epA05a as Episode,
  epA05b as Episode,
  epA05c as Episode,
  epA06a as Episode,
  epA06b as Episode,
  epA06c as Episode
];

export function getEpisodio(id: string): Episode | undefined {
  return episodes.find((e) => e.id === id);
}
