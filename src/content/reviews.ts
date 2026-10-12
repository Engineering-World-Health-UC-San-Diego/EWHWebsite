import type { DesignReview } from './types.ts';

/**
 * DESIGN REVIEWS
 *
 * Each review belongs to a project (by slug from projects.ts). Provide a
 * Google Slides link, a PDF, or both:
 *
 *   slidesUrl: 'https://docs.google.com/presentation/d/<ID>/edit?usp=sharing',
 *   pdf: 'reviews/my-review.pdf',   // file saved in public/reviews/
 *
 * For Google Slides, set sharing to "Anyone with the link can view" so the
 * embedded preview works for visitors.
 *
 * Example (copy, uncomment, and fill in):
 *
 *   {
 *     id: 'tb-screening-preliminary-2026',
 *     project: 'tb-screening-device',
 *     title: 'Preliminary Design Review',
 *     date: '2026-11-12',
 *     academicYear: '2026–27',
 *     stage: 'Preliminary',
 *     description: 'Optional one-line summary.',
 *     slidesUrl: 'https://docs.google.com/presentation/d/<ID>/edit?usp=sharing',
 *     pdf: 'reviews/tb-screening-preliminary-2026.pdf',
 *   },
 */
export const reviews: DesignReview[] = [];
