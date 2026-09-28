import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import meta from '../pages/_meta'
import { SITE_URL } from '../lib/site'
import { buildRobots, buildSitemap, routesFromMeta } from '../lib/sitemap'

// public/sitemap.xml and public/robots.txt are committed static files.
// These tests fail when they drift from SITE_URL or pages/_meta.js; copy
// the expected text from the failure into the file to update it.

// Vitest runs from the repository root.
const ROOT = process.cwd()
const read = (path) => readFileSync(join(ROOT, path), 'utf8')

describe('routesFromMeta', () => {
  it('maps index to / and other keys to /key', () => {
    expect(routesFromMeta({ index: 'Home', '01-a': 'A' })).toEqual(['/', '/01-a'])
  })
})

describe('pages/_meta.js', () => {
  it('lists every MDX page, so the sitemap covers the whole site', () => {
    const mdxPages = readdirSync(join(ROOT, 'pages'))
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace(/\.mdx$/, ''))
      .sort()
    expect(Object.keys(meta).sort()).toEqual(mdxPages)
  })
})

describe('public/sitemap.xml', () => {
  it('matches SITE_URL and the pages in _meta.js', () => {
    expect(read('public/sitemap.xml')).toBe(buildSitemap(routesFromMeta(meta)))
  })

  it('uses absolute production URLs', () => {
    const locs = [...read('public/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
    expect(locs.length).toBe(Object.keys(meta).length)
    for (const loc of locs) expect(loc.startsWith(SITE_URL)).toBe(true)
  })
})

describe('public/robots.txt', () => {
  it('allows crawling and points at the sitemap', () => {
    expect(read('public/robots.txt')).toBe(buildRobots())
    expect(read('public/robots.txt')).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
  })
})
