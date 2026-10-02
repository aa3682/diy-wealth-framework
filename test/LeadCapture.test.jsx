// @vitest-environment jsdom
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import LeadCapture from '../components/LeadCapture'

afterEach(cleanup)

/** @param {HTMLElement} container */
const hrefs = (container) => [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))

describe('LeadCapture', () => {
  it('offers the two templates and the cheat sheet as downloads and hides the booking line while it is a placeholder', () => {
    const { container } = render(<LeadCapture />)
    expect(hrefs(container)).toEqual([
      '/templates/cash-flow-tracker.xlsx',
      '/templates/net-worth-dashboard.xlsx',
      '/downloads/2026-money-cheat-sheet.pdf',
    ])
    for (const a of container.querySelectorAll('a')) expect(a.hasAttribute('download')).toBe(true)
    expect(container.textContent).not.toContain('Book a diagnostic call')
  })

  it('links to download files that exist in public/', () => {
    const { container } = render(<LeadCapture />)
    for (const href of hrefs(container)) {
      expect(existsSync(join(process.cwd(), 'public', String(href))), String(href)).toBe(true)
    }
  })

  it('shows the booking line once the booking link is real', () => {
    const { container } = render(<LeadCapture bookingUrl="https://example.com/book" />)
    expect(hrefs(container)).toEqual([
      '/templates/cash-flow-tracker.xlsx',
      '/templates/net-worth-dashboard.xlsx',
      '/downloads/2026-money-cheat-sheet.pdf',
      'https://example.com/book',
    ])
  })
})
