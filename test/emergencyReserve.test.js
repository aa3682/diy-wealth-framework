import { describe, expect, it } from 'vitest'
import { emergencyReserve, reserveMonths } from '../lib/emergencyReserve'

const base = { incomeType: 'w2', earners: 'dual', isHomeowner: false, hasDependents: false }

describe('reserveMonths', () => {
  it('starts a dual-income W-2 household at 3 months', () => {
    expect(reserveMonths(base)).toBe(3)
  })

  it('adds a month for a single-income W-2 household', () => {
    expect(reserveMonths({ ...base, earners: 'single' })).toBe(4)
  })

  it('adds a month each for a home and for dependents', () => {
    expect(reserveMonths({ ...base, isHomeowner: true })).toBe(4)
    expect(reserveMonths({ ...base, hasDependents: true })).toBe(4)
    expect(reserveMonths({ ...base, earners: 'single', isHomeowner: true, hasDependents: true })).toBe(6)
  })

  it('starts freelancers at 6 months and ignores household earners', () => {
    expect(reserveMonths({ ...base, incomeType: 'freelance' })).toBe(6)
    expect(reserveMonths({ ...base, incomeType: 'freelance', earners: 'single' })).toBe(6)
  })

  it('tops out at 8 months for a freelancer with a home and dependents', () => {
    expect(reserveMonths({ incomeType: 'freelance', earners: 'single', isHomeowner: true, hasDependents: true })).toBe(8)
  })

  it('stays within 3 to 6 months for W-2 and 6 to 9 for freelancers in every combination', () => {
    for (const incomeType of ['w2', 'freelance']) {
      for (const earners of ['dual', 'single']) {
        for (const isHomeowner of [false, true]) {
          for (const hasDependents of [false, true]) {
            const months = reserveMonths({ incomeType, earners, isHomeowner, hasDependents })
            const [min, max] = incomeType === 'freelance' ? [6, 9] : [3, 6]
            expect(months).toBeGreaterThanOrEqual(min)
            expect(months).toBeLessThanOrEqual(max)
          }
        }
      }
    }
  })
})

describe('emergencyReserve', () => {
  it('prices the calculator defaults: 3 months of $4,000', () => {
    expect(emergencyReserve({ monthlyExpenses: 4000, ...base })).toEqual({ months: 3, amount: 12000 })
  })

  it('multiplies the months by monthly expenses', () => {
    expect(emergencyReserve({ monthlyExpenses: 2500, ...base, incomeType: 'freelance', hasDependents: true })).toEqual({
      months: 7,
      amount: 17500,
    })
  })
})
