/** Helpers for Google Slides links and PDF paths in design reviews. */

/** Turn a Google Slides share link into an embeddable URL, if possible. */
export function googleSlidesEmbedUrl(url: string): string | undefined {
  const match = url.match(/docs\.google\.com\/presentation\/d\/(e\/)?([\w-]+)/);
  if (!match) return undefined;
  const [, published, id] = match;
  // Published-to-web links look like /d/e/<id>/pub; regular share links use /d/<id>/edit.
  return published
    ? `https://docs.google.com/presentation/d/e/${id}/embed?start=false&loop=false`
    : `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false`;
}

/** Resolve a PDF path from content (relative to /public) against the site base path. */
export function resolvePdf(pdf: string) {
  if (/^https?:\/\//.test(pdf)) return pdf;
  return import.meta.env.BASE_URL + pdf.replace(/^\/+/, '');
}
