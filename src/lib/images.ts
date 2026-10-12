import { photos } from '../content/photos';
import type { PhotoEntry } from '../content/types';

/*
 * Image files are picked up from the repository root and from /photos.
 * At build time each one is converted to responsive WebP sizes
 * (vite-imagetools); the original JPEG/PNG is kept as a fallback.
 * Original files are never modified.
 * (Vite requires the glob patterns to be written out literally, hence the
 * repetition below.)
 */
const webpSrcsets = import.meta.glob<string>(
  ['/*.{jpg,jpeg,png,webp}', '/photos/*.{jpg,jpeg,png,webp}', '!/EWHUCSD_logo.*'],
  { eager: true, import: 'default', query: { format: 'webp', w: '480;960', as: 'srcset' } },
);
const originals = import.meta.glob<string>(
  ['/*.{jpg,jpeg,png,webp}', '/photos/*.{jpg,jpeg,png,webp}', '!/EWHUCSD_logo.*'],
  { eager: true, import: 'default', query: '?url' },
);

function lookup<T>(map: Record<string, T>, file: string): T | undefined {
  return map[`/${file}`] ?? map[`/photos/${file}`];
}

export interface ResolvedPhoto extends PhotoEntry {
  id: string;
  src: string;
  webpSrcset?: string;
}

const warned = new Set<string>();

/** Look up a photo by its id from content/photos.ts. */
export function getPhoto(id: string): ResolvedPhoto | undefined {
  const entry = (photos as Record<string, PhotoEntry>)[id];
  if (!entry) {
    if (import.meta.env.DEV && !warned.has(id)) {
      warned.add(id);
      console.warn(`[photos] Unknown photo id "${id}". Add it to src/content/photos.ts.`);
    }
    return undefined;
  }
  const src = lookup(originals, entry.file);
  if (!src) {
    if (import.meta.env.DEV && !warned.has(entry.file)) {
      warned.add(entry.file);
      console.warn(`[photos] File "${entry.file}" not found in the repository root or /photos.`);
    }
    return undefined;
  }
  return { ...entry, id, src, webpSrcset: lookup(webpSrcsets, entry.file) };
}
