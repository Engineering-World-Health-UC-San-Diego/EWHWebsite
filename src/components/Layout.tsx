import { useEffect, useRef, useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { about, site } from '../content/site';
import { events } from '../content/events';
import { projects } from '../content/projects';
import { reviews } from '../content/reviews';
import { ArrowRight, CloseIcon } from './Icons';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function Layout() {
  const location = useLocation();
  const first = useRef(true);

  // Move focus to the new page's heading after client-side navigation so
  // screen-reader and keyboard users land at the start of the new content.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (location.hash) return;
    const h1 = document.querySelector<HTMLElement>('main h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-brand px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <ApplicationsBar />
      <SetupNotice />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

/** "Applications open" announcement, controlled by site.applications. */
function ApplicationsBar() {
  if (!site.applications.open || !site.joinUrl) return null;
  return (
    <div className="bg-teal-dark text-white">
      <p className="container-page flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-sm font-semibold">
        <span>{site.applications.message}</span>
        <a
          href={site.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-white underline underline-offset-4 hover:no-underline"
        >
          Apply now <ArrowRight className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}

/** Thin bar reminding editors what still needs real content. */
function SetupNotice() {
  const [dismissed, setDismissed] = useState(false);
  if (!site.showSetupNotice || dismissed) return null;

  const sampleCount =
    projects.filter((p) => p.sample).length +
    events.filter((e) => e.sample).length +
    reviews.filter((r) => r.sample).length +
    Object.values(about).filter((s) => s.sample).length;

  const items: string[] = [];
  if (!site.joinUrl) items.push('the Join Us link is not set yet');
  if (sampleCount) items.push(`${sampleCount} items are sample placeholders, marked “Sample content”`);
  if (!items.length) return null;

  return (
    <div className="bg-navy text-white">
      <div className="container-page flex items-start justify-between gap-4 py-2 text-sm">
        <p>
          <strong className="font-semibold">Preview notice:</strong> {items.join('; ')}. Edit files in{' '}
          <code className="rounded bg-white/15 px-1">src/content/</code> — see the README.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="-mr-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full hover:bg-white/15"
        >
          <CloseIcon className="h-4 w-4" />
          <span className="sr-only">Dismiss preview notice</span>
        </button>
      </div>
    </div>
  );
}
