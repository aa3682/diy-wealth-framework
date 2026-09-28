// @vitest-environment jsdom
import React from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import LeadCapture from '../components/LeadCapture'

afterEach(cleanup)

describe('LeadCapture', () => {
  it('renders nothing while the links are placeholders', () => {
    const { container } = render(<LeadCapture />)
    expect(container.innerHTML).toBe('')
  })

  it('renders nothing while only the booking link is real', () => {
    const { container } = render(<LeadCapture bookingUrl="https://example.com/book" />)
    expect(container.innerHTML).toBe('')
  })

  it('shows the templates button without the booking line once the templates link is real', () => {
    const { container } = render(<LeadCapture templatesUrl="https://example.com/templates" />)
    const links = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))
    expect(links).toEqual(['https://example.com/templates'])
    expect(container.textContent).not.toContain('Book a diagnostic call')
  })

  it('shows both links once both are real', () => {
    const { container } = render(
      <LeadCapture templatesUrl="https://example.com/templates" bookingUrl="https://example.com/book" />
    )
    const links = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))
    expect(links).toEqual(['https://example.com/templates', 'https://example.com/book'])
  })
})
