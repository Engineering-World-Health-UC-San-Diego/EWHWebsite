import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import { projects } from '../content/projects';
import { reviews } from '../content/reviews';
import { SampleBadge } from '../components/Buttons';
import { StatusPill } from '../components/Cards';
import { Gallery } from '../components/Gallery';
import { ExternalIcon } from '../components/Icons';
import { Photo } from '../components/Photo';
import { RichText } from '../components/RichText';
import { ReviewCard } from '../components/ReviewCard';
import { Breadcrumbs, EmptyState } from '../components/Section';
import { usePageMeta } from '../lib/hooks';
import { formatIsoDate } from '../lib/time';
import { NotFound } from './NotFound';

export function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  usePageMeta(project?.name ?? 'Project not found', project?.summary);
  if (!project) return <NotFound />;

  const related = reviews.filter((r) => r.project === project.slug).sort((a, b) => b.date.localeCompare(a.date));
  const progress = [...(project.progress ?? [])].sort((a, b) => b.date.localeCompare(a.date));

  // Only sections with content are shown (and listed in "On this page").
  const textSections = (
    [
      ['overview', 'Overview', project.overview],
      ['problem', project.status === 'current' ? 'The need' : 'The problem', project.problem],
      ['solution', 'Proposed solution', project.solution],
    ] as const
  ).filter(([, , text]) => Boolean(text?.trim()));
  const showProgress = progress.length > 0 || project.status === 'current';
  const toc: [string, string][] = [
    ...textSections.map(([id, label]) => [id, label] as [string, string]),
    ...(showProgress ? [['progress', 'Progress'] as [string, string]] : []),
    ...(project.photos?.length ? [['photos', 'Photos'] as [string, string]] : []),
    ['reviews', `Design reviews (${related.length})`],
  ];

  return (
    <>
      <section className="bg-tint">
        <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Breadcrumbs crumbs={[{ to: '/projects', label: 'Projects' }]} />
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              <StatusPill status={project.status} label={project.statusLabel} />
              <span className="text-muted">{project.academicYear}</span>
              {project.sample && <SampleBadge />}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{project.name}</h1>
            <p className="mt-5 text-lg text-navy/80 sm:text-xl">{project.summary}</p>
            {project.topics && project.topics.length > 0 && (
              <div className="mt-6">
                <h2 className="sr-only">Topics</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.topics.map((t) => (
                    <li key={t} className="rounded-full border border-line bg-white px-3 py-1 text-sm font-semibold text-brand-dark">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="snapshot rotate-2">
            <Photo id={project.coverPhoto} className="aspect-[4/3]" loading="eager" sizes="(min-width: 1024px) 500px, 92vw" />
          </div>
        </div>
      </section>

      <div className="container-page grid gap-16 py-16 lg:grid-cols-[1fr_320px]">
        <div className="space-y-14">
          {textSections.map(([id, title, text]) => (
            <DetailSection key={id} id={id} title={title}>
              <RichText text={text!} />
            </DetailSection>
          ))}
          {showProgress && (
          <DetailSection id="progress" title="Progress">
            {progress.length ? (
              <ol className="relative space-y-6 border-l-2 border-line pl-6">
                {progress.map((u, i) => (
                  <li key={i} className="relative">
                    <span aria-hidden="true" className="absolute top-1.5 -left-[1.95rem] h-3.5 w-3.5 rounded-full border-[3px] border-white bg-health ring-2 ring-health/40" />
                    <time dateTime={u.date} className="font-display text-sm font-bold text-teal-dark">
                      {formatIsoDate(u.date)}
                    </time>
                    <p className="mt-1">{u.text}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-muted">Progress updates will be posted here.</p>
            )}
          </DetailSection>
          )}

          {project.photos && project.photos.length > 0 && (
            <DetailSection id="photos" title="Photos">
              <Gallery photoIds={project.photos} label={`${project.name} photos`} />
            </DetailSection>
          )}

          <DetailSection id="reviews" title="Design review slides">
            {related.length ? (
              <div className="space-y-4">
                {related.map((r) => (
                  <ReviewCard key={r.id} review={r} />
                ))}
              </div>
            ) : (
              <EmptyState>No design reviews have been posted for this project yet.</EmptyState>
            )}
          </DetailSection>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="On this page">
          <div className="rounded-3xl border border-line bg-white p-6">
            <h2 className="font-display text-sm font-bold tracking-[0.14em] text-muted uppercase">On this page</h2>
            <ul className="mt-3 space-y-2">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="font-semibold no-underline hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {project.links && project.links.length > 0 && (
              <>
                <h2 className="mt-6 font-display text-sm font-bold tracking-[0.14em] text-muted uppercase">Links</h2>
                <ul className="mt-3 space-y-2">
                  {project.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold">
                        {l.label} <ExternalIcon className="h-3.5 w-3.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}

function DetailSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <h2 id={`${id}-h`} className="mb-4 text-2xl font-extrabold text-navy sm:text-3xl">
        {title}
      </h2>
      <div className="prose-ewh text-lg">{children}</div>
    </section>
  );
}
