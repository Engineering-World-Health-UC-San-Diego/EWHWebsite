import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { projects } from '../content/projects';
import { reviews } from '../content/reviews';
import { ReviewCard } from '../components/ReviewCard';
import { EmptyState, PageHeader } from '../components/Section';
import { usePageMeta } from '../lib/hooks';

export function DesignReviews() {
  usePageMeta('Design Reviews', 'Design review slides from Engineering World Health at UC San Diego projects, organized by project and academic year.');
  const [project, setProject] = useState('all');
  const [year, setYear] = useState('all');

  const years = useMemo(() => [...new Set(reviews.map((r) => r.academicYear))].sort().reverse(), []);
  const projectOptions = useMemo(
    () => projects.filter((p) => reviews.some((r) => r.project === p.slug)),
    [],
  );

  const filtered = reviews.filter((r) => (project === 'all' || r.project === project) && (year === 'all' || r.academicYear === year));

  // Group: project → academic year → reviews (newest first).
  const groups = projectOptions
    .map((p) => {
      const list = filtered.filter((r) => r.project === p.slug);
      const byYear = [...new Set(list.map((r) => r.academicYear))]
        .sort()
        .reverse()
        .map((y) => ({ year: y, items: list.filter((r) => r.academicYear === y).sort((a, b) => b.date.localeCompare(a.date)) }));
      return { project: p, count: list.length, byYear };
    })
    .filter((g) => g.count > 0);

  const select =
    'w-full rounded-full border-2 border-line bg-white px-4 py-2.5 font-semibold text-navy focus:border-brand sm:w-auto sm:min-w-56';

  return (
    <>
      <PageHeader eyebrow="Design reviews" title="Design review library">
        Slides from project design reviews, organized by project, academic year, and review date. Open slides in Google
        Slides, preview them here, or download PDFs.
      </PageHeader>

      <section className="py-14 sm:py-16">
        <div className="container-page">
          {reviews.length === 0 ? (
            <EmptyState>
              No design review slides have been posted yet. Slides will appear here, organized by project and academic
              year, as teams present their designs.
            </EmptyState>
          ) : (
          <>
          <form
            className="mb-12 flex flex-col gap-4 rounded-3xl border border-line bg-tint p-5 sm:flex-row sm:flex-wrap sm:items-end"
            aria-label="Filter design reviews"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-navy">Project</span>
              <select className={select} value={project} onChange={(e) => setProject(e.target.value)}>
                <option value="all">All projects</option>
                {projectOptions.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-navy">Academic year</span>
              <select className={select} value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-sm text-muted sm:ml-auto sm:self-center" aria-live="polite">
              Showing {filtered.length} of {reviews.length} reviews
            </p>
          </form>

          {groups.length ? (
            <div className="space-y-16">
              {groups.map(({ project: p, byYear }) => (
                <section key={p.slug} aria-labelledby={`proj-${p.slug}`}>
                  <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-line pb-3">
                    <h2 id={`proj-${p.slug}`} className="text-2xl font-extrabold text-navy sm:text-3xl">
                      {p.name}
                    </h2>
                    <Link to={`/projects/${p.slug}`} className="font-display font-bold no-underline hover:underline">
                      View project
                    </Link>
                  </div>
                  <div className="space-y-8">
                    {byYear.map(({ year: y, items }) => (
                      <div key={y}>
                        <h3 className="mb-4 font-display text-lg font-bold text-muted">{y}</h3>
                        <div className="space-y-4">
                          {items.map((r) => (
                            <ReviewCard key={r.id} review={r} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <EmptyState>No design reviews match these filters.</EmptyState>
          )}
          </>
          )}
        </div>
      </section>
    </>
  );
}
