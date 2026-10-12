import type { Project } from './types.ts';

/**
 * PROJECTS
 *
 * - status: 'current' or 'past'
 * - featured: true to show it in the homepage "Featured projects" section
 * - coverPhoto: an id from photos.ts. The current cover photos are
 *   decorative landscape images, not photos of the projects — replace them
 *   with real project photos when available.
 * - overview / problem / solution: optional; sections without text are
 *   hidden. Blank lines start new paragraphs; lines starting with "- "
 *   become bullet points.
 * - Design review slides are linked automatically from reviews.ts using
 *   the project slug.
 */
export const projects: Project[] = [
  // ---------- Current projects, 2026–27 ----------
  {
    slug: 'tb-screening-device',
    name: 'TB Screening Device',
    summary:
      'Streamlining tuberculosis sputum processing and molecular testing into one system, to increase access to testing without trips to a central laboratory.',
    status: 'current',
    statusLabel: 'Advanced project',
    academicYear: '2026–28',
    coverPhoto: 'mountain-sunset',
    featured: true,
    topics: ['TB-LAMP chemistry', 'Electronics/circuitry', 'Fabrication', 'CAD'],
    problem:
      'TB diagnosis often depends on sputum testing, but thick, uneven sputum must be processed before reliable molecular testing. In 2024, an estimated 10.7 million people developed TB and 1.23 million died from it. More than 80% of TB cases and deaths occur in low- and middle-income countries (LMICs). Access to rapid molecular testing is also uneven: only 8 of the 30 high-TB-burden countries reported rapid diagnostics at more than half of TB diagnostic sites in 2024. Streamlining the testing process in one system can increase access to testing without needing trips to a larger, central laboratory.',
  },
  {
    slug: 'accessibility-app',
    name: 'Accessibility App',
    summary:
      'Addressing the need for accurate, accessibility-minded routes to campus locations for UCSD students with mobility impairments.',
    status: 'current',
    statusLabel: 'Current project',
    academicYear: '2026–27',
    coverPhoto: 'valley-river',
    featured: true,
    problem:
      'Navigating through UCSD, especially La Jolla, demands significant physical effort and time. Steep hills, long staircases, and ongoing campus instruction has become taxing on students with mobile impairments, no matter how severe. A 10 minute trip can turn into 30. Without accurate routes to campus locations that have accessibility in mind, everyday tasks become exhausting and too demanding for students.',
  },
  {
    slug: 'portable-ultrasound-device',
    name: 'Portable Ultrasound Device',
    summary:
      'Addressing the high maintenance costs and limited portability of ultrasound devices, which delay scans in rural areas.',
    status: 'current',
    statusLabel: 'Current project',
    academicYear: '2026–27',
    coverPhoto: 'ridge-picnic-table',
    featured: true,
    problem:
      'Ultrasounds are noninvasive imaging tests that are able to show tissue and blood flow inside of the body. They are often used for pregnancy scans but can also have many other medical applications. Ultrasounds are complex devices which have high maintenance costs and can be difficult to move, especially in rural areas. This leads to delay in receiving scans due to lack of funds or ability to reach a device in rural areas.',
  },
  {
    slug: 'modular-first-aid-kit',
    name: 'Modular First Aid Kit',
    summary:
      'Addressing gaps in first aid kit access, familiarity, and completeness — at home and during activities like hiking or camping.',
    status: 'current',
    statusLabel: 'Current project',
    academicYear: '2026–27',
    coverPhoto: 'tent-with-dog',
    featured: true,
    problem:
      'Despite being considered the most accessible form of medical care for civilians and laypersons, 44% of US households lack a first aid kit entirely. Worse still, even those with first aid kits aren’t entirely familiar with what they stock, with only 5% maintaining a fully stocked, properly maintained emergency preparedness kit. Additionally, when undergoing risky activities such as hiking or camping, field studies show that the average group carries only 48% of the recommended medical supplies.',
  },
  {
    slug: 'wearable-tremor-monitor',
    name: 'Wearable Tremor and Motor-Function Monitor',
    summary:
      'Addressing the gap between short clinical appointments and Parkinson’s motor symptoms that fluctuate throughout the day.',
    status: 'current',
    statusLabel: 'Current project',
    academicYear: '2026–27',
    coverPhoto: 'hilltop-arms-raised',
    featured: true,
    problem:
      'Parkinson’s disease causes motor symptoms such as tremor and bradykinesia that can fluctuate throughout the day, while clinical appointments provide only short snapshots of a patient’s movement.',
  },

  // ---------- Past projects, 2025–26 ----------
  {
    slug: 'emg-muscle-monitor',
    name: 'EMG Muscle Monitor',
    summary:
      'A low-cost portable EMG muscle monitor with modular electrodes that detect and display muscle activation in real time.',
    status: 'past',
    statusLabel: 'Past project',
    academicYear: '2025–26',
    coverPhoto: 'tent-with-dog',
    problem:
      'Many people, including elders and athletes, face challenges in maintaining muscle health due to limited access to reliable monitoring tools, especially in low-income countries.\n\nA more accessible and affordable approach is needed to help people better understand and protect their muscle health.',
    solution:
      'A low-cost portable EMG muscle monitor with modular electrodes that detect and display muscle activation in real time.',
  },
  {
    slug: 'io-needle',
    name: 'IO Needle',
    summary:
      'A simple-to-use IO needle/drill to quickly access the vascular system through the bone marrow when an IV line isn’t an option.',
    status: 'past',
    statusLabel: 'Past project',
    academicYear: '2025–26',
    coverPhoto: 'mountain-sunset',
    problem:
      'An IV line can be unobtainable, too slow, or inefficient in emergencies and for patients with certain conditions.',
    solution:
      'An IO Needle/Drill that is simple to use/to learn to use that can quickly gain access to the vascular system through the bone marrow (to supply medications or fluids).',
  },
  {
    slug: 'mental-health-app',
    name: 'Mental Health App',
    summary:
      'An app where adolescents collect digital pets by completing daily challenges that build self-esteem, emotional intelligence, and self-awareness.',
    status: 'past',
    statusLabel: 'Past project',
    academicYear: '2025–26',
    coverPhoto: 'hilltop-arms-raised',
    problem:
      'Among adolescents, a big driver of depression and anxiety is social media use. Despite social media’s negative effects, many users find social media difficult to disengage.',
    solution:
      'Rather than blocking negative content (which is often easily bypassable), the app encourages the development of adaptive behaviors and psychological skills.\n\nThe core premise of the application is that users collect digital pets by completing daily tasks to build self-esteem, emotional intelligence, and self-awareness. These competencies have been shown to foster emotional resilience and protect against the development of mental health pathology. Each day, users receive three daily challenges such as taking a walk or complimenting a stranger.',
  },
  {
    slug: 'hemiplegia-arm-rehabilitation-device',
    name: 'Hemiplegia Arm Rehabilitation Device',
    summary:
      'An affordable device that lets stroke survivors with spasticity perform arm rehabilitation exercises independently at home.',
    status: 'past',
    statusLabel: 'Past project',
    academicYear: '2025–26',
    coverPhoto: 'ridge-picnic-table',
    problem:
      'Each year, numerous stroke survivors develop spasticity, which limits their muscle movement. Patients often rely on occupational or physical therapy, but frequent clinic visits can be inconvenient.',
    solution:
      '- Design an affordable device that allows people to perform rehabilitation independently at home\n- Assist patients in performing elbow flexion and arm pronation exercises\n- Integrate force and angle measurement systems for quantitative monitoring of patient progress',
  },

  // ---------- Past projects, 2024–25 ----------
  {
    slug: 'wearable-air-quality-monitor',
    name: 'Wearable Air Quality Monitor',
    summary:
      'Detecting air pollution levels using a metal-oxide sensor and alerting individuals when air quality reaches hazardous levels.',
    status: 'past',
    statusLabel: 'Past project',
    academicYear: '2024–25',
    coverPhoto: 'valley-river',
    overview:
      'Detecting air pollution levels using a metal-oxide sensor and alerting individuals when air quality reaches hazardous levels.',
  },
  {
    slug: 'prosthetic-hand',
    name: 'Prosthetic Hand',
    summary: 'Developing a solution for individuals with transradial amputations.',
    status: 'past',
    statusLabel: 'Past project',
    academicYear: '2024–25',
    coverPhoto: 'hilltop-arms-raised',
    overview:
      'Developing a solution for individuals with transradial amputations. Using servo motors and fishing lines to control finger flexion movements, aim to enable basic actions such as turning a door knob and playing rock paper scissors.',
  },
  {
    slug: 'surgical-instrument-disinfector',
    name: 'Surgical Instrument Disinfector',
    summary:
      'Reducing the risk of surgical site infections with a two-stage cleaning system for surgical instruments.',
    status: 'past',
    statusLabel: 'Past project',
    academicYear: '2024–25',
    coverPhoto: 'lakeside-tent-sunrise',
    overview:
      'Reducing the risk of surgical site infections by implementing a two-stage cleaning system for surgical instruments integrating ultrasonic cleaning/cavitation, a cleaning solution, and ultraviolet light.',
  },
];
