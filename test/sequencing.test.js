import { describe, expect, it } from 'vitest'
import { hsaLimitFor, sequenceContributions } from '../lib/sequencing'
import { CONTRIBUTION_LIMITS } from '../lib/limits'

const LIMITS = CONTRIBUTION_LIMITS[2026]

function run(overrides = {}) {
  return sequenceContributions({
    income: 100000,
    matchPercent: 4,
    investableCash: 20000,
    hsaLimit: LIMITS.hsaSelfOnly,
    limits: LIMITS,
    ...overrides,
  })
}

function total(result) {
  return result.match401k + result.hsa + result.rothIra + result.max401k + result.taxable
}

describe('sequenceContributions', () => {
  it('fills the calculator defaults in priority order', () => {
    expect(run()).toEqual({ match401k: 4000, hsa: 4400, rothIra: 7500, max401k: 4100, taxable: 0 })
  })

  it('stops at the match when cash runs out first', () => {
    expect(run({ investableCash: 3000 })).toEqual({ match401k: 3000, hsa: 0, rothIra: 0, max401k: 0, taxable: 0 })
  })

  it('caps the 401(k) top-up at the employee limit minus the match contribution', () => {
    const result = run({ investableCash: 100000 })
    expect(result.max401k).toBe(LIMITS.employee401k - 4000)
    expect(result.match401k + result.max401k).toBe(LIMITS.employee401k)
    expect(result.taxable).toBe(100000 - 4000 - 4400 - 7500 - 20500)
  })

  it('never lets the 401(k) top-up go negative when the match alone exceeds the limit', () => {
    const result = run({ income: 1000000, matchPercent: 5, investableCash: 100000 })
    expect(result.match401k).toBe(50000)
    expect(result.max401k).toBe(0)
  })

  it('skips the HSA when not eligible', () => {
    const result = run({ hsaLimit: 0 })
    expect(result.hsa).toBe(0)
    expect(result.rothIra).toBe(LIMITS.ira)
  })

  it('uses the family HSA limit', () => {
    expect(run({ hsaLimit: LIMITS.hsaFamily, investableCash: 50000 }).hsa).toBe(8750)
  })

  it('allocates every dollar exactly once', () => {
    for (const investableCash of [0, 1, 3999, 8400, 15900, 36400, 250000]) {
      const result = run({ investableCash })
      expect(total(result), `cash ${investableCash}`).toBeCloseTo(investableCash, 9)
      for (const amount of Object.values(result)) expect(amount).toBeGreaterThanOrEqual(0)
    }
  })

  it('allocates nothing with zero cash', () => {
    expect(run({ investableCash: 0 })).toEqual({ match401k: 0, hsa: 0, rothIra: 0, max401k: 0, taxable: 0 })
  })
})

describe('hsaLimitFor', () => {
  it('maps coverage to the matching limit', () => {
    expect(hsaLimitFor('self', LIMITS)).toBe(4400)
    expect(hsaLimitFor('family', LIMITS)).toBe(8750)
    expect(hsaLimitFor('none', LIMITS)).toBe(0)
  })
})
