import { events } from '../content/events';
import { projects } from '../content/projects';
import { about, highlights, site } from '../content/site';
import { ButtonLink, JoinButton, SampleBadge } from '../components/Buttons';
import { EventCard, PastEventCard, ProjectCard } from '../components/Cards';
import { Faq } from '../components/Faq';
import { Hero } from '../components/Hero';
import { ArrowRight, ExternalIcon } from '../components/Icons';
import { EmptyState, SectionHeading } from '../components/Section';
import { usePageMeta } from '../lib/hooks';
import { splitEvents } from '../lib/time';
import { Link } from 'react-router';

export function Home() {
  usePageMeta(undefined);
  const { upcoming, past } = splitEvents(events);
  const featured = projects.filter((p) => p.status === 'current' && p.featured).slice(0, 6);

  return (
    <>
      <Hero />
      <Mission />
      <Highlights />

      {/* Upcoming events */}
      <section className="bg-tint py-20 sm:py-24" aria-labelledby="upcoming-title">
        <div className="container-page">
          <SectionHeading eyebrow="Mark your calendar" title="Upcoming events" id="upcoming-title" link={{ to: '/events', label: 'Full calendar' }} />
          {upcoming.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.slice(0, 3).map((e) => (
                <li key={e.slug} className="flex">
                  <div className="flex-1">
                    <EventCard event={e} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No upcoming events are posted yet — check back soon.</EmptyState>
          )}
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 sm:py-24" aria-labelledby="projects-title">
        <div className="container-page">
          <SectionHeading eyebrow="What we’re building" title="Featured projects" id="projects-title" link={{ to: '/projects', label: 'All projects' }} />
          {featured.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <li key={p.slug} className="flex [&>*]:flex-1">
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>Project details are coming soon.</EmptyState>
          )}
        </div>
      </section>

      {/* Past events preview */}
      {past.length > 0 && (
        <section className="relative overflow-hidden bg-tint py-20 sm:py-24" aria-labelledby="past-title">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="container-page relative">
            <SectionHeading eyebrow="Look back" title="Past events" id="past-title" link={{ to: '/events#past-events', label: 'Event archive' }} />
            <ul className="grid gap-8 px-2 sm:grid-cols-2 lg:grid-cols-3">
              {past.slice(0, 3).map((e, i) => (
                <li key={e.slug}>
                  <PastEventCard event={e} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="py-20 sm:py-24" aria-labelledby="faq-title">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading eyebrow="Thinking about joining?" title="Frequently asked questions" id="faq-title" className="mb-0 self-start" />
          <Faq />
        </div>
      </section>

      <JoinBand />
    </>
  );
}

function Mission() {
  const pillars = [
    { to: '/projects', title: 'Projects', text: 'Year-long, student-led project teams, each addressing a specific medical need.' },
    { to: '/events', title: 'Events', text: 'See what’s coming up, add events to your calendar, and read recaps of past events.' },
    { to: '/design-reviews', title: 'Design reviews', text: 'Browse slides from project design reviews, organized by project and year.' },
  ];
  return (
    <section className="py-20 sm:py-28" aria-labelledby="mission-title">
      <div className="container-page grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4 flex flex-wrap items-center gap-3">
            {about.mission.heading}
            {about.mission.sample && <SampleBadge />}
          </p>
          <h2 id="mission-title" className="sr-only">
            {about.mission.heading}
          </h2>
          <p className="font-display text-xl leading-snug font-semibold text-navy sm:text-2xl">{about.mission.text}</p>
          <Link to="/about" className="group mt-8 inline-flex items-center gap-1.5 font-display font-bold no-underline">
            More about us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <ul className="grid gap-4">
          {pillars.map((p, i) => (
            <li key={p.to}>
              <Link
                to={p.to}
                className="group flex items-start gap-4 rounded-3xl border border-line bg-white p-5 no-underline transition-colors hover:border-brand hover:bg-tint"
              >
                <span
                  aria-hidden="true"
                  className={[
                    'grid h-11 w-11 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold text-white',
                    ['bg-brand', 'bg-teal-dark', 'bg-navy'][i],
                  ].join(' ')}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block font-display text-lg font-bold text-navy group-hover:text-brand">{p.title}</span>
                  <span className="mt-1 block text-muted">{p.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Bold strip of quick facts (edit `highlights` in src/content/site.ts). */
function Highlights() {
  if (!highlights.length) return null;
  return (
    <section className="px-3 pb-20 sm:px-6 sm:pb-24" aria-label="Highlights">
      <ul className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-[2rem] bg-white/15 sm:grid-cols-3">
        {highlights.map((h, i) => (
          <li key={h.value} className="bg-navy px-7 py-8 text-white sm:px-8 sm:py-10">
            <p className={['font-display text-4xl font-extrabold sm:text-5xl', ['text-white', 'text-teal', 'text-health'][i % 3]].join(' ')}>
              {h.value}
            </p>
            <p className="mt-2 text-white/85">{h.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Big closing "Join Us" invitation, reused on several pages. */
export function JoinBand() {
  return (
    <section className="px-3 py-16 sm:px-6 sm:py-20" aria-labelledby="join-title">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand to-brand-dark px-6 py-16 text-white sm:px-14 sm:py-20">
        <svg aria-hidden="true" viewBox="0 0 400 120" className="absolute -right-10 bottom-6 w-[420px] text-white/10">
          <path d="M0 70h110l20-40 30 80 25-60 15 20h200" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span aria-hidden="true" className="absolute top-10 right-16 hidden h-16 w-16 rounded-full border-[10px] border-teal/70 sm:block" />
        <div className="relative max-w-2xl">
          <p className="font-display text-sm font-bold tracking-[0.14em] text-white/80 uppercase">
            {site.applications.open ? site.applications.message : 'Get involved'}
          </p>
          <h2 id="join-title" className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">
            Join Engineering World Health at UCSD
          </h2>
          <p className="mt-5 text-lg text-white/90 sm:text-xl">
            Interested in engineering for global health? Come to an event, meet the team, and find a project to join.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JoinButton variant="light" size="lg" />
            <ButtonLink to="/about#get-involved" variant="ghostLight" size="lg">
              How to get involved
            </ButtonLink>
          </div>
          <p className="mt-6 text-white/85">
            The best way to stay updated: follow{' '}
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-bold text-white underline-offset-4 hover:underline">
              {site.instagram.handle} <ExternalIcon className="h-3.5 w-3.5" />
              <span className="sr-only">on Instagram (opens in a new tab)</span>
            </a>{' '}
            on Instagram.
          </p>
        </div>
      </div>
    </section>
  );
}
