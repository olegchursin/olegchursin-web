/** Source: LinkedIn profile export, October 2026. */

export interface Role {
  readonly title: string;
  readonly company: string;
  readonly url?: string;
  readonly start: string; // YYYY-MM
  readonly end?: string; // YYYY-MM; omitted = current
  readonly summary?: string;
}

const AON = 'https://www.aon.com/cyber-solutions/';

/** Software career, newest first. */
export const career: readonly Role[] = [
  {
    title: 'Senior Software Engineering Manager',
    company: 'Aon',
    url: AON,
    start: '2026-03',
    summary:
      'Enterprise AI, AI security, spec-driven development and AI-assisted engineering tooling, while staying hands-on across the frontend stack.'
  },
  {
    title: 'Lead Software Engineer',
    company: 'Aon',
    url: AON,
    start: '2024-03',
    end: '2026-03',
    summary:
      'Technical owner of CyQu, Aon’s cyber risk assessment and eSubmission platform, deployed across the Americas, EMEA and APAC.'
  },
  {
    title: 'Senior Software Engineer',
    company: 'Aon',
    url: AON,
    start: '2022-03',
    end: '2024-04'
  },
  {
    title: 'Software Engineer',
    company: 'Aon',
    url: AON,
    start: '2018-11',
    end: '2022-03'
  },
  {
    title: 'Software Engineer',
    company: 'Philosophie',
    url: 'https://www.philosophie.is/',
    start: '2018-04',
    end: '2018-11',
    summary:
      'Front-end consulting for clients in React, JavaScript and TypeScript.'
  },
  {
    title: 'Web Developer and Founder',
    company: 'Human Interaction',
    start: '2012-07',
    end: '2021-07',
    summary:
      'UX/UI design and front-end development for New York small businesses.'
  }
];

/** Before software, newest first. */
export const earlier: readonly Role[] = [
  {
    title: 'Marketing Communications Manager',
    company: 'Institute for Bilingual Research',
    start: '2010-10',
    end: '2017-09'
  },
  {
    title: 'Digital Marketing Consultant',
    company: 'Soriano GRP',
    start: '2010-08',
    end: '2013-08'
  },
  {
    title: 'Project Manager, Web Development',
    company: 'Art Kerosene',
    start: '2010-09',
    end: '2012-07'
  },
  {
    title: 'Editor in Chief',
    company: 'Oda-Media',
    start: '2007-02',
    end: '2009-07',
    summary: 'Launched the regional newspaper “PRosto gorod” with a team of 28.'
  },
  {
    title: 'Research Fellow, Assistant Professor',
    company: 'Pyatigorsk State University',
    start: '2006-09',
    end: '2009-07',
    summary: 'Postdoctoral research in cognitive semantics; taught English.'
  },
  {
    title: 'Desktop Support Technician, Graphic Designer',
    company: 'No Limits',
    start: '2002-09',
    end: '2003-05'
  }
];

export interface Study {
  readonly school: string;
  readonly degree: string;
  readonly years: string;
}

export const education: readonly Study[] = [
  {
    school: 'New York University',
    degree: 'Strategies for Digital Marketing',
    years: '2014'
  },
  {
    school: 'Flatiron School',
    degree: 'Software Engineering',
    years: '2017–2018'
  },
  {
    school: 'Baruch College, CUNY',
    degree: 'Postgraduate Certificate, Finance and Investments',
    years: '2010–2011'
  },
  {
    school: 'Pyatigorsk State Linguistic University',
    degree: 'PhD, Cognitive Linguistics',
    years: '2006–2009'
  },
  {
    school: 'Pyatigorsk State Linguistic University',
    degree: 'BA with honors, Linguistics; minor in Psychology',
    years: '2001–2006'
  }
];

export const stack: readonly string[] = [
  'TypeScript',
  'JavaScript',
  'Web Components',
  'Lit',
  'StencilJS',
  'Angular',
  'React',
  'Node',
  'Python',
  'Django',
  'SQL',
  'Postgres',
  'AWS',
  'AI-assisted engineering',
  'Git',
  'HTML',
  'CSS',
  'Figma',
  'Adobe Ps, Ai, Id, Lr'
];

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

/** "Mar 2022" */
export function formatMonth(ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** "2022–now", "2018–2022", "2018" */
export function yearRange(role: Role): string {
  const a = role.start.slice(0, 4);
  if (!role.end) return `${a}–now`;
  const b = role.end.slice(0, 4);
  return a === b ? a : `${a}–${b}`;
}

/** First year in software (the earliest start in `career`). */
export const softwareSince = Math.min(
  ...career.map(r => Number(r.start.slice(0, 4)))
);
