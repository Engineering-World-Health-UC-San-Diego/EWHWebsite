import { ButtonLink } from '../components/Buttons';
import { usePageMeta } from '../lib/hooks';

export function NotFound() {
  usePageMeta('Page not found');
  return (
    <section className="container-page py-24 text-center sm:py-32">
      <p className="font-display text-7xl font-extrabold text-line sm:text-9xl" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">We couldn’t find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">The link may be out of date, or the page may have moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/" variant="brand">
          Go to the homepage
        </ButtonLink>
        <ButtonLink to="/events">See events</ButtonLink>
      </div>
    </section>
  );
}
