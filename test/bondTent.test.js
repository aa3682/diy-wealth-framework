import { describe, expect, it } from 'vitest'
import { bondTentTarget } from '../lib/bondTent'

describe('bondTentTarget', () => {
  it('covers the calculator defaults: $6,000 a month for 3 years', () => {
    expect(bondTentTarget({ monthlyBurn: 6000, years: 3 })).toBe(216000)
  })

  it('scales linearly with each year of protection', () => {
    for (const years of [1, 2, 3, 4, 5]) {
      expect(bondTentTarget({ monthlyBurn: 5000, years })).toBe(60000 * years)
    }
  })

  it('is 0 with no expenses', () => {
    expect(bondTentTarget({ monthlyBurn: 0, years: 5 })).toBe(0)
  })
})
