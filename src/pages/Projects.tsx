import { projects } from '../content/projects';
import { ProjectCard } from '../components/Cards';
import { EmptyState, PageHeader, SectionHeading } from '../components/Section';
import { usePageMeta } from '../lib/hooks';
import { JoinBand } from './Home';

export function Projects() {
  usePageMeta('Projects', 'Current and past student projects at Engineering World Health at UC San Diego.');
  const current = projects.filter((p) => p.status === 'current');
  const past = projects.filter((p) => p.status === 'past');

  // Past projects grouped by academic year, newest first.
  const pastYears = [...new Set(past.map((p) => p.academicYear))].sort().reverse();

  return (
    <>
      <PageHeader eyebrow="Projects" title="What our teams are building">
        Year-long, student-led projects, each addressing a specific medical need. Open a project to read about the
        need it addresses and the team’s design work.
      </PageHeader>

      <section className="py-20" aria-labelledby="current">
        <div className="container-page">
          <SectionHeading eyebrow="2026–27" title="Current projects" id="current" />
          {current.length ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {current.map((p) => (
                <li key={p.slug} className="flex [&>*]:flex-1">
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No current projects are listed yet.</EmptyState>
          )}
        </div>
      </section>

      <section className="bg-tint py-20" aria-labelledby="past">
        <div className="container-page">
          <SectionHeading title="Past projects" id="past" />
          {past.length ? (
            <div className="space-y-14">
              {pastYears.map((year) => (
                <section key={year} aria-labelledby={`past-${year}`}>
                  <h3 id={`past-${year}`} className="mb-6 font-display text-xl font-bold text-muted">
                    {year}
                  </h3>
                  <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {past
                      .filter((p) => p.academicYear === year)
                      .map((p) => (
                        <li key={p.slug} className="flex [&>*]:flex-1">
                          <ProjectCard project={p} headingLevel={4} />
                        </li>
                      ))}
                  </ul>
                </section>
              ))}
            </div>
          ) : (
            <EmptyState>Past projects will be archived here.</EmptyState>
          )}
        </div>
      </section>

      <JoinBand />
    </>
  );
}
