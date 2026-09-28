import { describe, expect, it } from 'vitest'
import { splitCashFlow } from '../lib/cashFlow'

describe('splitCashFlow', () => {
  it('splits the calculator default of $6,000 into 50/30/20', () => {
    expect(splitCashFlow(6000)).toEqual({ needs: 3000, wants: 1800, futureYou: 1200 })
  })

  it('rounds each bucket to whole dollars', () => {
    expect(splitCashFlow(4321)).toEqual({ needs: 2161, wants: 1296, futureYou: 864 })
  })

  it('can overshoot the income by a dollar because each bucket rounds on its own', () => {
    const split = splitCashFlow(5)
    expect(split).toEqual({ needs: 3, wants: 2, futureYou: 1 })
    expect(split.needs + split.wants + split.futureYou).toBe(6)
  })

  it('is all zeros for no income', () => {
    expect(splitCashFlow(0)).toEqual({ needs: 0, wants: 0, futureYou: 0 })
  })
})
