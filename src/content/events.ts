import type { ClubEvent } from './types.ts';

/**
 * EVENTS
 *
 * Times are local San Diego time (America/Los_Angeles), written as
 * "YYYY-MM-DDTHH:mm". The site sorts events and decides which are upcoming
 * and which are past automatically, based on today's date — you never need
 * to move an event from one list to the other.
 *
 * `summary` (one line for calendar invites) and `description` (event page
 * text) are optional. After an event happens, add a `recap` and a `gallery`
 * of photo ids to turn its page into a recap page.
 *
 * coverPhoto: an id from photos.ts. The current cover photos are decorative
 * landscape images, not photos of these events.
 */
export const events: ClubEvent[] = [
  {
    slug: 'pickleball-social-fall-2026',
    title: 'Pickleball Social',
    start: '2026-10-10T17:00',
    end: '2026-10-10T19:00',
    location: 'Muir Courts',
    coverPhoto: 'hilltop-arms-raised',
  },
  {
    slug: 'resume-workshop-fall-2026',
    title: 'Resume Workshop',
    start: '2026-10-13T18:00',
    end: '2026-10-13T19:00',
    location: 'PFBH 489',
    coverPhoto: 'ridge-picnic-table',
  },
  {
    slug: 'cultural-night-fall-2026',
    title: 'Cultural Night',
    start: '2026-11-09T18:00',
    end: '2026-11-09T20:00',
    location: 'Green Table Room',
    coverPhoto: 'mountain-sunset',
  },
];
