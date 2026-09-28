import { describe, expect, it } from 'vitest'
import { CONTRIBUTION_LIMITS, CURRENT_TAX_YEAR, getLimits } from '../lib/limits'

const FIELDS = ['employee401k', 'catchUp401k', 'ira', 'catchUpIra', 'hsaSelfOnly', 'hsaFamily', 'catchUpHsa']

describe('CONTRIBUTION_LIMITS', () => {
  it('has a row for the current tax year', () => {
    expect(CONTRIBUTION_LIMITS[CURRENT_TAX_YEAR]).toBeDefined()
  })

  it('gives every year every field as a positive number', () => {
    for (const [year, row] of Object.entries(CONTRIBUTION_LIMITS)) {
      expect(Object.keys(row).sort(), `year ${year}`).toEqual([...FIELDS].sort())
      for (const field of FIELDS) {
        expect(row[field], `${year}.${field}`).toBeGreaterThan(0)
      }
    }
  })

  it('never lowers a limit from one year to the next', () => {
    const years = Object.keys(CONTRIBUTION_LIMITS).map(Number).sort((a, b) => a - b)
    for (let i = 1; i < years.length; i++) {
      for (const field of FIELDS) {
        expect(
          CONTRIBUTION_LIMITS[years[i]][field],
          `${field} ${years[i - 1]} -> ${years[i]}`
        ).toBeGreaterThanOrEqual(CONTRIBUTION_LIMITS[years[i - 1]][field])
      }
    }
  })

  it('matches the confirmed 2026 figures (IRS Notice 2025-67, Rev. Proc. 2025-19)', () => {
    expect(CONTRIBUTION_LIMITS[2026]).toEqual({
      employee401k: 24500,
      catchUp401k: 8000,
      ira: 7500,
      catchUpIra: 1100,
      hsaSelfOnly: 4400,
      hsaFamily: 8750,
      catchUpHsa: 1000,
    })
  })
})

describe('getLimits', () => {
  it('defaults to the current tax year', () => {
    expect(getLimits()).toBe(CONTRIBUTION_LIMITS[CURRENT_TAX_YEAR])
  })

  it('returns the row for a known year', () => {
    expect(getLimits(2024).employee401k).toBe(23000)
  })

  it('falls back to the current year for an unknown year', () => {
    expect(getLimits(1999)).toBe(CONTRIBUTION_LIMITS[CURRENT_TAX_YEAR])
  })
})
