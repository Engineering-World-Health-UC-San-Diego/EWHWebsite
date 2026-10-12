import { useState } from 'react';
import { Link } from 'react-router';
import { projects } from '../content/projects';
import type { DesignReview } from '../content/types';
import { buttonClass } from '../lib/cn';
import { googleSlidesEmbedUrl, resolvePdf } from '../lib/slides';
import { formatIsoDate } from '../lib/time';
import { SampleBadge } from './Buttons';
import { DownloadIcon, ExternalIcon, SlidesIcon } from './Icons';

/** One design review: date, details, and slide / PDF actions. */
export function ReviewCard({ review, showProject = false }: { review: DesignReview; showProject?: boolean }) {
  const [embed, setEmbed] = useState<'slides' | 'pdf' | null>(null);
  const project = projects.find((p) => p.slug === review.project);
  const slidesEmbed = review.slidesUrl ? googleSlidesEmbedUrl(review.slidesUrl) : undefined;
  const pdfUrl = review.pdf ? resolvePdf(review.pdf) : undefined;
  const hasFiles = Boolean(review.slidesUrl || pdfUrl);

  return (
    <article id={`review-${review.id}`} className="scroll-mt-28 rounded-3xl border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <time dateTime={review.date} className="font-display font-bold text-teal-dark">
          {formatIsoDate(review.date)}
        </time>
        {review.stage && <span className="rounded-full bg-tint px-2.5 py-0.5 font-semibold text-brand-dark">{review.stage}</span>}
        <span className="text-muted">{review.academicYear}</span>
        {review.sample && <SampleBadge />}
      </div>
      <h3 className="mt-2 text-xl font-bold text-navy">{review.title}</h3>
      {showProject && project && (
        <p className="mt-1 text-sm">
          Project:{' '}
          <Link to={`/projects/${project.slug}`} className="font-semibold">
            {project.name}
          </Link>
        </p>
      )}
      {review.description && <p className="mt-2 text-muted">{review.description}</p>}

      <div className="mt-5 flex flex-wrap gap-2.5">
        {review.slidesUrl && (
          <>
            <a href={review.slidesUrl} target="_blank" rel="noopener noreferrer" className={buttonClass('brand', 'sm')}>
              <SlidesIcon className="h-4 w-4" /> View slides
              <span className="sr-only">(Google Slides, opens in a new tab)</span>
            </a>
            {slidesEmbed && (
              <button type="button" aria-expanded={embed === 'slides'} onClick={() => setEmbed(embed === 'slides' ? null : 'slides')} className={buttonClass('secondary', 'sm')}>
                {embed === 'slides' ? 'Hide preview' : 'Preview here'}
              </button>
            )}
          </>
        )}
        {pdfUrl && (
          <>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className={buttonClass(review.slidesUrl ? 'secondary' : 'brand', 'sm')}>
              <ExternalIcon className="h-4 w-4" /> {review.slidesUrl ? 'Open PDF' : 'View slides (PDF)'}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a href={pdfUrl} download className={buttonClass('secondary', 'sm')}>
              <DownloadIcon className="h-4 w-4" /> Download PDF
            </a>
            <button type="button" aria-expanded={embed === 'pdf'} onClick={() => setEmbed(embed === 'pdf' ? null : 'pdf')} className={buttonClass('secondary', 'sm')}>
              {embed === 'pdf' ? 'Hide PDF preview' : 'Preview PDF here'}
            </button>
          </>
        )}
        {!hasFiles && <p className="text-sm text-muted italic">Slides haven’t been uploaded for this review yet.</p>}
      </div>

      {embed === 'slides' && slidesEmbed && (
        <div className="mt-5 aspect-video overflow-hidden rounded-2xl border border-line bg-tint">
          <iframe src={slidesEmbed} title={`${review.title} — slides`} className="h-full w-full" allowFullScreen loading="lazy" />
        </div>
      )}
      {embed === 'pdf' && pdfUrl && (
        <div className="mt-5 h-[70vh] max-h-[640px] overflow-hidden rounded-2xl border border-line bg-tint">
          <iframe src={pdfUrl} title={`${review.title} — PDF`} className="h-full w-full" loading="lazy" />
        </div>
      )}
    </article>
  );
}
