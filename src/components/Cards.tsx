import { Link } from 'react-router';
import type { ClubEvent, Project } from '../content/types';
import { cn } from '../lib/cn';
import { eventStart, formatDayNum, formatLongDate, formatIsoDate, formatMonthShort, formatTimeRange } from '../lib/time';
import { SampleBadge } from './Buttons';
import { ArrowRight, ClockIcon, PinIcon } from './Icons';
import { Photo } from './Photo';

/** Minimal project card: photo, name, summary, academic year, status. */
export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 | 4 }) {
  const H = `h${headingLevel}` as const;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-line/80 bg-white transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(30,31,92,0.35)] focus-within:shadow-[0_20px_40px_-20px_rgba(30,31,92,0.35)]">
      <div className="relative overflow-hidden">
        <Photo id={project.coverPhoto} className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.03]" />
        {project.sample && <SampleBadge className="absolute top-3 left-3" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <StatusPill status={project.status} label={project.statusLabel} />
          <span className="text-muted">{project.academicYear}</span>
        </div>
        <H className="text-xl font-bold text-navy">
          <Link to={`/projects/${project.slug}`} className="text-navy no-underline after:absolute after:inset-0 group-hover:text-brand">
            {project.name}
          </Link>
        </H>
        <p className="mt-2 flex-1 text-muted">{project.summary}</p>
        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 font-display font-semibold text-brand">
          View project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function StatusPill({ status, label }: { status: Project['status']; label: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        status === 'current' ? 'bg-health/12 text-teal-darker' : 'bg-tint text-muted',
      )}
    >
      <span aria-hidden="true" className={cn('h-1.5 w-1.5 rounded-full', status === 'current' ? 'bg-health' : 'bg-muted')} />
      <span className="sr-only">Status: </span>
      {label}
    </span>
  );
}

/** Tear-off calendar style date block. */
export function DateBlock({ event, className }: { event: ClubEvent; className?: string }) {
  const d = eventStart(event);
  return (
    <div
      className={cn('flex w-16 shrink-0 flex-col items-center overflow-hidden rounded-2xl bg-white text-center shadow-md ring-1 ring-navy/5', className)}
      aria-hidden="true"
    >
      <span className="w-full bg-brand py-1 font-display text-xs font-bold tracking-widest text-white uppercase">
        {formatMonthShort(d)}
      </span>
      <span className="py-1.5 font-display text-2xl font-extrabold text-navy">{formatDayNum(d)}</span>
    </div>
  );
}

/** Upcoming event card with a big date and photo. */
export function EventCard({ event }: { event: ClubEvent }) {
  const d = eventStart(event);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_-18px_rgba(30,31,92,0.45)] ring-1 ring-line/70">
      <div className="relative">
        <Photo id={event.coverPhoto} className="aspect-[16/9]" />
        <DateBlock event={event} className="absolute top-4 left-4" />
        {event.sample && <SampleBadge className="absolute top-4 right-4" />}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-display text-sm font-bold text-teal-dark">
          <time dateTime={d.toISOString()}>{formatLongDate(d)}</time>
        </p>
        <h3 className="mt-1 text-xl font-bold">
          <Link to={`/events/${event.slug}`} className="text-navy no-underline after:absolute after:inset-0 group-hover:text-brand">
            {event.title}
          </Link>
        </h3>
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          <li className="flex items-start gap-2">
            <ClockIcon className="mt-0.5 h-4 w-4 shrink-0" /> {formatTimeRange(event)}
          </li>
          <li className="flex items-start gap-2">
            <PinIcon className="mt-0.5 h-4 w-4 shrink-0" /> {event.location}
          </li>
        </ul>
      </div>
    </article>
  );
}

/** Past event preview styled as a tilted snapshot. */
export function PastEventCard({ event, index = 0 }: { event: ClubEvent; index?: number }) {
  const d = eventStart(event);
  const rotate = [-2.5, 1.8, -1.2, 2.4][index % 4];
  return (
    <div style={{ transform: `rotate(${rotate}deg)` }}>
    <article
      className="group tilt-on-hover snapshot relative"
      style={{ ['--hover-tilt' as string]: `${-rotate / 2}deg` }}
    >
      <div className="relative">
        <Photo id={event.coverPhoto} className="aspect-[4/3] overflow-hidden rounded-xl" />
        {event.sample && <SampleBadge className="absolute top-3 left-3" />}
      </div>
      <div className="px-2 pt-4 pb-3">
        <p className="text-sm text-muted">
          <time dateTime={d.toISOString()}>{formatIsoDate(event.start.slice(0, 10), { month: 'short', day: 'numeric', year: 'numeric' })}</time>
        </p>
        <h3 className="mt-1 text-lg leading-snug font-bold">
          <Link to={`/events/${event.slug}`} className="text-navy no-underline after:absolute after:inset-0 group-hover:text-brand">
            {event.title}
          </Link>
        </h3>
        <span aria-hidden="true" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand">
          {event.recap ? 'Read recap' : 'View event'} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
    </div>
  );
}
