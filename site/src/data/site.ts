export const site = {
  name: 'Oleg Chursin',
  url: 'https://olegchursin.com',
  description:
    'Oleg Chursin is a Senior Software Engineering Manager at Aon in Brooklyn, New York, with a background in graphic design and cognitive linguistics. Writing, work and photography.',
  locale: 'en-US',
  place: 'Brooklyn, New York',
  coordinates: '40.67° N, 73.98° W'
} as const;

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const nav: readonly NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Writing', href: '/writing' },
  { label: 'Photography', href: '/photography' }
];
