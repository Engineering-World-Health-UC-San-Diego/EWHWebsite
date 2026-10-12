import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { cn } from '../lib/cn';
import { DonateButton, JoinButton } from './Buttons';
import { CloseIcon, MenuIcon } from './Icons';
import { Logo } from './Logo';

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/events', label: 'Events' },
  { to: '/design-reviews', label: 'Design Reviews' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'rounded-full px-3.5 py-2 font-display text-[0.95rem] font-semibold no-underline transition-colors',
      isActive ? 'bg-tint text-brand' : 'text-navy hover:bg-tint hover:text-brand',
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <nav aria-label="Main" className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center rounded-md" aria-label="Home — Engineering World Health at UC San Diego">
          <Logo className="h-11 sm:h-12" sizes="(min-width: 640px) 120px, 110px" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <DonateButton size="sm" className="hidden md:inline-flex" />
          <JoinButton size="sm" compact className="hidden sm:inline-flex" />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy hover:bg-tint lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line/70 bg-white lg:hidden">
        <ul className="container-page flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={(s) => cn(linkClass(s), 'block px-4 py-3 text-lg')}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-3 flex flex-wrap gap-3 px-1">
            <JoinButton />
            <DonateButton />
          </li>
        </ul>
      </div>
    </header>
  );
}
