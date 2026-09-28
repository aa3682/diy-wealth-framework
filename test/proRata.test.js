import { describe, expect, it } from 'vitest'
import { proRataSplit } from '../lib/proRata'

describe('proRataSplit', () => {
  it('converts fully tax-free with no pre-tax balance', () => {
    expect(proRataSplit(7500, 0)).toEqual({
      taxFreeRatio: 1,
      taxableRatio: 0,
      taxFreeAmount: 7500,
      taxableAmount: 0,
      hasProRataTrap: false,
    })
  })

  it('makes only the contribution share of the combined pool tax-free', () => {
    const result = proRataSplit(7500, 92500)
    expect(result.taxFreeRatio).toBeCloseTo(0.075, 12)
    expect(result.taxableRatio).toBeCloseTo(0.925, 12)
    expect(result.taxFreeAmount).toBeCloseTo(562.5, 9)
    expect(result.taxableAmount).toBeCloseTo(6937.5, 9)
    expect(result.hasProRataTrap).toBe(true)
  })

  it('splits evenly when balance equals contribution', () => {
    const result = proRataSplit(7000, 7000)
    expect(result.taxFreeAmount).toBe(3500)
    expect(result.taxableAmount).toBe(3500)
  })

  it('always splits the contribution into two parts that sum to it', () => {
    for (const [c, b] of [[7500, 1], [7500, 50000], [1, 1e6], [6000, 123456.78]]) {
      const r = proRataSplit(c, b)
      expect(r.taxFreeAmount + r.taxableAmount).toBeCloseTo(c, 6)
      expect(r.taxFreeRatio + r.taxableRatio).toBeCloseTo(1, 12)
    }
  })

  it('handles both inputs at zero without dividing by zero', () => {
    const result = proRataSplit(0, 0)
    expect(result.taxFreeRatio).toBe(1)
    expect(result.taxableRatio).toBe(0)
    expect(result.taxFreeAmount).toBe(0)
    expect(result.hasProRataTrap).toBe(false)
  })

  it('flags the trap with a balance even when the contribution is zero', () => {
    const result = proRataSplit(0, 10000)
    expect(result.hasProRataTrap).toBe(true)
    expect(result.taxableAmount).toBe(0)
  })
})
