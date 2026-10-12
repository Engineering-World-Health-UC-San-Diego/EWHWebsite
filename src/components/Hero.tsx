import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { heroCollage } from '../content/photos';
import { hero, site } from '../content/site';
import { cn } from '../lib/cn';
import { useMediaQuery, usePageVisible, usePrefersReducedMotion } from '../lib/hooks';
import { ButtonLink, JoinButton } from './Buttons';
import { ArrowRight, PauseIcon, PlayIcon } from './Icons';
import { Photo } from './Photo';

/**
 * Hand-placed snapshot positions (percent of the collage box). The first
 * `visibleCount` are used. Rotations stay within −8°…8°.
 */
const SLOTS: { top: string; left: string; width: string; aspect: string; rotate: number; z: number; tilt: number }[] = [
  { top: '4%', left: '4%', width: '52%', aspect: '4 / 3', rotate: -6, z: 2, tilt: 2 },
  { top: '0%', left: '58%', width: '38%', aspect: '4 / 5', rotate: 5, z: 1, tilt: -2 },
  { top: '38%', left: '27%', width: '47%', aspect: '4 / 3', rotate: 2, z: 4, tilt: -2.5 },
  { top: '57%', left: '-1%', width: '35%', aspect: '1 / 1', rotate: -4, z: 3, tilt: 3 },
  { top: '53%', left: '65%', width: '35%', aspect: '4 / 5', rotate: 7, z: 2, tilt: -3 },
  { top: '79%', left: '35%', width: '28%', aspect: '4 / 3', rotate: -3, z: 5, tilt: 2 },
];

/** Order in which slots swap photos, so changes feel scattered. */
const SWAP_ORDER = [2, 0, 4, 1, 3, 5];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-tint" aria-labelledby="hero-title">
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:py-24">
        <div className="relative z-10">
          {site.applications.open && site.joinUrl && (
            <a
              href={site.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pr-4 pl-3 text-sm font-semibold text-navy no-underline shadow-sm hover:border-brand hover:text-brand"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-health opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-health" />
              </span>
              {site.applications.message}
              <span className="text-brand">Apply →</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <h1 id="hero-title" className="font-display leading-[0.95] font-extrabold tracking-tight">
            <span className="block text-[2.6rem] text-navy sm:text-6xl xl:text-7xl">{hero.titleLine1}</span>
            <span className="relative mt-3 inline-block text-[2.1rem] text-brand sm:text-5xl xl:text-6xl">
              {hero.titleLine2}
              <Underline className="absolute -bottom-3 left-0 w-full text-teal" />
            </span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-navy/85 sm:text-xl">{hero.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JoinButton size="lg" />
            <ButtonLink to="/projects" size="lg">
              Explore Projects <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>

        <Collage />
        <MobilePhotoRow />
      </div>
    </section>
  );
}

function Collage() {
  const pool = heroCollage.photos;
  const count = Math.max(1, Math.min(heroCollage.visibleCount, SLOTS.length, pool.length));
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reducedMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  const [paused, setPaused] = useState(false);

  const [shown, setShown] = useState(() => pool.slice(0, count));
  const shownRef = useRef(shown);
  const queueRef = useRef(pool.slice(count));
  const swapIndex = useRef(0);

  const canCycle = queueRef.current.length > 0 && isDesktop && !reducedMotion && !paused && pageVisible;
  const motionOff = paused || reducedMotion;

  useEffect(() => {
    if (!canCycle) return;
    const order = SWAP_ORDER.filter((i) => i < count);
    const id = window.setInterval(() => {
      const queue = queueRef.current;
      const incoming = queue.shift();
      if (!incoming) return;
      const slot = order[swapIndex.current++ % order.length];
      const next = [...shownRef.current];
      queue.push(next[slot]);
      next[slot] = incoming;
      shownRef.current = next;
      setShown(next);
    }, heroCollage.cycleSeconds * 1000);
    return () => window.clearInterval(id);
  }, [canCycle, count]);

  const hasMotion = !reducedMotion;

  return (
    <div className="relative hidden lg:block">
      <div
        role="group"
        aria-label="Photo collage"
        className="relative mx-auto aspect-[1/1.04] w-full max-w-[560px]"
        data-paused={motionOff}
      >
        <Stickers count={count} />
        {shown.map((photoId, i) => {
          const s = SLOTS[i];
          return (
            <div
              key={i}
              className="absolute"
              style={{ top: s.top, left: s.left, width: s.width, zIndex: s.z, transform: `rotate(${s.rotate}deg)` }}
            >
              <div className="float" style={{ '--float-delay': `${-i * 1.3}s`, '--float-duration': `${6.5 + (i % 3)}s` } as CSSProperties}>
                <figure className="snapshot tilt-on-hover" style={{ '--hover-tilt': `${s.tilt}deg` } as CSSProperties}>
                  <CrossfadePhoto photoId={photoId} aspect={s.aspect} />
                </figure>
              </div>
            </div>
          );
        })}
      </div>
      {hasMotion && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="absolute -bottom-6 right-0 z-10 inline-flex items-center gap-2 rounded-full border border-line bg-white/95 px-3.5 py-1.5 text-sm font-semibold text-navy shadow-sm hover:border-brand hover:text-brand"
        >
          {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
          {paused ? 'Play photo motion' : 'Pause photo motion'}
        </button>
      )}
    </div>
  );
}

/** Fades a new photo in over the old one when the slot's photo changes. */
function CrossfadePhoto({ photoId, aspect }: { photoId: string; aspect: string }) {
  const [layers, setLayers] = useState([{ id: photoId, key: 0, ready: true }]);

  useEffect(() => {
    setLayers((ls) => {
      const top = ls[ls.length - 1];
      return top.id === photoId ? ls : [top, { id: photoId, key: top.key + 1, ready: false }];
    });
  }, [photoId]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-tint" style={{ aspectRatio: aspect }}>
      {layers.map((l, i) => {
        const isTop = i === layers.length - 1;
        return (
          <div
            key={l.key}
            aria-hidden={!isTop}
            className={cn('absolute inset-0', i > 0 && (l.ready ? 'photo-layer-enter' : 'opacity-0'))}
            onAnimationEnd={() => setLayers((ls) => ls.slice(-1))}
          >
            <Photo
              id={l.id}
              loading="eager"
              sizes="300px"
              className="h-full w-full"
              alt={isTop ? undefined : ''}
              onLoad={() => setLayers((ls) => ls.map((x) => (x.key === l.key ? { ...x, ready: true } : x)))}
            />
          </div>
        );
      })}
    </div>
  );
}

/** Phones and tablets: a swipeable row of snapshots under the title. */
function MobilePhotoRow() {
  return (
    <div className="-mx-5 sm:-mx-8 lg:hidden">
      <ul
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-3 pb-8 sm:px-8 [scrollbar-width:none]"
        aria-label="Club photos — swipe to see more"
        tabIndex={0}
      >
        {heroCollage.photos.map((id, i) => (
          <li
            key={id}
            className="snapshot w-[68%] max-w-[300px] shrink-0 snap-center"
            style={{ transform: `rotate(${i % 2 ? 2.5 : -2.5}deg)` }}
          >
            <Photo id={id} className="aspect-[4/3]" sizes="(min-width: 640px) 300px, 68vw" loading={i < 2 ? 'eager' : 'lazy'} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Underline({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 14" preserveAspectRatio="none" className={cn('h-3', className)}>
      <path d="M3 9c40-6 80-7 120-4s90 5 174-3" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Small original doodles scattered between the photos. */
function Stickers({ count }: { count: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* teal plus */}
      <svg viewBox="0 0 40 40" className="float absolute top-[46%] -left-[4%] h-9 w-9 text-teal" style={{ '--float-delay': '-2s' } as CSSProperties}>
        <path d="M20 6v28M6 20h28" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>
      {/* green ring */}
      <svg viewBox="0 0 40 40" className="float absolute top-[2%] left-[50%] h-10 w-10 text-health" style={{ '--float-delay': '-4s' } as CSSProperties}>
        <circle cx="20" cy="20" r="13" fill="none" stroke="currentColor" strokeWidth="6" />
      </svg>
      {/* heartbeat line */}
      <svg
        viewBox="0 0 120 40"
        className={cn('float absolute h-10 w-28 text-brand', count >= 6 ? 'top-[47%] right-[-6%]' : 'bottom-[4%] left-[38%]')}
        style={{ '--float-delay': '-1s' } as CSSProperties}
      >
        <path d="M4 22h26l8-14 10 26 10-20 6 8h52" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* sparkle */}
      <svg viewBox="0 0 40 40" className="float absolute top-[42%] right-[-3%] h-8 w-8 text-brand" style={{ '--float-delay': '-3s' } as CSSProperties}>
        <path d="M20 3c1.5 9 6 15.5 17 17-11 1.5-15.5 8-17 17-1.5-9-6-15.5-17-17 11-1.5 15.5-8 17-17Z" fill="currentColor" />
      </svg>
      {/* small teal dot cluster */}
      <svg viewBox="0 0 40 40" className="float absolute bottom-[-2%] left-[4%] h-8 w-8 text-teal" style={{ '--float-delay': '-5s' } as CSSProperties}>
        <circle cx="10" cy="10" r="5" fill="currentColor" />
        <circle cx="28" cy="16" r="4" fill="currentColor" />
        <circle cx="16" cy="30" r="3.5" fill="currentColor" />
      </svg>
    </div>
  );
}
