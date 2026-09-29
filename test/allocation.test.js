import { describe, expect, it } from 'vitest'
import { ALLOCATIONS, MODEL_NAMES, allocate } from '../lib/allocation'

describe('ALLOCATIONS', () => {
  it('offers the four model portfolios in button order', () => {
    expect(MODEL_NAMES).toEqual(['aggressive', 'balanced', 'conservative', 'digital'])
  })

  it('weights every model to 100%', () => {
    for (const [model, assets] of Object.entries(ALLOCATIONS)) {
      const sum = assets.reduce((total, asset) => total + asset.percent, 0)
      expect(sum, model).toBeCloseTo(1, 12)
    }
  })

  it('has unique names within each model', () => {
    for (const assets of Object.values(ALLOCATIONS)) {
      const names = assets.map((asset) => asset.name)
      expect(new Set(names).size).toBe(names.length)
    }
  })
})

describe('allocate', () => {
  it('splits the calculator default of $10,000 into the aggressive model', () => {
    expect(allocate(10000, 'aggressive').map(({ name, amount }) => [name, amount])).toEqual([
      ['Total US stock market fund', 8000],
      ['Total international stock fund', 2000],
    ])
  })

  it('splits the conservative model 60/40 between global stocks and bonds', () => {
    expect(allocate(10000, 'conservative').map(({ name, amount }) => [name, amount])).toEqual([
      ['Total world stock fund', 6000],
      ['Total US bond fund', 4000],
    ])
  })

  it('allocates every dollar in each model', () => {
    for (const model of MODEL_NAMES) {
      const total = allocate(12345.67, model).reduce((sum, asset) => sum + asset.amount, 0)
      expect(total, model).toBeCloseTo(12345.67, 9)
    }
  })

  it('keeps name alongside the amount', () => {
    expect(allocate(1000, 'digital')[2]).toEqual({ name: 'Spot crypto ETFs (bitcoin and ether)', percent: 0.05, amount: 50 })
  })
})
