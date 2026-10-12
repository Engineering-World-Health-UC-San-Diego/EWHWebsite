import type { PhotoEntry } from './types.ts';

/**
 * PHOTO LIBRARY
 *
 * Every image on the site is referenced by one of these ids. To swap a
 * photo everywhere, change its `file`. To add a new photo:
 *   1. Put the image file in the repository root or in the /photos folder.
 *   2. Add an entry below with a new id, the file name, and alt text that
 *      describes what the photo shows.
 *   3. Use the id in hero.photos, a project's coverPhoto, an event's
 *      gallery, etc.
 *
 * Note: the six provided photos are outdoor landscape scenes. They are used
 * as decorative imagery and are not tied to any specific club event or
 * project. Replace them with club photos when available.
 */
export const photos = {
  'valley-river': {
    file: 'img1.jpeg',
    alt: 'Granite cliffs rising above a pine forest and a clear, rocky river under a deep blue sky',
    caption: 'Granite cliffs above a forested river valley',
    focus: '50% 45%',
  },
  'hilltop-arms-raised': {
    file: 'img2.jpeg',
    alt: 'A person standing on a grassy hilltop with arms raised, looking out over forested hills under a cloudy sky',
    caption: 'Arms raised on a grassy hilltop',
    focus: '70% 50%',
  },
  'lakeside-tent-sunrise': {
    file: 'img3.jpeg',
    alt: 'An orange tent pitched among granite boulders and pine trees above a lake as the sun rises',
    caption: 'A tent above a lake at sunrise',
    focus: '50% 60%',
  },
  'ridge-picnic-table': {
    file: 'img4.jpeg',
    alt: 'A weathered wooden picnic table and benches on a grassy ridge overlooking distant mountains',
    caption: 'A picnic table on a mountain ridge',
    focus: '45% 65%',
  },
  'mountain-sunset': {
    file: 'img5.jpeg',
    alt: 'A snow-dusted mountain range under a vivid pink and orange sunset sky',
    caption: 'Mountains under a pink sunset',
    focus: '50% 40%',
  },
  'tent-with-dog': {
    file: 'img6.jpeg',
    alt: 'A person and a dog setting up a yellow tent in golden grass, with mountains and a low sun behind them',
    caption: 'Setting up a tent in golden grass',
    focus: '50% 55%',
  },
} satisfies Record<string, PhotoEntry>;

export type PhotoKey = keyof typeof photos;

/**
 * HOMEPAGE HERO COLLAGE
 *
 * `photos` is the pool of images the collage draws from. The first
 * `visibleCount` (up to 6) are shown at once; any extras slowly rotate in.
 * Add more ids here and they join the rotation automatically.
 */
export const heroCollage = {
  photos: [
    'hilltop-arms-raised',
    'lakeside-tent-sunrise',
    'tent-with-dog',
    'valley-river',
    'mountain-sunset',
    'ridge-picnic-table',
  ] as PhotoKey[],
  /** How many snapshots are on screen at once on desktop (4–6). */
  visibleCount: 5,
  /** Seconds between photo swaps when the pool has more photos than slots. */
  cycleSeconds: 5,
};
