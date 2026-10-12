import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';
import { projects } from './src/content/projects.ts';
import { events } from './src/content/events.ts';

/**
 * The URL path the site is served from.
 *
 * GitHub Pages project sites live at https://<org>.github.io/<repo>/, so the
 * default is the repository name. Override without editing this file:
 *   BASE_PATH=/ npm run build            (custom domain or <org>.github.io repo)
 *   BASE_PATH=/other-repo/ npm run build
 */
const base = normalizeBase(process.env.BASE_PATH ?? '/EWHWebsite/');

function normalizeBase(path: string) {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

const SITE_TITLE = 'Engineering World Health at UC San Diego';

/**
 * GitHub Pages has no server-side routing. After the build, write a copy of
 * index.html at every known route (so direct links and refreshes return the
 * page with a 200 status and a sensible <title>), plus 404.html as a
 * catch-all that still boots the app for anything else.
 */
function githubPagesRoutes(): Plugin {
  let outDir = 'dist';
  return {
    name: 'github-pages-routes',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const html = readFileSync(join(outDir, 'index.html'), 'utf8');
      const routes: Record<string, string> = {
        about: 'About',
        projects: 'Projects',
        events: 'Events',
        'design-reviews': 'Design Reviews',
      };
      for (const p of projects) routes[`projects/${p.slug}`] = p.name;
      for (const e of events) routes[`events/${e.slug}`] = e.title;

      const withTitle = (title: string) =>
        html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(`${title} · ${SITE_TITLE}`)}</title>`);

      for (const [route, title] of Object.entries(routes)) {
        const file = join(outDir, route, 'index.html');
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, withTitle(title));
      }
      writeFileSync(join(outDir, '404.html'), withTitle('Page not found'));
    },
  };
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), imagetools(), githubPagesRoutes()],
});
