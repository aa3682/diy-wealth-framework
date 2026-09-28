import { describe, expect, it } from 'vitest'
import { employerMatch } from '../lib/employerMatch'

const SAFE_HARBOR = [{ rate: 100, upTo: 3 }, { rate: 50, upTo: 2 }]
const LIMIT_2026 = 24500

describe('employerMatch', () => {
  it('reproduces the calculator defaults: 3% into a 100%-of-3% plus 50%-of-2% plan', () => {
    const result = employerMatch({ salary: 85000, contributionPercent: 3, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
    expect(result.yourContribution).toBeCloseTo(2550, 9)
    expect(result.matchNow).toBeCloseTo(2550, 9)
    expect(result.maxMatch).toBeCloseTo(3400, 9)
    expect(result.leftOnTable).toBeCloseTo(850, 9)
    expect(result.fullMatchPercent).toBe(5)
    expect(result.limitMonth).toBeNull()
    expect(result.evenSpreadPercent).toBeNull()
  })

  it('leaves nothing on the table at or above the full-match rate', () => {
    for (const contributionPercent of [5, 8, 15]) {
      const result = employerMatch({ salary: 85000, contributionPercent, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
      expect(result.matchNow).toBeCloseTo(3400, 9)
      expect(result.leftOnTable).toBe(0)
    }
  })

  it('matches part of the second tier for a rate that ends inside it', () => {
    const result = employerMatch({ salary: 100000, contributionPercent: 4, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
    expect(result.matchNow).toBeCloseTo(3000 + 500, 9)
  })

  it('handles a single-tier plan', () => {
    const tiers = [{ rate: 50, upTo: 6 }]
    const result = employerMatch({ salary: 100000, contributionPercent: 4, tiers, employeeLimit: LIMIT_2026 })
    expect(result.matchNow).toBeCloseTo(2000, 9)
    expect(result.maxMatch).toBeCloseTo(3000, 9)
    expect(result.fullMatchPercent).toBe(6)
  })

  it('gives no match at a 0% contribution', () => {
    const result = employerMatch({ salary: 85000, contributionPercent: 0, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
    expect(result.matchNow).toBe(0)
    expect(result.leftOnTable).toBeCloseTo(3400, 9)
  })

  it('caps your contribution at the IRS limit and flags the month it is reached', () => {
    const result = employerMatch({ salary: 200000, contributionPercent: 20, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
    expect(result.yourContribution).toBe(LIMIT_2026)
    // With a true-up the year's 12.25% still earns the full match.
    expect(result.matchNow).toBeCloseTo(8000, 9)
    expect(result.leftOnTable).toBe(0)
    // $3,333.33 a month reaches $24,500 in the 8th paycheck; months 9-12 get no match.
    expect(result.limitMonth).toBe(8)
    expect(result.matchWithoutTrueUp).toBeCloseTo(8000 * 8 / 12, 6)
    expect(result.evenSpreadPercent).toBeCloseTo(12.25, 9)
  })

  it('does not flag the limit when it is reached exactly on the last paycheck', () => {
    const result = employerMatch({ salary: 245000, contributionPercent: 10, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
    expect(result.yourContribution).toBeCloseTo(LIMIT_2026, 6)
    expect(result.limitMonth).toBeNull()
    expect(result.matchWithoutTrueUp).toBeCloseTo(result.matchNow, 6)
  })

  it('limits the maximum match when the full-match rate would pass the IRS limit', () => {
    const tiers = [{ rate: 100, upTo: 6 }]
    const result = employerMatch({ salary: 1000000, contributionPercent: 10, tiers, employeeLimit: LIMIT_2026 })
    expect(result.maxMatch).toBeCloseTo(LIMIT_2026, 6)
    expect(result.matchNow).toBeCloseTo(LIMIT_2026, 6)
    expect(result.leftOnTable).toBe(0)
  })

  it('agrees with the paycheck-by-paycheck match whenever the limit is never reached', () => {
    for (const salary of [40000, 85000, 150000]) {
      for (const contributionPercent of [0, 1.5, 3, 4.5, 6, 9]) {
        const result = employerMatch({ salary, contributionPercent, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
        expect(result.matchWithoutTrueUp).toBeCloseTo(result.matchNow, 6)
      }
    }
  })

  it('returns zeros for a zero salary', () => {
    const result = employerMatch({ salary: 0, contributionPercent: 6, tiers: SAFE_HARBOR, employeeLimit: LIMIT_2026 })
    expect(result).toEqual({
      yourContribution: 0,
      matchNow: 0,
      maxMatch: 0,
      leftOnTable: 0,
      fullMatchPercent: 5,
      limitMonth: null,
      matchWithoutTrueUp: 0,
      evenSpreadPercent: null,
    })
  })
})
