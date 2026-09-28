/** Probate-exposed net worth at which a trust is recommended, in dollars. */
export const TRUST_NET_WORTH_THRESHOLD = 1000000

/**
 * Whether a Revocable Living Trust is needed instead of a simple will.
 * Any one factor is enough: net worth at or above the threshold, real
 * estate in more than one state, staggered payouts, or privacy.
 *
 * @param {{ netWorth: number, multiState: boolean, staggered: boolean, privacy: boolean }} inputs
 */
export function evaluateWillVsTrust({ netWorth, multiState, staggered, privacy }) {
  const highNetWorth = netWorth >= TRUST_NET_WORTH_THRESHOLD
  return { highNetWorth, requiresTrust: highNetWorth || multiState || staggered || privacy }
}
