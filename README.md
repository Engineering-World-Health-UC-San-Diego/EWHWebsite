# EWHWebsite

Super cool EWH Website!!!

The website for **Engineering World Health at UC San Diego**. It's a static site built with React, TypeScript, Tailwind CSS, and Vite, made to be hosted on GitHub Pages. There's no database or backend: all content lives in a few editable files in [`src/content/`](src/content/).

---

## Contents

1. [Run and preview the site locally](#1-run-and-preview-the-site-locally)
2. [Where everything lives](#2-where-everything-lives)
3. [Edit the mission statement and other text](#3-edit-the-mission-statement-and-other-text)
4. [Replace images and update the hero collage](#4-replace-images-and-update-the-hero-collage)
5. [Add projects](#5-add-projects)
6. [Add events](#6-add-events)
7. [Add design review slides](#7-add-design-review-slides)
8. [Set the Join Us (and Donate) link](#8-set-the-join-us-and-donate-link)
9. [Deploy to GitHub Pages](#9-deploy-to-github-pages)
10. [Before launch checklist](#10-before-launch-checklist)

---

## 1. Run and preview the site locally

You need [Node.js](https://nodejs.org/) 20 or newer (22 LTS recommended).

```bash
npm install        # first time only
npm run dev        # live-reloading dev server
```

Open the URL it prints, normally **http://localhost:5173/EWHWebsite/**. (The `/EWHWebsite/` part matches the GitHub Pages address; see [section 9](#9-deploy-to-github-pages).) Edits to any file show up in the browser right away.

To check the real production build:

```bash
npm run build      # type-checks and builds into dist/
npm run preview    # serves dist/ at http://localhost:4173/EWHWebsite/
```

If `npm run build` fails, it prints the file and line to fix. The most common cause is a typo in a content file, such as a missing comma or quote.

---

## 2. Where everything lives

| What | File |
| --- | --- |
| Site name, Join/Donate links, contact, socials, mission & About text, hero text | [`src/content/site.ts`](src/content/site.ts) |
| Photo library (file, alt text, crop) and hero collage | [`src/content/photos.ts`](src/content/photos.ts) |
| Projects | [`src/content/projects.ts`](src/content/projects.ts) |
| Events | [`src/content/events.ts`](src/content/events.ts) |
| Design reviews | [`src/content/reviews.ts`](src/content/reviews.ts) |
| Design review PDFs | [`public/reviews/`](public/reviews/) |
| Colors and fonts (design tokens) | [`src/index.css`](src/index.css) (`@theme` block) |
| Pages / components | `src/pages/`, `src/components/` |

Each content file has comments at the top explaining every field. The field definitions are in [`src/content/types.ts`](src/content/types.ts). If you misspell a field name, `npm run build` will tell you.

### Sample content

Placeholder text is marked with `sample: true`. Anything marked this way shows a visible **"Sample content"** badge on the site. Once you replace an item with real information, delete its `sample: true` line.

---

## 3. Edit the mission statement and other text

Open [`src/content/site.ts`](src/content/site.ts):

- `about.mission.text`: the mission statement, shown on the homepage and About page. **Use the official Engineering World Health wording.**
- `about.highlight`: the Rice 360 callout on the About page.
- `about.chapter`: the "Project teams" introduction on the About page. Each string in `paragraphs` is one paragraph.
- `about.projectYear.phases`: the Fall / Winter / Spring timeline.
- `about.workshops`: workshop text and the list of skills.
- `about.getInvolved.steps`: the "How to get involved" steps (each can have an optional `link`).
- `highlights`: the three quick facts in the navy strip on the homepage.
- `site.instagram`: the Instagram handle and link used in the Join section and on the Events page.
- `faq`: the Frequently asked questions shown on the homepage and About page (answers support paragraphs and `- ` bullets).
- `hero`: the homepage title and the line under it.
- `site.description`: used in the footer and in search-engine descriptions.
- `site.contactEmail` and `site.socials`: shown in the footer when filled in. For example:

  ```ts
  socials: [
    { label: 'Instagram', url: 'https://instagram.com/...' },
    { label: 'Discord', url: 'https://discord.gg/...' },
  ],
  ```

Remove `sample: true` from each section once it has real text.

---

## 4. Replace images and update the hero collage

All photos are listed once in [`src/content/photos.ts`](src/content/photos.ts) and referred to everywhere else by **id**:

```ts
'valley-river': {
  file: 'img1.jpeg',                         // file in the repo root or in /photos
  alt: 'Granite cliffs rising above ...',   // describe what the photo shows
  caption: 'Granite cliffs above ...',       // optional, shown in galleries
  focus: '50% 45%',                          // optional crop focus (x% y%)
},
```

**To swap a photo everywhere:** change its `file` (and update `alt`).

**To add a new photo:**

1. Put the image in a `photos/` folder at the repo root (create it if needed), or in the repo root. JPG, PNG, or WebP all work.
2. Add an entry to `photos` with a new id, the file name, and accurate alt text.
3. Use that id wherever you want it: `coverPhoto`, `photos`, `gallery`, or the hero collage.

You don't need to resize anything. At build time, every photo is automatically converted to compressed, responsive WebP sizes, with the original kept as a fallback. Original files are never modified.

**Crops:** cards and the collage crop photos to fixed shapes. If an important part gets cut off, adjust `focus`. For example, `'50% 20%'` keeps more of the top and `'80% 50%'` keeps more of the right side.

**Hero collage:** edit `heroCollage` in the same file:

```ts
export const heroCollage = {
  photos: ['hilltop-arms-raised', 'lakeside-tent-sunrise', ...], // pool of photo ids
  visibleCount: 5,  // snapshots on screen at once on desktop (4–6)
  cycleSeconds: 5,  // seconds between swaps
};
```

When the pool has more photos than `visibleCount`, the extras slowly rotate in, one snapshot at a time. Add more ids to grow the pool; the layout stays the same. On phones, the hero shows all pool photos as a swipeable row instead. Visitors can pause all motion, and it's turned off automatically for people who prefer reduced motion.

**Logo:** the logo is `EWHUCSD_logo.png` in the repo root. To replace it, overwrite that file with the same name. Resized copies are made at build time. If the new file has different proportions, update the `width`/`height` numbers in [`src/components/Logo.tsx`](src/components/Logo.tsx).

---

## 5. Add projects

Copy an entry in [`src/content/projects.ts`](src/content/projects.ts) and edit it:

```ts
{
  slug: 'portable-ultrasound-device',     // URL: /projects/portable-ultrasound-device
  name: 'Portable Ultrasound Device',
  summary: 'One or two sentences for the card.',
  status: 'current',                      // 'current' or 'past'
  statusLabel: 'Current project',         // short label on the card
  academicYear: '2026–27',                // or '2026–28' for multi-year projects
  coverPhoto: 'some-photo-id',            // from photos.ts
  featured: true,                         // show on the homepage
  topics: ['CAD', 'Electronics'],         // optional tags
  overview: 'Optional general description.',
  problem: 'The need / problem statement.',
  solution: 'The proposed solution.

- Bullet one
- Bullet two',
  progress: [
    { date: '2026-10-15', text: 'Finished needs assessment.' },
  ],
  photos: ['some-photo-id'],              // optional gallery (photos of this project only)
  links: [{ label: 'Project poster', url: 'https://...' }],  // optional
},
```

`overview`, `problem`, `solution`, `progress`, `photos`, and `links` are all optional. Sections without content are left off the project page (current projects always show a Progress section, with "updates will be posted here" until you add some). In text fields, a blank line (`

`) starts a new paragraph, and lines starting with `- ` become bullet points.

When a project wraps up, change `status` to `'past'`. It moves to the Past projects section automatically. Design reviews for the project appear on its page automatically (see [section 7](#7-add-design-review-slides)).

---

## 6. Add events

Copy an entry in [`src/content/events.ts`](src/content/events.ts):

```ts
{
  slug: 'winter-gbm-1',                     // URL: /events/winter-gbm-1
  title: 'Winter General Body Meeting',
  start: '2027-01-13T18:00',                // San Diego local time
  end: '2027-01-13T19:30',                  // optional (default: 1 hour)
  location: 'Price Center West Ballroom',
  summary: 'Optional one line for calendar invites.',
  description: 'Optional longer text.\n\nA blank line starts a new paragraph.',
  coverPhoto: 'some-photo-id',
  rsvpUrl: 'https://forms.gle/...',         // optional RSVP button
},
```

- **Times** are always San Diego time (America/Los_Angeles), written as `YYYY-MM-DDTHH:mm` with no time zone. Daylight saving time is handled for you.
- **Upcoming vs. past** is automatic based on today's date. You never need to move events between lists.
- **Add to calendar** (Google, Outlook, and an `.ics` file for Apple Calendar and others) works on every upcoming event page with no setup.
- **Recaps:** after an event, add a `recap` (text) and a `gallery` (photo ids). Its page becomes a recap page, and it appears in the Past events archive on the Events page and the homepage.

---

## 7. Add design review slides

Add an entry to [`src/content/reviews.ts`](src/content/reviews.ts):

```ts
{
  id: 'tb-screening-preliminary-2026',       // unique
  project: 'tb-screening-device',            // a project slug
  title: 'Preliminary Design Review',
  date: '2026-11-12',
  academicYear: '2026–27',
  stage: 'Preliminary',                      // optional
  description: 'Optional summary.',
  slidesUrl: 'https://docs.google.com/presentation/d/XXXX/edit?usp=sharing',
  pdf: 'reviews/tb-screening-preliminary-2026.pdf',
},
```

Provide `slidesUrl`, `pdf`, or both:

- **Google Slides:** paste the normal share link. In Google Slides, set **Share → General access → Anyone with the link → Viewer**, or else visitors can't see the slides. The site shows a **View slides** button and an optional in-page preview.
- **PDF:** export the deck as PDF, save it in `public/reviews/`, and set `pdf: 'reviews/<file name>.pdf'` (no leading slash). The site shows **View**, **Download PDF**, and an optional in-page preview. A full `https://` link to a PDF hosted elsewhere also works.
- If neither is set, the entry is listed with "Slides haven't been uploaded yet."

Reviews show up on the Design Reviews page (filterable by project and academic year) and on the matching project's page. There's a commented-out example at the top of `reviews.ts` to copy from.

---

## 8. Set the Join Us (and Donate) link

In [`src/content/site.ts`](src/content/site.ts):

```ts
joinUrl: 'https://forms.gle/your-form',   // Google Form, Discord invite, mailing list…
donateUrl: '',                            // leave '' to hide the Donate button
```

- `applications.open`: while `true`, a "Currently accepting applications!" bar appears at the top of every page and a badge appears above the homepage title, both linking to `joinUrl`. Set it to `false` when applications close (the Join Us buttons stay).
- While `joinUrl` is empty, every **Join Us** button shows as a dashed, non-clickable **"link coming soon"** placeholder, so visitors never hit a dead link. Once it's set, all of them (nav, hero, footer, the end of pages) become working links.
- The **Donate** button only appears once `donateUrl` is set.
- The navy **Preview notice** bar at the top lists missing setup. Turn it off before launch with `showSetupNotice: false`.

---

## 9. Deploy to GitHub Pages

Nothing deploys automatically right now. When you're ready:

### Repository subpath (`BASE_PATH`)

GitHub Pages serves project sites from a subpath:

```
https://engineering-world-health-uc-san-diego.github.io/EWHWebsite/
```

The site is configured for that `/EWHWebsite/` path by default (see `base` in [`vite.config.ts`](vite.config.ts)). Every asset and link adjusts automatically. To build for a different path, set `BASE_PATH`:

```bash
BASE_PATH=/some-other-repo-name/ npm run build   # if the repository is renamed
BASE_PATH=/ npm run build                        # custom domain (e.g. ewh-ucsd.org)
```

(On Windows PowerShell: `$env:BASE_PATH='/'; npm run build`.)

### How page links work on GitHub Pages

GitHub Pages can't route URLs to a single-page app, so the build writes a copy of the page at every route (`about/index.html`, `projects/<slug>/index.html`, `events/<slug>/index.html`, …) plus a `404.html` fallback. Direct links and page refreshes work on every page, and each copy has the right browser-tab title. New projects and events are picked up automatically on the next build.

### Option A: GitHub Actions (recommended)

1. Copy [`docs/deploy-github-pages.example.yml`](docs/deploy-github-pages.example.yml) to `.github/workflows/deploy.yml`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Commit and push to `main`. Each push then rebuilds and publishes the site. Progress shows in the **Actions** tab.

The workflow sets `BASE_PATH` from the repository name automatically.

### Option B: Manual

Run `npm run build` and publish the `dist/` folder to a `gh-pages` branch (for example with the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package). Then choose **Deploy from a branch → gh-pages** in Settings → Pages.

### Custom domain

Add a `public/CNAME` file containing the domain (e.g. `ewh-ucsd.org`), configure DNS as described in GitHub's Pages docs, and build with `BASE_PATH=/` (in the workflow, change the `BASE_PATH` line to `BASE_PATH: /`).

---

## 10. Before launch checklist

- [ ] `joinUrl` set; `donateUrl` set if the club accepts donations
- [ ] Design review slides added
- [ ] Club and project photos added, with accurate alt text, and the hero collage and project `coverPhoto`s updated. The six current photos are outdoor landscape images, not club photos. Make sure you have the rights to use every image.
- [ ] `showSetupNotice: false`
- [ ] `npm run build` succeeds and `npm run preview` looks right
