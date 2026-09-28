import { describe, expect, it } from 'vitest'
import { ALLOCATIONS, MODEL_NAMES, allocate } from '../lib/allocation'

describe('ALLOCATIONS', () => {
  it('offers the three model portfolios in button order', () => {
    expect(MODEL_NAMES).toEqual(['aggressive', 'balanced', 'digital'])
  })

  it('weights every model to 100%', () => {
    for (const [model, assets] of Object.entries(ALLOCATIONS)) {
      const sum = assets.reduce((total, asset) => total + asset.percent, 0)
      expect(sum, model).toBeCloseTo(1, 12)
    }
  })

  it('has unique tickers within each model', () => {
    for (const assets of Object.values(ALLOCATIONS)) {
      const tickers = assets.map((asset) => asset.ticker)
      expect(new Set(tickers).size).toBe(tickers.length)
    }
  })
})

describe('allocate', () => {
  it('splits the calculator default of $10,000 into the aggressive model', () => {
    expect(allocate(10000, 'aggressive').map(({ ticker, amount }) => [ticker, amount])).toEqual([
      ['VTI', 8000],
      ['VXUS', 2000],
    ])
  })

  it('allocates every dollar in each model', () => {
    for (const model of MODEL_NAMES) {
      const total = allocate(12345.67, model).reduce((sum, asset) => sum + asset.amount, 0)
      expect(total, model).toBeCloseTo(12345.67, 9)
    }
  })

  it('keeps ticker and name alongside the amount', () => {
    expect(allocate(1000, 'digital')[2]).toEqual({ ticker: 'IBIT/ETHA', name: 'Digital Asset ETFs', percent: 0.05, amount: 50 })
  })
})
