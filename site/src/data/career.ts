export interface Role {
  readonly title: string;
  readonly company: string;
  readonly url: string;
  readonly start: string; // YYYY-MM
  readonly end?: string; // YYYY-MM; omitted = current
  readonly summary?: string;
}

export const career: readonly Role[] = [
  {
    title: 'Senior Software Developer',
    company: 'Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    start: '2022-03',
    summary: 'Cyber insurance tools, including the CyQu cyber risk evaluation.'
  },
  {
    title: 'Software Developer',
    company: 'Aon Cyber Solutions',
    url: 'https://www.aon.com/cyber-solutions/',
    start: '2018-11',
    end: '2022-03',
    summary: 'Cyber risk and insurance products.'
  },
  {
    title: 'Software Engineer',
    company: 'Philosophie',
    url: 'https://www.philosophie.is/',
    start: '2018-04',
    end: '2018-11'
  },
  {
    title: 'Web Developer and Founder',
    company: 'Human Interaction',
    url: 'https://github.com/olegchursin',
    start: '2012-07',
    end: '2018-11'
  }
];

export const stack: readonly string[] = [
  'TypeScript',
  'JavaScript',
  'Lit',
  'Web Components',
  'StencilJS',
  'Angular',
  'React',
  'Node',
  'Python',
  'Django',
  'SQL',
  'Postgres',
  'AWS',
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
