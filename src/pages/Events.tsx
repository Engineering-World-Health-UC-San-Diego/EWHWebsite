import { events } from '../content/events';
import { site } from '../content/site';
import { PastEventCard } from '../components/Cards';
import { EventCalendar } from '../components/EventCalendar';
import { EmptyState, PageHeader, SectionHeading } from '../components/Section';
import { usePageMeta } from '../lib/hooks';
import { splitEvents } from '../lib/time';
import { JoinBand } from './Home';

/** Academic year label for a date: Sept–Aug, e.g. "2025–26". */
function academicYear(start: string) {
  const y = Number(start.slice(0, 4));
  const m = Number(start.slice(5, 7));
  const startYear = m >= 9 ? y : y - 1;
  return `${startYear}–${String((startYear + 1) % 100).padStart(2, '0')}`;
}

export function Events() {
  usePageMeta('Events', 'Upcoming events, calendar, and past event recaps from Engineering World Health at UC San Diego.');
  const { upcoming, past } = splitEvents(events);

  const pastByYear = new Map<string, typeof past>();
  for (const e of past) {
    const k = academicYear(e.start);
    pastByYear.set(k, [...(pastByYear.get(k) ?? []), e]);
  }

  return (
    <>
      <PageHeader eyebrow="Get together" title="Events">
        Find upcoming events, add them to your calendar, and look back at recaps from past events. For the latest
        updates, follow{' '}
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="font-semibold">
          {site.instagram.handle}
          <span className="sr-only"> on Instagram (opens in a new tab)</span>
        </a>{' '}
        on Instagram.
      </PageHeader>

      <section className="py-16 sm:py-20" aria-labelledby="calendar">
        <div className="container-page">
          <SectionHeading title="Upcoming events" id="calendar" />
          <EventCalendar events={events} upcoming={upcoming} />
        </div>
      </section>

      <section id="past-events" className="scroll-mt-24 bg-tint py-16 sm:py-20" aria-labelledby="archive">
        <div className="container-page">
          <SectionHeading title="Past events" id="archive">
            Recaps and photos from previous events.
          </SectionHeading>
          {past.length ? (
            <div className="space-y-14">
              {[...pastByYear].map(([year, list]) => (
                <section key={year} aria-labelledby={`year-${year}`}>
                  <h3 id={`year-${year}`} className="mb-6 font-display text-xl font-bold text-muted">
                    {year} academic year
                  </h3>
                  <ul className="grid gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((e, i) => (
                      <li key={e.slug}>
                        <PastEventCard event={e} index={i} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <EmptyState>Past event recaps will appear here.</EmptyState>
          )}
        </div>
      </section>

      <JoinBand />
    </>
  );
}
