/**
 * Split a year's investable cash across accounts in priority order:
 * employer match, HSA, Roth IRA, the rest of the 401(k), then taxable.
 *
 * `limits` is a row from lib/limits.js. `hsaLimit` is the HSA limit for
 * the person's coverage (0 when not HSA-eligible). Step 1 is the
 * employee's own contribution needed to earn the full match, so it counts
 * against the employee 401(k) limit and step 4 only fills what is left.
 *
 * @param {object} inputs
 * @param {number} inputs.income
 * @param {number} inputs.matchPercent
 * @param {number} inputs.investableCash
 * @param {number} inputs.hsaLimit
 * @param {import('./limits').Limits} inputs.limits
 */
export function sequenceContributions({ income, matchPercent, investableCash, hsaLimit, limits }) {
  let remaining = investableCash

  const match401k = Math.min(remaining, income * (matchPercent / 100))
  remaining -= match401k

  const hsa = Math.min(remaining, hsaLimit)
  remaining -= hsa

  const rothIra = Math.min(remaining, limits.ira)
  remaining -= rothIra

  const max401k = Math.min(remaining, Math.max(0, limits.employee401k - match401k))
  remaining -= max401k

  return { match401k, hsa, rothIra, max401k, taxable: remaining }
}

/**
 * HSA limit for a coverage choice: 'self', 'family', or anything else for none.
 * @param {string} coverage
 * @param {import('./limits').Limits} limits
 */
export function hsaLimitFor(coverage, limits) {
  if (coverage === 'self') return limits.hsaSelfOnly
  if (coverage === 'family') return limits.hsaFamily
  return 0
}
