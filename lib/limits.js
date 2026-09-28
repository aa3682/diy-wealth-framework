/**
 * IRS contribution limits by tax year.
 *
 * VERIFY BEFORE EACH JANUARY. Update CURRENT_TAX_YEAR and add a row.
 * Sources:
 *   401(k) and IRA: the IRS "401(k) limit increases" news release each
 *     November (2026 figures: IRS Notice 2025-67).
 *   HSA: the Revenue Procedure released each May (2026 figures:
 *     Rev. Proc. 2025-19).
 *
 * All figures are the employee's own contribution limit. Employer match
 * does not count against employee401k.
 */

export const CURRENT_TAX_YEAR = 2026

/**
 * @typedef {object} Limits
 * @property {number} employee401k
 * @property {number} catchUp401k
 * @property {number} ira
 * @property {number} catchUpIra
 * @property {number} hsaSelfOnly
 * @property {number} hsaFamily
 * @property {number} catchUpHsa
 */

/** @type {Record<number, Limits>} */
export const CONTRIBUTION_LIMITS = {
  2024: {
    employee401k: 23000,
    catchUp401k: 7500,
    ira: 7000,
    catchUpIra: 1000,
    hsaSelfOnly: 4150,
    hsaFamily: 8300,
    catchUpHsa: 1000,
  },
  2025: {
    employee401k: 23500,
    catchUp401k: 7500,
    ira: 7000,
    catchUpIra: 1000,
    hsaSelfOnly: 4300,
    hsaFamily: 8550,
    catchUpHsa: 1000,
  },
  2026: {
    employee401k: 24500,
    catchUp401k: 8000,
    ira: 7500,
    catchUpIra: 1100,
    hsaSelfOnly: 4400,
    hsaFamily: 8750,
    catchUpHsa: 1000,
  },
}

/**
 * Limits for a tax year. Falls back to the current year if unknown.
 * @param {number} [year]
 * @returns {Limits}
 */
export function getLimits(year = CURRENT_TAX_YEAR) {
  return CONTRIBUTION_LIMITS[year] || CONTRIBUTION_LIMITS[CURRENT_TAX_YEAR]
}
