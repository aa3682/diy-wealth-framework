import { describe, expect, it } from 'vitest'
import { FI_MULTIPLE, fiProgress } from '../lib/fi'

describe('fiProgress', () => {
  it('uses the 25x rule', () => {
    expect(FI_MULTIPLE).toBe(25)
  })

  it('reproduces the calculator defaults: $80,000 expenses, $250,000 invested', () => {
    expect(fiProgress({ annualExpenses: 80000, currentPortfolio: 250000 })).toEqual({
      fiNumber: 2000000,
      gap: 1750000,
      progress: 12.5,
      reached: false,
    })
  })

  it('is reached exactly at the target', () => {
    expect(fiProgress({ annualExpenses: 40000, currentPortfolio: 1000000 })).toEqual({
      fiNumber: 1000000,
      gap: 0,
      progress: 100,
      reached: true,
    })
  })

  it('caps progress at 100% and the gap at 0 past the target', () => {
    const result = fiProgress({ annualExpenses: 40000, currentPortfolio: 3000000 })
    expect(result.progress).toBe(100)
    expect(result.gap).toBe(0)
    expect(result.reached).toBe(true)
  })

  it('is neither reached nor progressing with no expenses', () => {
    expect(fiProgress({ annualExpenses: 0, currentPortfolio: 500000 })).toEqual({
      fiNumber: 0,
      gap: 0,
      progress: 0,
      reached: false,
    })
  })
})
