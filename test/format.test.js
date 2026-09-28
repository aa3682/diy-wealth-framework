import { describe, expect, it } from 'vitest'
import { formatPercent, formatUSD } from '../lib/format'

describe('formatUSD', () => {
  it('formats whole dollars with grouping and no cents by default', () => {
    expect(formatUSD(1234567)).toBe('$1,234,567')
    expect(formatUSD(0)).toBe('$0')
  })

  it('rounds to the requested number of decimals', () => {
    expect(formatUSD(1234.5)).toBe('$1,235')
    expect(formatUSD(1234.5, { decimals: 2 })).toBe('$1,234.50')
  })

  it('formats negatives with a leading minus', () => {
    expect(formatUSD(-2500)).toBe('-$2,500')
  })

  it('renders non-finite input as an em dash', () => {
    expect(formatUSD(NaN)).toBe('—')
    expect(formatUSD(Infinity)).toBe('—')
    expect(formatUSD(/** @type {any} */ (undefined))).toBe('—')
  })
})

describe('formatPercent', () => {
  it('treats input as already in percent units', () => {
    expect(formatPercent(12.5)).toBe('12.5%')
    expect(formatPercent(12.5, { decimals: 0 })).toBe('13%')
    expect(formatPercent(-4)).toBe('-4.0%')
  })

  it('renders non-finite input as an em dash', () => {
    expect(formatPercent(NaN)).toBe('—')
    expect(formatPercent(-Infinity)).toBe('—')
  })
})
