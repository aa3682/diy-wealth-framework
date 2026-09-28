/**
 * @typedef {object} MatchTier
 * @property {number} rate  What the employer adds per dollar you put in, in percent (100 = dollar for dollar).
 * @property {number} upTo  The slice of salary this tier covers, in percent. Tiers stack: a second
 *   tier starts where the first one ends.
 */

/**
 * @typedef {object} MatchInputs
 * @property {number} salary               Annual salary.
 * @property {number} contributionPercent  Share of each paycheck you contribute, in percent.
 * @property {MatchTier[]} tiers
 * @property {number} employeeLimit        IRS limit on your own contributions for the year.
 */

const PAYCHECKS = 12

/**
 * Employer match on a contribution rate, tier by tier.
 *
 * @param {number} salary
 * @param {number} percent  Contribution rate as a percent of salary.
 * @param {MatchTier[]} tiers
 */
function matchFor(salary, percent, tiers) {
  let start = 0
  let match = 0
  for (const { rate, upTo } of tiers) {
    const covered = Math.min(Math.max(percent - start, 0), upTo)
    match += salary * (covered / 100) * (rate / 100)
    start += upTo
  }
  return match
}

/**
 * The employer match you get, the most you could get, and what is left on
 * the table.
 *
 * The match is worked out on the year's total contributions, which is what
 * you get if your plan does an annual "true-up". Contributions stop once
 * they reach the IRS limit; if that happens before the last paycheck, a plan
 * without a true-up only matches the paychecks that had a contribution, so
 * `matchWithoutTrueUp` shows that smaller figure, assuming 12 equal monthly
 * paychecks.
 *
 * @param {MatchInputs} inputs
 */
export function employerMatch({ salary, contributionPercent, tiers, employeeLimit }) {
  const fullMatchPercent = tiers.reduce((sum, { upTo }) => sum + upTo, 0)
  if (salary <= 0) {
    return {
      yourContribution: 0,
      matchNow: 0,
      maxMatch: 0,
      leftOnTable: 0,
      fullMatchPercent,
      limitMonth: null,
      matchWithoutTrueUp: 0,
      evenSpreadPercent: null,
    }
  }

  const yourContribution = Math.min(salary * (contributionPercent / 100), employeeLimit)
  const limitPercent = (employeeLimit / salary) * 100
  const matchNow = matchFor(salary, (yourContribution / salary) * 100, tiers)
  const maxMatch = matchFor(salary, Math.min(fullMatchPercent, limitPercent), tiers)

  // Paycheck by paycheck: contributions stop once they reach the limit.
  const pay = salary / PAYCHECKS
  let contributed = 0
  let matchWithoutTrueUp = 0
  /** @type {number | null} */
  let limitMonth = null
  for (let month = 1; month <= PAYCHECKS; month++) {
    const put = Math.min(pay * (contributionPercent / 100), employeeLimit - contributed)
    contributed += put
    matchWithoutTrueUp += matchFor(pay, (put / pay) * 100, tiers)
    if (limitMonth === null && put > 0 && contributed >= employeeLimit && month < PAYCHECKS) limitMonth = month
  }

  return {
    yourContribution,
    matchNow,
    maxMatch,
    leftOnTable: Math.max(maxMatch - matchNow, 0),
    fullMatchPercent,
    // Month whose paycheck reaches the limit, when that is before the last one.
    limitMonth,
    matchWithoutTrueUp,
    // Highest rate that still contributes on every paycheck, when the limit binds.
    evenSpreadPercent: limitMonth === null ? null : limitPercent,
  }
}
