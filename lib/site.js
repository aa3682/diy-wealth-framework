/**
 * Public origin of the production site, with no trailing slash.
 * Canonical links, og:url, og:image and the sitemap are built from it,
 * so a move to a custom domain is a one-line change here.
 */
export const SITE_URL = 'https://diy-wealth-framework.vercel.app'

/** Strip query string, hash and any trailing slash from a route path. */
export function canonicalPath(asPath = '/') {
  const path = asPath.split(/[?#]/)[0] || '/'
  return path.length > 1 ? path.replace(/\/+$/, '') : '/'
}

/** Absolute production URL for a route path. The home page has no trailing slash. */
export function absoluteUrl(asPath = '/') {
  const path = canonicalPath(asPath)
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}
