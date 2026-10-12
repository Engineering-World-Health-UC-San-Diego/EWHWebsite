/**
 * Shared types for the content files in this folder.
 * You normally only need to edit the data files (site.ts, photos.ts,
 * projects.ts, events.ts, reviews.ts) — not this one.
 */

/** A key from the photo library in photos.ts, e.g. "valley-river". */
export type PhotoId = string;

export interface PhotoEntry {
  /**
   * Image file name. Files are looked up in the repository root and in the
   * optional /photos folder, e.g. "img1.jpeg" or "general-meeting-2026.jpg".
   */
  file: string;
  /** Describe what the photo actually shows, for screen-reader users. */
  alt: string;
  /** Optional visible caption used in galleries. */
  caption?: string;
  /**
   * CSS object-position used when the photo is cropped, e.g. "50% 30%".
   * Lower the second number to keep more of the top of the photo.
   */
  focus?: string;
}

export interface ProjectUpdate {
  /** ISO date, e.g. "2026-10-01". */
  date: string;
  text: string;
}

export interface Project {
  /** Used in the URL: /projects/<slug>. Lowercase letters, numbers, dashes. */
  slug: string;
  name: string;
  /** One or two sentences shown on project cards. */
  summary: string;
  /** "current" projects appear first; "past" go to the archive. */
  status: 'current' | 'past';
  /** Short status label shown on the card, e.g. "Prototyping" or "Completed". */
  statusLabel: string;
  /** Academic year(s), e.g. "2026–27" or "2026–28" for multi-year projects. */
  academicYear: string;
  /** Photo used on the card and at the top of the project page. */
  coverPhoto: PhotoId;
  /** Show this project in the homepage "Featured projects" section. */
  featured?: boolean;
  /** Optional subject areas, shown as tags on the project page. */
  topics?: string[];
  /**
   * Long-form text fields. Each is optional — sections without text are
   * left off the project page. Blank lines start new paragraphs; lines
   * beginning with "- " become a bulleted list.
   */
  /** General description, for projects without a separate problem/solution. */
  overview?: string;
  /** The need or problem statement. */
  problem?: string;
  /** The proposed solution or design goals. */
  solution?: string;
  /** Dated progress updates (newest are shown first). */
  progress?: ProjectUpdate[];
  /** Optional photo gallery — only add photos of this project. */
  photos?: PhotoId[];
  /** Optional external links (team doc, poster, repository, …). */
  links?: { label: string; url: string }[];
  /** Marks placeholder content. Shows a visible "Sample" badge. */
  sample?: boolean;
}

export interface ClubEvent {
  /** Used in the URL: /events/<slug>. */
  slug: string;
  title: string;
  /**
   * Local San Diego time (America/Los_Angeles), written as
   * "YYYY-MM-DDTHH:mm" — e.g. "2026-10-21T18:00". No time zone suffix.
   */
  start: string;
  /** Same format as start. Optional; defaults to one hour after start. */
  end?: string;
  location: string;
  /** Optional one-line description, used in calendar invites and search results. */
  summary?: string;
  /** Optional longer description for the event page. Blank lines start new paragraphs. */
  description?: string;
  coverPhoto: PhotoId;
  /** Optional RSVP or sign-up form link. Leave out if there is none. */
  rsvpUrl?: string;
  /** For past events: a short recap shown on the recap page. */
  recap?: string;
  /** For past events: photos for the recap gallery. */
  gallery?: PhotoId[];
  /** Marks placeholder content. Shows a visible "Sample" badge. */
  sample?: boolean;
}

export interface DesignReview {
  /** Unique id, also used for links within the library page. */
  id: string;
  /** Slug of the project in projects.ts this review belongs to. */
  project: string;
  title: string;
  /** ISO date of the review, e.g. "2026-11-12". */
  date: string;
  /** Academic year, e.g. "2026–27". */
  academicYear: string;
  /** Optional label such as "Preliminary", "Midpoint", or "Final". */
  stage?: string;
  description?: string;
  /**
   * A Google Slides link, e.g.
   * "https://docs.google.com/presentation/d/<ID>/edit?usp=sharing".
   * The deck must be shared as "Anyone with the link can view" (or published
   * to the web) for the embed to work.
   */
  slidesUrl?: string;
  /**
   * A PDF placed in public/reviews/, written as "reviews/<file>.pdf"
   * (no leading slash), or a full https:// link to a PDF.
   */
  pdf?: string;
  /** Marks placeholder content. Shows a visible "Sample" badge. */
  sample?: boolean;
}
