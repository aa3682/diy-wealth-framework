import { absoluteUrl } from './site'

/**
 * Route paths for the pages listed in pages/_meta.js, in sidebar order.
 * @param {Record<string, unknown>} meta
 */
export function routesFromMeta(meta) {
  return Object.keys(meta).map((key) => (key === 'index' ? '/' : `/${key}`))
}

/**
 * sitemap.xml for the given route paths.
 * @param {string[]} routes
 */
export function buildSitemap(routes) {
  const urls = routes.map((route) => `  <url>\n    <loc>${absoluteUrl(route)}</loc>\n  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

/** robots.txt allowing all crawlers and pointing at the sitemap. */
export function buildRobots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
}
