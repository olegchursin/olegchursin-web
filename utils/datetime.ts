const DEFAULT_LOCALE = 'en-US';

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};

export function formatDateTime(
  date: Date,
  locale: string = DEFAULT_LOCALE
): string {
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
}
