/**
 * Date/time helpers. All event times are stored as San Diego local time
 * ("YYYY-MM-DDTHH:mm") and displayed in America/Los_Angeles regardless of
 * the visitor's own time zone.
 */
import type { ClubEvent } from '../content/types';

export const EVENT_TZ = 'America/Los_Angeles';

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: EVENT_TZ,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

function zoneParts(date: Date) {
  const p: Record<string, number> = {};
  for (const { type, value } of partsFormatter.formatToParts(date)) {
    if (type !== 'literal') p[type] = Number(value);
  }
  return p as { year: number; month: number; day: number; hour: number; minute: number; second: number };
}

/** Offset (ms) of the event time zone from UTC at a given instant. */
function tzOffset(ts: number) {
  const p = zoneParts(new Date(ts));
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour % 24, p.minute, p.second);
  return asUtc - Math.floor(ts / 1000) * 1000;
}

/** Convert "YYYY-MM-DDTHH:mm" in San Diego time to a real instant. */
export function laToDate(local: string): Date {
  const [d, t = '00:00'] = local.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [hh, mm] = t.split(':').map(Number);
  const guess = Date.UTC(y, m - 1, day, hh, mm);
  let utc = guess - tzOffset(guess);
  const second = tzOffset(utc);
  if (guess - second !== utc) utc = guess - second;
  return new Date(utc);
}

export function eventStart(e: ClubEvent) {
  return laToDate(e.start);
}

export function eventEnd(e: ClubEvent) {
  return e.end ? laToDate(e.end) : new Date(laToDate(e.start).getTime() + 60 * 60 * 1000);
}

/** The local date key ("YYYY-MM-DD") of an event's start. */
export function eventDateKey(e: ClubEvent) {
  return e.start.slice(0, 10);
}

/** Today's date in San Diego as "YYYY-MM-DD". */
export function todayKey(now = new Date()) {
  const p = zoneParts(now);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}`;
}

export function pad(n: number) {
  return String(n).padStart(2, '0');
}

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { timeZone: EVENT_TZ, ...opts });

const longDate = fmt({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const shortDate = fmt({ weekday: 'short', month: 'short', day: 'numeric' });
const monthShort = fmt({ month: 'short' });
const dayNum = fmt({ day: 'numeric' });
const timeFmt = fmt({ hour: 'numeric', minute: '2-digit' });
const tzName = fmt({ timeZoneName: 'short' });

export const formatLongDate = (d: Date) => longDate.format(d);
export const formatShortDate = (d: Date) => shortDate.format(d);
export const formatMonthShort = (d: Date) => monthShort.format(d);
export const formatDayNum = (d: Date) => dayNum.format(d);

/** e.g. "6:00 – 7:30 PM PDT" */
export function formatTimeRange(e: ClubEvent) {
  const s = eventStart(e);
  const end = eventEnd(e);
  const zone = tzName.formatToParts(s).find((p) => p.type === 'timeZoneName')?.value ?? 'PT';
  return `${timeFmt.format(s)} – ${timeFmt.format(end)} ${zone}`;
}

/** Format an ISO date ("2026-05-14") without time-zone drift. */
export function formatIsoDate(iso: string, opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Split events into upcoming (soonest first) and past (most recent first). */
export function splitEvents(list: ClubEvent[], now = new Date()) {
  const upcoming: ClubEvent[] = [];
  const past: ClubEvent[] = [];
  for (const e of list) (eventEnd(e) >= now ? upcoming : past).push(e);
  upcoming.sort((a, b) => eventStart(a).getTime() - eventStart(b).getTime());
  past.sort((a, b) => eventStart(b).getTime() - eventStart(a).getTime());
  return { upcoming, past };
}
