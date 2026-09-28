import { describe, expect, it } from 'vitest'
import { SITE_URL, absoluteUrl, canonicalPath } from '../lib/site'

describe('SITE_URL', () => {
  it('is an https origin with no trailing slash', () => {
    expect(SITE_URL).toMatch(/^https:\/\/[^/]+$/)
  })
})

describe('canonicalPath', () => {
  it('keeps a plain path', () => {
    expect(canonicalPath('/04-tax-efficiency')).toBe('/04-tax-efficiency')
  })

  it('drops query strings, hashes and trailing slashes', () => {
    expect(canonicalPath('/04-tax-efficiency?utm_source=x')).toBe('/04-tax-efficiency')
    expect(canonicalPath('/04-tax-efficiency#pro-rata')).toBe('/04-tax-efficiency')
    expect(canonicalPath('/04-tax-efficiency/')).toBe('/04-tax-efficiency')
  })

  it('maps the home page and its variants to /', () => {
    for (const p of ['/', '', '/?ref=x', '/#top', undefined]) expect(canonicalPath(p)).toBe('/')
  })
})

describe('absoluteUrl', () => {
  it('joins the origin and path', () => {
    expect(absoluteUrl('/07-next-steps?x=1')).toBe(`${SITE_URL}/07-next-steps`)
  })

  it('gives the bare origin for the home page', () => {
    expect(absoluteUrl('/')).toBe(SITE_URL)
  })

  it('resolves site assets', () => {
    expect(absoluteUrl('/og.png')).toBe(`${SITE_URL}/og.png`)
  })
})
