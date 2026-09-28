import { describe, expect, it } from 'vitest'
import { diagnoseRaiseCapture } from '../lib/raiseCapture'

function diagnose(pastIncome, currentIncome, pastSavings, currentSavings) {
  return diagnoseRaiseCapture({ pastIncome, currentIncome, pastSavings, currentSavings })
}

describe('diagnoseRaiseCapture', () => {
  it('flags severe creep for the calculator defaults (10% captured)', () => {
    const result = diagnose(100000, 130000, 15000, 18000)
    expect(result.captureRate).toBeCloseTo(10, 9)
    expect(result.tone).toBe('danger')
    expect(result.advice).toMatch(/^You captured only 10\.0% of your income increase\./)
  })

  it('flags moderate creep from 20% up to 50%', () => {
    expect(diagnose(100000, 110000, 0, 2000).tone).toBe('warn')
    expect(diagnose(100000, 110000, 0, 4999).tone).toBe('warn')
  })

  it('rates 50% or more as excellent, including capturing more than the raise', () => {
    expect(diagnose(100000, 110000, 0, 5000).tone).toBe('accent')
    const over = diagnose(100000, 110000, 0, 15000)
    expect(over.tone).toBe('accent')
    expect(over.advice).toContain('150.0%')
  })

  it('treats flat or falling income as neutral', () => {
    for (const current of [100000, 90000]) {
      const result = diagnose(100000, current, 10000, 20000)
      expect(result.tone).toBe('neutral')
      expect(result.captureRate).toBe(0)
    }
  })

  it('describes falling savings in dollars instead of a negative percentage', () => {
    const result = diagnose(100000, 130000, 15000, 12000)
    expect(result.captureRate).toBeCloseTo(-10, 9)
    expect(result.tone).toBe('danger')
    expect(result.advice).toBe(
      'Your income rose by $30,000, but your savings fell by $3,000. You are spending all of your raise and more. ' +
        'You urgently need an intermediate Holding Account to trap raises before they hit your checking account.'
    )
    expect(result.advice).not.toMatch(/-\d/)
  })

  it('keeps the "captured only" wording at exactly 0% captured', () => {
    expect(diagnose(100000, 130000, 15000, 15000).advice).toMatch(/^You captured only 0\.0%/)
  })
})
