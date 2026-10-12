import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '../lib/cn';
import { ArrowRight, ChevronRight } from './Icons';

export function SectionHeading({
  eyebrow,
  title,
  id,
  link,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
  link?: { to: string; label: string };
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 id={id} className="text-3xl font-extrabold tracking-tight text-navy sm:text-[2.6rem] sm:leading-tight">
          {title}
        </h2>
        {children && <div className="mt-4 text-lg text-muted">{children}</div>}
      </div>
      {link && (
        <Link to={link.to} className="group inline-flex items-center gap-1.5 font-display font-bold text-brand no-underline hover:text-brand-dark">
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

/** Title band at the top of inner pages. */
export function PageHeader({
  eyebrow,
  title,
  children,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  crumbs?: { to: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-tint">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-page relative py-14 sm:py-20">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-navy sm:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-navy/80 sm:text-xl">{children}</div>}
      </div>
    </section>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: { to: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((c, i) => (
          <li key={c.to} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted" />}
            <Link to={c.to} className="font-semibold text-brand no-underline hover:underline">
              {c.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-3xl border-2 border-dashed border-line bg-white p-8 text-center text-muted">{children}</p>;
}
