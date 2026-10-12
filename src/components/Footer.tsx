import { Link } from 'react-router';
import { site } from '../content/site';
import { DonateButton, JoinButton } from './Buttons';
import { ExternalIcon } from './Icons';
import { Logo } from './Logo';
import { NAV_LINKS } from './Navbar';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* White card keeps the logo's original colors legible on navy. */}
          <Link to="/" className="inline-block rounded-2xl bg-white px-4 py-3" aria-label="Home — Engineering World Health at UC San Diego">
            <Logo className="h-16" sizes="200px" />
          </Link>
          <p className="mt-5 max-w-sm text-white/80">{site.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <JoinButton variant="light" />
            <DonateButton variant="ghostLight" />
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-[0.14em] text-white/70 uppercase">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white no-underline hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-[0.14em] text-white/70 uppercase">Connect</h2>
          <ul className="mt-4 space-y-2.5">
            {site.contactEmail && (
              <li>
                <a href={`mailto:${site.contactEmail}`} className="text-white hover:underline">
                  {site.contactEmail}
                </a>
              </li>
            )}
            {site.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white no-underline hover:underline">
                  {s.label} <ExternalIcon className="h-3.5 w-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href={site.parentOrg.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white no-underline hover:underline">
                {site.parentOrg.label} <ExternalIcon className="h-3.5 w-3.5 shrink-0" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="container-page py-6 text-sm text-white/70">
          © {new Date().getFullYear()} {site.name}. A student organization at UC San Diego.
        </p>
      </div>
    </footer>
  );
}
