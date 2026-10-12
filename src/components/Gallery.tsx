import { useEffect, useRef, useState, type ReactNode } from 'react';
import { getPhoto } from '../lib/images';
import { ChevronLeft, ChevronRight, CloseIcon } from './Icons';
import { Photo } from './Photo';

/** Photo grid; each photo opens in an accessible lightbox dialog. */
export function Gallery({ photoIds, label }: { photoIds: string[]; label: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ids = photoIds.filter((id) => getPhoto(id));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  if (!ids.length) return null;
  const go = (delta: number) => setIndex((i) => (i === null ? i : (i + delta + ids.length) % ids.length));
  const current = index !== null ? getPhoto(ids[index]) : undefined;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4" aria-label={label}>
        {ids.map((id, i) => (
          <li key={id + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-2xl ring-1 ring-line/60"
            >
              <Photo
                id={id}
                className={i % 3 === 0 ? 'aspect-square' : 'aspect-[4/5] sm:aspect-square'}
                imgClassName="transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 640px) 33vw, 50vw"
              />
              <span className="sr-only">Open larger view</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setIndex(null)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(1);
          if (e.key === 'ArrowLeft') go(-1);
        }}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
        aria-label={`${label} — photo viewer`}
        className="m-auto max-h-[92vh] w-[min(1000px,94vw)] rounded-3xl bg-white p-0 backdrop:bg-navy/80"
      >
        {current && index !== null && (
          <div className="p-3 sm:p-4">
            <Photo id={current.id} fit="contain" loading="eager" sizes="94vw" className="max-h-[70vh] w-full bg-tint" imgClassName="max-h-[70vh] rounded-xl" />
            <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-4">
              <p className="text-sm text-muted">
                <span className="font-semibold text-navy">{current.caption ?? 'Photo'}</span> · {index + 1} of {ids.length}
              </p>
              <div className="flex gap-2">
                {ids.length > 1 && (
                  <>
                    <IconButton label="Previous photo" onClick={() => go(-1)}>
                      <ChevronLeft className="h-5 w-5" />
                    </IconButton>
                    <IconButton label="Next photo" onClick={() => go(1)}>
                      <ChevronRight className="h-5 w-5" />
                    </IconButton>
                  </>
                )}
                <IconButton label="Close" onClick={() => setIndex(null)}>
                  <CloseIcon className="h-5 w-5" />
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy hover:border-brand hover:text-brand"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
