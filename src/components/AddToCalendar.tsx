import { useEffect, useId, useRef, useState } from 'react';
import type { ClubEvent } from '../content/types';
import { downloadIcs, googleCalendarUrl, outlookCalendarUrl } from '../lib/calendar';
import { buttonClass, cn } from '../lib/cn';
import { CalendarIcon, ChevronRight } from './Icons';

export function eventPageUrl(e: ClubEvent) {
  return `${window.location.origin}${import.meta.env.BASE_URL}events/${e.slug}`;
}

/** "Add to calendar" menu: Google, Outlook, or a downloadable .ics file. */
export function AddToCalendar({ event, className }: { event: ClubEvent; className?: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const url = eventPageUrl(event);
  const item = 'flex w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left font-semibold text-navy no-underline hover:bg-tint hover:text-brand';

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={buttonClass('secondary', 'md')}
      >
        <CalendarIcon className="h-4 w-4" /> Add to calendar
      </button>
      <div
        id={menuId}
        hidden={!open}
        className="absolute left-0 z-30 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-xl"
      >
        <ul>
          <li>
            <a className={item} href={googleCalendarUrl(event, url)} target="_blank" rel="noopener noreferrer">
              Google Calendar <ChevronRight className="h-4 w-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className={item} href={outlookCalendarUrl(event, url)} target="_blank" rel="noopener noreferrer">
              Outlook.com <ChevronRight className="h-4 w-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
          <li>
            <button
              type="button"
              className={item}
              onClick={() => {
                downloadIcs(event, url);
                setOpen(false);
              }}
            >
              Apple / other (.ics file) <ChevronRight className="h-4 w-4" />
            </button>
          </li>
        </ul>
        <p className="px-4 pt-1 pb-2 text-xs text-muted">Times are in Pacific Time (San Diego).</p>
      </div>
    </div>
  );
}
