import { useEffect, useState } from 'react';
import { site } from '../content/site';

/** True when the visitor has asked their OS/browser to reduce motion. */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** True while the browser tab is visible. */
export function usePageVisible() {
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);
  return visible;
}

/** Sets the document title and meta description for a page. */
export function usePageMeta(title: string | undefined, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : site.name;
    const desc = description ?? site.description;
    document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title ?? site.name);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);
  }, [title, description]);
}
