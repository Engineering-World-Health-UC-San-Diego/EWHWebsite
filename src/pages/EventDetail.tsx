import { useParams } from 'react-router';
import { events } from '../content/events';
import { site } from '../content/site';
import { AddToCalendar } from '../components/AddToCalendar';
import { JoinButton, SampleBadge } from '../components/Buttons';
import { Gallery } from '../components/Gallery';
import { CalendarIcon, ClockIcon, ExternalIcon, PinIcon } from '../components/Icons';
import { Photo } from '../components/Photo';
import { RichText } from '../components/RichText';
import { Breadcrumbs } from '../components/Section';
import { buttonClass } from '../lib/cn';
import { usePageMeta } from '../lib/hooks';
import { eventEnd, eventStart, formatLongDate, formatTimeRange } from '../lib/time';
import { NotFound } from './NotFound';

export function EventDetail() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);
  usePageMeta(
    event?.title ?? 'Event not found',
    event ? event.summary ?? `${event.title} — ${formatLongDate(eventStart(event))}, ${formatTimeRange(event)}, ${event.location}.` : undefined,
  );
  if (!event) return <NotFound />;

  const start = eventStart(event);
  const isPast = eventEnd(event) < new Date();

  return (
    <>
      <section className="bg-tint">
        <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Breadcrumbs crumbs={[{ to: '/events', label: 'Events' }]} />
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={isPast ? 'rounded-full bg-white px-3 py-1 text-sm font-semibold text-muted' : 'rounded-full bg-teal-dark px-3 py-1 text-sm font-semibold text-white'}>
                {isPast ? 'Past event' : 'Upcoming'}
              </span>
              {event.sample && <SampleBadge />}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{event.title}</h1>

            <dl className="mt-7 space-y-3 text-lg">
              <div className="flex items-start gap-3">
                <dt>
                  <CalendarIcon className="mt-1 h-5 w-5 text-brand" />
                  <span className="sr-only">Date</span>
                </dt>
                <dd>
                  <time dateTime={start.toISOString()} className="font-semibold">
                    {formatLongDate(start)}
                  </time>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <dt>
                  <ClockIcon className="mt-1 h-5 w-5 text-brand" />
                  <span className="sr-only">Time</span>
                </dt>
                <dd>{formatTimeRange(event)}</dd>
              </div>
              <div className="flex items-start gap-3">
                <dt>
                  <PinIcon className="mt-1 h-5 w-5 text-brand" />
                  <span className="sr-only">Location</span>
                </dt>
                <dd>{event.location}</dd>
              </div>
            </dl>

            {!isPast && (
              <div className="mt-8 flex flex-wrap gap-3">
                {event.rsvpUrl && (
                  <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md')}>
                    RSVP <ExternalIcon className="h-4 w-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                <AddToCalendar event={event} />
              </div>
            )}
          </div>
          <div className="snapshot -rotate-2">
            <Photo id={event.coverPhoto} className="aspect-[4/3]" loading="eager" sizes="(min-width: 1024px) 500px, 92vw" />
          </div>
        </div>
      </section>

      <div className="container-page max-w-3xl space-y-14 py-16">
        {isPast && (
          <section aria-labelledby="recap">
            <h2 id="recap" className="mb-4 text-2xl font-extrabold text-navy sm:text-3xl">
              Recap
            </h2>
            <div className="prose-ewh text-lg">
              {event.recap ? <RichText text={event.recap} /> : <p className="text-muted">A recap of this event is coming soon.</p>}
            </div>
          </section>
        )}

        {event.description && (
          <section aria-labelledby="about-event">
            <h2 id="about-event" className="mb-4 text-2xl font-extrabold text-navy sm:text-3xl">
              {isPast ? 'About this event' : 'Details'}
            </h2>
            <div className="prose-ewh text-lg">
              <RichText text={event.description} />
            </div>
          </section>
        )}

        {event.gallery && event.gallery.length > 0 && (
          <section aria-labelledby="gallery">
            <h2 id="gallery" className="mb-5 text-2xl font-extrabold text-navy sm:text-3xl">
              Photos
            </h2>
            <Gallery photoIds={event.gallery} label={`Photos from ${event.title}`} />
          </section>
        )}

        <div className="rounded-3xl bg-tint p-8">
          <h2 className="text-2xl font-extrabold text-navy">{isPast ? 'Want to come to the next one?' : 'Stay in the loop'}</h2>
          <p className="mt-2 text-muted">
            For event updates, follow{' '}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold">
              {site.instagram.handle}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>{' '}
            on Instagram.
          </p>
          <div className="mt-5">
            <JoinButton />
          </div>
        </div>
      </div>
    </>
  );
}
