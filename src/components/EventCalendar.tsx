import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import type { ClubEvent } from '../content/types';
import { cn } from '../lib/cn';
import { useMediaQuery } from '../lib/hooks';
import { eventDateKey, eventStart, formatLongDate, formatTimeRange, pad, todayKey } from '../lib/time';
import { SampleBadge } from './Buttons';
import { DateBlock } from './Cards';
import { EmptyState } from './Section';
import { ChevronLeft, ChevronRight, ClockIcon, PinIcon } from './Icons';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const monthLabel = (y: number, m: number) =>
  new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m, 1)));

const timeOnly = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Los_Angeles' });

/**
 * Events calendar with two views:
 *  - Month: a grid with month navigation (default on larger screens)
 *  - Agenda: a simple list of upcoming events (default on phones)
 */
export function EventCalendar({ events, upcoming }: { events: ClubEvent[]; upcoming: ClubEvent[] }) {
  const isWide = useMediaQuery('(min-width: 768px)');
  const [viewChoice, setViewChoice] = useState<'month' | 'agenda' | null>(null);
  const view = viewChoice ?? (isWide ? 'month' : 'agenda');

  const today = todayKey();
  const [ym, setYm] = useState(() => ({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 }));

  const byDay = useMemo(() => {
    const map = new Map<string, ClubEvent[]>();
    for (const e of [...events].sort((a, b) => a.start.localeCompare(b.start))) {
      const k = eventDateKey(e);
      map.set(k, [...(map.get(k) ?? []), e]);
    }
    return map;
  }, [events]);

  const shiftMonth = (delta: number) =>
    setYm(({ y, m }) => {
      const d = new Date(Date.UTC(y, m + delta, 1));
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
    });

  const tab = (v: 'month' | 'agenda', label: string) => (
    <button
      type="button"
      aria-pressed={view === v}
      onClick={() => setViewChoice(v)}
      className={cn(
        'rounded-full px-4 py-2 font-display text-sm font-bold transition-colors',
        view === v ? 'bg-brand text-white' : 'text-navy hover:text-brand',
      )}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-full border border-line bg-white p-1" role="group" aria-label="Calendar view">
          {tab('agenda', 'Agenda')}
          {tab('month', 'Month')}
        </div>
        <p className="text-sm text-muted">All times are Pacific Time (San Diego).</p>
      </div>

      {view === 'agenda' ? (
        <Agenda upcoming={upcoming} />
      ) : (
        <MonthGrid y={ym.y} m={ym.m} today={today} byDay={byDay} onShift={shiftMonth} onToday={() => setYm({ y: Number(today.slice(0, 4)), m: Number(today.slice(5, 7)) - 1 })} />
      )}
    </div>
  );
}

function MonthGrid({
  y,
  m,
  today,
  byDay,
  onShift,
  onToday,
}: {
  y: number;
  m: number;
  today: string;
  byDay: Map<string, ClubEvent[]>;
  onShift: (delta: number) => void;
  onToday: () => void;
}) {
  const firstWeekday = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);
  const weeks = Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7));
  const label = monthLabel(y, m);
  const monthPrefix = `${y}-${pad(m + 1)}`;
  const eventsThisMonth = [...byDay.keys()].filter((k) => k.startsWith(monthPrefix)).length;

  const navBtn = 'inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy hover:border-brand hover:text-brand';

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
        <h3 className="text-2xl font-extrabold text-navy" aria-live="polite">
          {label}
        </h3>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => onShift(-1)} className={navBtn}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous month</span>
          </button>
          <button
            type="button"
            onClick={onToday}
            className="h-10 rounded-full border border-line bg-white px-4 font-display text-sm font-bold text-navy hover:border-brand hover:text-brand"
          >
            Today
          </button>
          <button type="button" onClick={() => onShift(1)} className={navBtn}>
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next month</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] table-fixed border-collapse">
          <caption className="sr-only">
            Events in {label}: {eventsThisMonth === 0 ? 'none scheduled' : `${eventsThisMonth} day(s) with events`}
          </caption>
          <thead>
            <tr>
              {WEEKDAYS.map((d, i) => (
                <th key={d} scope="col" className="bg-tint py-2 text-xs font-bold tracking-wider text-muted uppercase">
                  <abbr title={WEEKDAYS_LONG[i]} className="no-underline">
                    {d}
                  </abbr>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => {
                  if (day === null) return <td key={di} className="h-28 border-t border-l border-line/60 bg-tint/40 first:border-l-0" />;
                  const key = `${monthPrefix}-${pad(day)}`;
                  const list = byDay.get(key) ?? [];
                  const isToday = key === today;
                  const isPast = key < today;
                  return (
                    <td key={di} className="h-28 border-t border-l border-line/60 p-1.5 align-top first:border-l-0">
                      <span
                        className={cn(
                          'inline-flex h-7 min-w-7 items-center justify-center rounded-full px-1 text-sm font-semibold',
                          isToday ? 'bg-brand text-white' : isPast ? 'text-muted' : 'text-navy',
                        )}
                      >
                        {day}
                        {isToday && <span className="sr-only"> (today)</span>}
                      </span>
                      <ul className="mt-1 space-y-1">
                        {list.map((e) => (
                          <li key={e.slug}>
                            <Link
                              to={`/events/${e.slug}`}
                              className={cn(
                                'block rounded-lg px-2 py-1 text-xs leading-snug font-semibold no-underline',
                                isPast ? 'bg-tint text-muted hover:text-brand' : 'bg-brand/10 text-brand-dark hover:bg-brand hover:text-white',
                              )}
                            >
                              <span className="block opacity-80">{timeOnly.format(eventStart(e))}</span>
                              <span className="line-clamp-2">{e.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Agenda({ upcoming }: { upcoming: ClubEvent[] }) {
  if (!upcoming.length) return <EmptyState>No upcoming events are posted yet — check back soon.</EmptyState>;

  const groups = new Map<string, ClubEvent[]>();
  for (const e of upcoming) {
    const k = e.start.slice(0, 7);
    groups.set(k, [...(groups.get(k) ?? []), e]);
  }

  return (
    <div className="space-y-10">
      {[...groups].map(([k, list]) => (
        <section key={k} aria-labelledby={`agenda-${k}`}>
          <h3 id={`agenda-${k}`} className="mb-4 font-display text-lg font-bold text-muted">
            {monthLabel(Number(k.slice(0, 4)), Number(k.slice(5, 7)) - 1)}
          </h3>
          <ul className="space-y-3">
            {list.map((e) => (
              <li key={e.slug}>
                <article className="group relative flex gap-4 rounded-3xl border border-line bg-white p-4 transition-shadow hover:shadow-lg sm:gap-6 sm:p-5">
                  <DateBlock event={e} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-teal-dark">
                      <time dateTime={eventStart(e).toISOString()}>{formatLongDate(eventStart(e))}</time>
                    </p>
                    <h4 className="text-lg leading-snug font-bold">
                      <Link to={`/events/${e.slug}`} className="text-navy no-underline after:absolute after:inset-0 group-hover:text-brand">
                        {e.title}
                      </Link>
                    </h4>
                    <ul className="mt-2 flex flex-col gap-1 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-5">
                      <li className="flex items-start gap-1.5">
                        <ClockIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        {formatTimeRange(e)}
                      </li>
                      <li className="flex items-start gap-1.5">
                        <PinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        {e.location}
                      </li>
                    </ul>
                    {e.sample && <SampleBadge className="mt-3" />}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
