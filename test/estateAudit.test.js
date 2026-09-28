import { describe, expect, it } from 'vitest'
import { ESTATE_ITEMS, estateScore } from '../lib/estateAudit'

describe('estateScore', () => {
  it('starts at 0 of 4', () => {
    expect(estateScore({})).toEqual({ score: 0, total: 4, complete: false })
  })

  it('counts only items marked true', () => {
    expect(estateScore({ beneficiaries: true, tod: false, will: true })).toEqual({ score: 2, total: 4, complete: false })
  })

  it('is complete when every item is checked', () => {
    const all = Object.fromEntries(ESTATE_ITEMS.map((item) => [item.id, true]))
    expect(estateScore(all)).toEqual({ score: 4, total: 4, complete: true })
  })

  it('ignores ids that are not on the checklist', () => {
    expect(estateScore({ unknown: true }).score).toBe(0)
  })

  it('has unique item ids', () => {
    const ids = ESTATE_ITEMS.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
