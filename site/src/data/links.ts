export interface Profile {
  readonly label: string;
  readonly href: string;
  /** What you'll find there, in a few words. */
  readonly note: string;
}

export const profiles: readonly Profile[] = [
  { label: 'GitHub', href: 'https://github.com/olegchursin', note: 'Code' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/olegchursin/',
    note: 'Career'
  },
  { label: 'Dev.to', href: 'https://dev.to/olegchursin', note: 'Writing' },
  { label: 'Medium', href: 'https://medium.com/@olegchursin', note: 'Writing' },
  { label: 'Twitter', href: 'https://twitter.com/ochursin', note: 'Notes' },
  {
    label: 'Behance',
    href: 'https://www.behance.net/olegchursin',
    note: 'Design'
  },
  {
    label: 'Unsplash',
    href: 'https://unsplash.com/@olegchursin_photo',
    note: 'Photography'
  }
];
