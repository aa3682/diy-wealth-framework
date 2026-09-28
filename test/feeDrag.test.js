import { describe, expect, it } from 'vitest'
import { ADVISOR_AUM_FEE, DIY_EXPENSE_RATIO, compareFeeDrag, futureValue } from '../lib/feeDrag'

// Independent check: grow the balance one month at a time, adding each
// contribution at the end of the month.
function simulate({ initial, monthly, years, annualRate }) {
  const r = annualRate / 100 / 12
  let balance = initial
  for (let month = 0; month < years * 12; month++) balance = balance * (1 + r) + monthly
  return balance
}

describe('futureValue', () => {
  it('matches a month-by-month simulation', () => {
    for (const annualRate of [8, 4.5, -1, 0.01]) {
      const inputs = { initial: 50000, monthly: 1000, years: 30, annualRate }
      expect(futureValue(inputs)).toBeCloseTo(simulate(inputs), 4)
    }
  })

  it('adds contributions without growth at a 0% rate', () => {
    expect(futureValue({ initial: 10000, monthly: 500, years: 10, annualRate: 0 })).toBe(70000)
  })

  it('returns the initial balance over 0 years', () => {
    expect(futureValue({ initial: 10000, monthly: 500, years: 0, annualRate: 7 })).toBe(10000)
  })
})

describe('compareFeeDrag', () => {
  it('uses a 0.03% DIY expense ratio and a 1% advisor fee', () => {
    expect(DIY_EXPENSE_RATIO).toBe(0.03)
    expect(ADVISOR_AUM_FEE).toBe(1)
  })

  it('reproduces the calculator defaults as the live page shows them', () => {
    const inputs = { initial: 50000, monthly: 1000, years: 30, grossReturn: 8 }
    const result = compareFeeDrag(inputs)
    expect(result.fvDIY).toBeCloseTo(simulate({ ...inputs, annualRate: 7.97 }), 4)
    expect(result.fvAUM).toBeCloseTo(simulate({ ...inputs, annualRate: 7 }), 4)
    expect(Math.round(result.fvDIY)).toBe(2023234)
    expect(Math.round(result.fvAUM)).toBe(1625796)
    expect(Math.round(result.wealthLost)).toBe(397438)
    expect(result.percentageLost).toBeCloseTo(19.64, 2)
  })

  it('reports wealth lost as the DIY outcome minus the advisor outcome', () => {
    const result = compareFeeDrag({ initial: 20000, monthly: 250, years: 15, grossReturn: 6 })
    expect(result.wealthLost).toBeCloseTo(result.fvDIY - result.fvAUM, 9)
    expect(result.percentageLost).toBeCloseTo((result.wealthLost / result.fvDIY) * 100, 9)
  })

  it('reports 0% lost when nothing is invested', () => {
    expect(compareFeeDrag({ initial: 0, monthly: 0, years: 30, grossReturn: 8 })).toEqual({
      fvDIY: 0,
      fvAUM: 0,
      wealthLost: 0,
      percentageLost: 0,
    })
  })
})
