/** A link is external when it is an absolute http(s) URL or mailto. */
export function isExternal(href: string | undefined): boolean {
  return !!href && /^(https?:)?\/\/|^mailto:/i.test(href);
}
