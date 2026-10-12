/**
 * "Add to calendar" helpers. Everything runs in the browser: Google and
 * Outlook get prefilled links, and Apple Calendar / others get a .ics file
 * generated on the fly. No server needed.
 */
import type { ClubEvent } from '../content/types';
import { EVENT_TZ, eventEnd, eventStart } from './time';

/** 20261021T010000Z */
function utcStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function details(e: ClubEvent, pageUrl: string) {
  return `${e.summary}\n\nDetails: ${pageUrl}`;
}

export function googleCalendarUrl(e: ClubEvent, pageUrl: string) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${utcStamp(eventStart(e))}/${utcStamp(eventEnd(e))}`,
    details: details(e, pageUrl),
    location: e.location,
    ctz: EVENT_TZ,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function outlookCalendarUrl(e: ClubEvent, pageUrl: string) {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: e.title,
    startdt: eventStart(e).toISOString(),
    enddt: eventEnd(e).toISOString(),
    body: details(e, pageUrl),
    location: e.location,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`;
}

function icsEscape(s: string) {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1');
}

/** Fold lines longer than 75 octets, per RFC 5545. */
function fold(line: string) {
  const out: string[] = [];
  let rest = line;
  while (rest.length > 74) {
    out.push(rest.slice(0, 74));
    rest = ' ' + rest.slice(74);
  }
  out.push(rest);
  return out.join('\r\n');
}

export function buildIcs(e: ClubEvent, pageUrl: string) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Engineering World Health at UC San Diego//Website//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${e.slug}@ewh-ucsd`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(eventStart(e))}`,
    `DTEND:${utcStamp(eventEnd(e))}`,
    `SUMMARY:${icsEscape(e.title)}`,
    `LOCATION:${icsEscape(e.location)}`,
    `DESCRIPTION:${icsEscape(details(e, pageUrl))}`,
    `URL:${pageUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

export function downloadIcs(e: ClubEvent, pageUrl: string) {
  const blob = new Blob([buildIcs(e, pageUrl)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${e.slug}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
