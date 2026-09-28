import { describe, expect, it } from 'vitest'
import { recoveryReturn, runSequence, stressTest } from '../lib/withdrawal'

const DEFAULTS = { portfolio: 1000000, withdrawal: 40000, years: 30, averageReturn: 5, crash: /** @type {[number, number]} */ ([-25, -15]) }

describe('recoveryReturn', () => {
  it('gives the crash sequence the same compound growth as the steady one', () => {
    for (const [years, averageReturn] of [[30, 5], [40, 3], [3, 7], [25, 0]]) {
      const crash = /** @type {[number, number]} */ ([-25, -15])
      const x = recoveryReturn({ years, averageReturn, crash })
      const crashGrowth = 0.75 * 0.85 * Math.pow(1 + x / 100, years - 2)
      expect(crashGrowth).toBeCloseTo(Math.pow(1 + averageReturn / 100, years), 9)
    }
  })

  it('equals the average when there is no crash', () => {
    expect(recoveryReturn({ years: 30, averageReturn: 5, crash: [5, 5] })).toBeCloseTo(5, 9)
  })
})

describe('runSequence', () => {
  it('takes each withdrawal at the start of the year, then applies the return', () => {
    expect(runSequence(1000, 100, [10, 10]).endBalance).toBeCloseTo(((1000 - 100) * 1.1 - 100) * 1.1, 9)
  })

  it('reports the first year whose withdrawal the balance cannot cover', () => {
    expect(runSequence(250, 100, [0, 0, 0, 0])).toEqual({ endBalance: 0, depletedYear: 3 })
  })

  it('survives when the last withdrawal empties the balance exactly', () => {
    expect(runSequence(300, 100, [0, 0, 0])).toEqual({ endBalance: 0, depletedYear: null })
  })
})

describe('stressTest', () => {
  it('reproduces the calculator defaults', () => {
    const result = stressTest(DEFAULTS)
    expect(result.withdrawalRate).toBe(4)
    expect(result.recoveryReturn).toBeCloseTo(7.0744, 4)
    expect(Math.round(result.steady.endBalance)).toBe(1531511)
    expect(Math.round(result.earlyCrash.endBalance)).toBe(419534)
    expect(Math.round(result.lateCrash.endBalance)).toBe(2031813)
    for (const scenario of [result.steady, result.earlyCrash, result.lateCrash]) expect(scenario.depletedYear).toBeNull()
  })

  it('ends every scenario at the same balance when nothing is withdrawn', () => {
    const result = stressTest({ ...DEFAULTS, withdrawal: 0 })
    const expected = 1000000 * Math.pow(1.05, 30)
    expect(result.steady.endBalance).toBeCloseTo(expected, 4)
    expect(result.earlyCrash.endBalance).toBeCloseTo(expected, 4)
    expect(result.lateCrash.endBalance).toBeCloseTo(expected, 4)
  })

  it('does worst with the crash first and best with it last', () => {
    const result = stressTest({ ...DEFAULTS, withdrawal: 45000 })
    expect(result.steady.depletedYear).toBeNull()
    expect(result.lateCrash.depletedYear).toBeNull()
    expect(result.earlyCrash.depletedYear).toBe(29)
    expect(result.lateCrash.endBalance).toBeGreaterThan(result.steady.endBalance)
  })

  it('runs out early after an early crash at a 5% withdrawal rate', () => {
    expect(stressTest({ ...DEFAULTS, withdrawal: 50000 }).earlyCrash.depletedYear).toBe(22)
  })

  it('reports a 0% withdrawal rate and immediate depletion for an empty portfolio', () => {
    const result = stressTest({ ...DEFAULTS, portfolio: 0 })
    expect(result.withdrawalRate).toBe(0)
    expect(result.steady).toEqual({ endBalance: 0, depletedYear: 1 })
  })
})
