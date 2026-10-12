/**
 * Site-wide settings and page text.
 *
 * Anything flagged `sample: true` is placeholder text and shows a visible
 * "Sample" badge on the site. Replace it with real club information, then
 * delete the `sample: true` line.
 */

export const site = {
  name: 'Engineering World Health at UC San Diego',
  shortName: 'EWH at UCSD',
  /** Used in browser tabs and search results. */
  description:
    'Engineering World Health at UC San Diego is a student organization focused on engineering for global health.',

  /**
   * Where the "Join Us" buttons go — e.g. a Google Form, Discord invite,
   * or mailing-list sign-up. Leave as '' until you have a link: the buttons
   * then show as "link coming soon" instead of a broken or misleading link.
   */
  joinUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScg3GvUGmC_cHvV8LUHTU_eP9UUIrfPjM_xgrE2Y8q2buU79w/viewform',

  /**
   * While `open` is true, an "applications open" bar appears at the top of
   * every page and a badge appears above the homepage title, both linking
   * to joinUrl. Set to false when applications close.
   */
  applications: { open: true, message: 'Currently accepting applications!' },

  /**
   * Donation page link. The Donate button only appears once this is set.
   */
  donateUrl: '',

  /** Optional contact email shown in the footer. Leave '' to hide. */
  contactEmail: 'ewh.at.ucsd1@gmail.com',

  /** Main place for club updates — linked from the About, Events, and Join sections. */
  instagram: { handle: '@ewh.at.ucsd', url: 'https://www.instagram.com/ewh.at.ucsd/' },

  /** Social links shown in the footer. Remove or add entries as needed. */
  socials: [{ label: 'Instagram (@ewh.at.ucsd)', url: 'https://www.instagram.com/ewh.at.ucsd/' }] as {
    label: string;
    url: string;
  }[],

  /** The national Engineering World Health organization. */
  parentOrg: { label: 'Engineering World Health (national organization)', url: 'https://www.ewh.org' },

  /**
   * Shows a thin notice bar listing missing setup (e.g. the Join Us link)
   * and how much sample content is left. Set to false before launch.
   */
  showSetupNotice: true,
};

/** Homepage hero text. */
export const hero = {
  titleLine1: 'Engineering World Health',
  titleLine2: 'at UC San Diego',
  tagline: 'A UC San Diego student organization focused on engineering for global health.',
};

interface AboutSection {
  /** Marks placeholder text. Shows a visible "Sample" badge. */
  sample?: boolean;
  heading: string;
}

/**
 * Short highlights shown as a strip on the homepage.
 * `value` is the big text; `label` is the line under it.
 */
export const highlights: { value: string; label: string }[] = [
  { value: '2 years', label: 'in a row as Rice 360 competition semi-finalists' },
  { value: 'Year-long', label: 'projects: fall research, winter design, spring build + test' },
  { value: '7–10', label: 'members on each project team (roughly — it depends on the team lead)' },
];

/** Mission and About page text. */
export const about: {
  mission: AboutSection & { text: string };
  highlight: AboutSection & { text: string };
  chapter: AboutSection & { paragraphs: string[] };
  projectYear: AboutSection & { phases: { term: string; title: string }[] };
  workshops: AboutSection & { text: string; skills: string[] };
  getInvolved: AboutSection & { steps: { title: string; text: string; link?: { label: string; url: string } }[] };
} = {
  mission: {
    heading: 'Our mission',
    text:
      "EWH at UC San Diego focuses on improving the state of global healthcare by spreading awareness, and developing members' interdisciplinary engineering skills required to design low-resource medical devices. We offer students the opportunity to develop engineering research and design skills, communication skills, and the chance contribute to solving vital international medical problems.",
  },
  highlight: {
    heading: 'Rice 360 semi-finalists, two years running',
    text:
      'Two years in a row, our teams have been semi-finalists in the Rice 360 competition and have presented our projects in person and virtually at Rice University!',
  },
  chapter: {
    heading: 'Project teams',
    paragraphs: [
      'Project team members work on year-long student-led projects, each addressing a specific medical need found in low-resource areas.',
      'Project topics are chosen by project team leads (PTLs). Each team has roughly 7–10 members, depending on the PTL’s preference.',
    ],
  },
  projectYear: {
    heading: 'A year on a project team',
    phases: [
      { term: 'Fall', title: 'Research' },
      { term: 'Winter', title: 'Design' },
      { term: 'Spring', title: 'Build + test' },
    ],
  },
  workshops: {
    heading: 'Workshops',
    text: 'We run workshops throughout the year to help members build technical skills.',
    skills: ['CAD', 'Soldering', '3D printing', 'Laser cutting'],
  },
  getInvolved: {
    heading: 'How to get involved',
    steps: [
      {
        title: 'Join a project team',
        text: 'Work with a team of roughly 7–10 students on a year-long project addressing a specific medical need.',
      },
      {
        title: 'Come to a workshop',
        text: 'Build hands-on technical skills like CAD, soldering, 3D printing, and laser cutting.',
      },
      {
        title: 'Follow us on Instagram',
        text: 'Instagram is the best way to stay updated on what the club is doing.',
        link: { label: '@ewh.at.ucsd', url: 'https://www.instagram.com/ewh.at.ucsd/' },
      },
    ],
  },
};

/**
 * FREQUENTLY ASKED QUESTIONS — shown on the homepage and About page.
 * In answers, blank lines start new paragraphs and lines starting with
 * "- " become bullet points.
 */
export const faq: { question: string; answer: string }[] = [
  {
    question: 'Will club meetings work with my class schedule?',
    answer: 'Timings are flexible — your PTL will set meeting times using When2meet.',
  },
  {
    question: 'What is the time commitment?',
    answer:
      '- Fall: 1 hour a week of team meetings, and 2–3 hours of research a week max\n' +
      '- Winter/Spring: 2–3 hours a week of team meetings minimum — you can put in as much as you want into building the device',
  },
  {
    question: 'Are there software positions?',
    answer:
      'Yes! Projects tend to have a coding aspect associated with sensing or motors. Even if a project doesn’t explicitly say software, if you can think of a way to integrate it, you can!',
  },
];
