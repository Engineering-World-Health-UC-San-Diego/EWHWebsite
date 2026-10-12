import { Link } from 'react-router';
import { about, site } from '../content/site';
import { heroCollage } from '../content/photos';
import { SampleBadge } from '../components/Buttons';
import { Faq } from '../components/Faq';
import { ArrowRight, ExternalIcon } from '../components/Icons';
import { Photo } from '../components/Photo';
import { PageHeader } from '../components/Section';
import { usePageMeta } from '../lib/hooks';
import { JoinBand } from './Home';

export function About() {
  usePageMeta('About', `About ${site.name}: our mission, project teams, workshops, and how to get involved.`);
  const [photoA, photoB] = [heroCollage.photos[3] ?? heroCollage.photos[0], heroCollage.photos[1] ?? heroCollage.photos[0]];

  return (
    <>
      <PageHeader eyebrow="About us" title="Engineering for global health, at UC San Diego">
        {site.description}
      </PageHeader>

      {/* Mission */}
      <section className="py-20 sm:py-24" aria-labelledby="mission">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h2 id="mission" className="eyebrow">
                {about.mission.heading}
              </h2>
              {about.mission.sample && <SampleBadge />}
            </div>
            <blockquote className="border-l-4 border-teal pl-6 font-display text-xl leading-snug font-semibold text-navy sm:text-2xl">
              {about.mission.text}
            </blockquote>
            <p className="mt-6 text-muted">
              Our chapter is part of{' '}
              <a href={site.parentOrg.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold">
                Engineering World Health <ExternalIcon className="h-3.5 w-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md px-4 py-6">
            <div className="snapshot -rotate-3">
              <Photo id={photoA} className="aspect-[4/3]" sizes="(min-width: 1024px) 420px, 90vw" />
            </div>
            <div className="snapshot absolute right-0 -bottom-6 w-1/2 rotate-6">
              <Photo id={photoB} className="aspect-square" sizes="220px" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlight */}
      <section className="px-3 pb-20 sm:px-6 sm:pb-24" aria-labelledby="highlight">
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 overflow-hidden rounded-[2rem] bg-navy px-6 py-10 text-white sm:flex-row sm:items-center sm:gap-10 sm:px-12 sm:py-12">
          <MedalIcon className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
          <div>
            <h2 id="highlight" className="text-2xl font-extrabold sm:text-3xl">
              {about.highlight.heading}
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-white/85">{about.highlight.text}</p>
          </div>
        </div>
      </section>

      {/* Project teams */}
      <section className="bg-tint py-20 sm:py-24" aria-labelledby="chapter">
        <div className="container-page">
          <div className="max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <h2 id="chapter" className="text-3xl font-extrabold text-navy sm:text-4xl">
                {about.chapter.heading}
              </h2>
              {about.chapter.sample && <SampleBadge />}
            </div>
            <div className="prose-ewh text-lg">
              {about.chapter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <h3 className="mt-12 mb-5 font-display text-xl font-bold text-navy">{about.projectYear.heading}</h3>
          <ol className="grid gap-4 sm:grid-cols-3">
            {about.projectYear.phases.map((ph, i) => (
              <li key={ph.term} className="relative rounded-3xl bg-white p-6 ring-1 ring-line">
                <p className="eyebrow">{ph.term}</p>
                <p className="mt-2 font-display text-2xl font-extrabold text-navy">{ph.title}</p>
                <span aria-hidden="true" className={['mt-5 block h-1.5 rounded-full', ['bg-brand', 'bg-teal', 'bg-health'][i % 3]].join(' ')} />
                {i < about.projectYear.phases.length - 1 && (
                  <ArrowRight
                    className="absolute top-1/2 -right-4 z-10 hidden h-7 w-7 -translate-y-1/2 rounded-full bg-tint p-1 text-brand sm:block"
                  />
                )}
              </li>
            ))}
          </ol>

          <Link to="/projects" className="group mt-8 inline-flex items-center gap-1.5 font-display font-bold no-underline">
            See current and past projects <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-20 sm:py-24" aria-labelledby="workshops">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="workshops" className="text-3xl font-extrabold text-navy sm:text-4xl">
              {about.workshops.heading}
            </h2>
            <p className="mt-4 text-lg text-navy/85">{about.workshops.text}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4">
            {about.workshops.skills.map((skill, i) => (
              <li
                key={skill}
                className="rounded-3xl border-2 border-line bg-white px-5 py-6 text-center font-display text-lg font-bold text-navy sm:text-xl"
                style={{ transform: `rotate(${[-1.5, 1.2, 1, -1.2][i % 4]}deg)` }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Get involved */}
      <section id="get-involved" className="scroll-mt-24 bg-tint py-20 sm:py-24" aria-labelledby="involved">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <h2 id="involved" className="text-3xl font-extrabold text-navy sm:text-4xl">
              {about.getInvolved.heading}
            </h2>
            {about.getInvolved.sample && <SampleBadge />}
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {about.getInvolved.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl border border-line bg-white p-7">
                <span
                  aria-hidden="true"
                  className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand font-display text-xl font-extrabold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-navy">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-muted">{s.text}</p>
                {s.link && (
                  <a
                    href={s.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-display font-bold no-underline hover:underline"
                  >
                    {s.link.label} <ExternalIcon className="h-4 w-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-20 sm:py-24" aria-labelledby="faq-title">
        <div className="container-page max-w-4xl">
          <h2 id="faq-title" className="mb-8 text-3xl font-extrabold text-navy sm:text-4xl">
            Frequently asked questions
          </h2>
          <Faq />
        </div>
      </section>

      <JoinBand />
    </>
  );
}

/** Original medal doodle for the competition highlight. */
function MedalIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 96 96" className={className}>
      <path d="M30 6h14l8 26H38L30 6Z" fill="#14B8A6" />
      <path d="M66 6H52l-8 26h14L66 6Z" fill="#2BB673" />
      <circle cx="48" cy="58" r="30" fill="#4041CE" />
      <circle cx="48" cy="58" r="22" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="5 5" />
      <path d="m48 44 4.3 8.8 9.7 1.4-7 6.8 1.7 9.6-8.7-4.6-8.7 4.6 1.7-9.6-7-6.8 9.7-1.4L48 44Z" fill="#fff" />
    </svg>
  );
}
