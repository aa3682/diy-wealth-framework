import { describe, expect, it } from 'vitest'
import { TRUST_NET_WORTH_THRESHOLD, evaluateWillVsTrust } from '../lib/willVsTrust'

const none = { multiState: false, staggered: false, privacy: false }

describe('evaluateWillVsTrust', () => {
  it('recommends a simple will for the calculator defaults', () => {
    expect(evaluateWillVsTrust({ netWorth: 400000, ...none })).toEqual({ highNetWorth: false, requiresTrust: false })
  })

  it('requires a trust from $1M of probate-exposed net worth', () => {
    expect(TRUST_NET_WORTH_THRESHOLD).toBe(1000000)
    expect(evaluateWillVsTrust({ netWorth: 999999, ...none }).requiresTrust).toBe(false)
    expect(evaluateWillVsTrust({ netWorth: 1000000, ...none })).toEqual({ highNetWorth: true, requiresTrust: true })
  })

  it('requires a trust for any one qualitative factor at any net worth', () => {
    for (const factor of ['multiState', 'staggered', 'privacy']) {
      expect(evaluateWillVsTrust({ netWorth: 0, ...none, [factor]: true }), factor).toEqual({
        highNetWorth: false,
        requiresTrust: true,
      })
    }
  })
})
