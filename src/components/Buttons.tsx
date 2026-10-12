import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { site } from '../content/site';
import { buttonClass, cn, type ButtonSize, type ButtonVariant } from '../lib/cn';
import { ArrowRight, ExternalIcon } from './Icons';

interface JoinProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  label?: string;
  /** Compact form used in the navigation bar. */
  compact?: boolean;
}

/**
 * "Join Us" call to action. Links to site.joinUrl (src/content/site.ts).
 * When no link is configured it renders as a clearly-marked, non-clickable
 * placeholder rather than a button that goes nowhere.
 */
export function JoinButton({ variant = 'primary', size = 'md', className, label = 'Join Us', compact }: JoinProps) {
  if (site.joinUrl) {
    return (
      <a href={site.joinUrl} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, size, className)}>
        {label}
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <span
      role="link"
      aria-disabled="true"
      title="The Join Us link hasn’t been set yet — add it as joinUrl in src/content/site.ts"
      className={cn(
        buttonClass(variant, size, className),
        'cursor-not-allowed border-2 border-dashed border-current shadow-none',
      )}
    >
      {label}
      <span className={cn('rounded-full bg-black/10 px-2 py-0.5 font-sans font-semibold', compact ? 'text-[0.65rem]' : 'text-xs')}>
        {compact ? 'soon' : 'link coming soon'}
      </span>
    </span>
  );
}

/** Donate button — renders nothing until site.donateUrl is set. */
export function DonateButton({ variant = 'secondary', size = 'md', className }: Omit<JoinProps, 'label'>) {
  if (!site.donateUrl) return null;
  return (
    <a href={site.donateUrl} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, size, className)}>
      Donate
      <ExternalIcon className="h-4 w-4" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function ButtonLink({
  to,
  children,
  variant = 'secondary',
  size = 'md',
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return (
    <Link to={to} className={buttonClass(variant, size, className)}>
      {children}
    </Link>
  );
}

/** Visible marker for placeholder content. */
export function SampleBadge({ className, label = 'Sample content' }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-dashed border-brand-dark bg-white px-2.5 py-0.5 font-sans text-xs font-semibold tracking-normal text-brand-dark normal-case',
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.75 9.75h-1.5v-1.5h1.5v1.5Zm0-3h-1.5V4.75h1.5v3.5Z" />
      </svg>
      {label}
    </span>
  );
}
