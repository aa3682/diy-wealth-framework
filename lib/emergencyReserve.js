/**
 * @typedef {object} RiskFactors
 * @property {string} incomeType 'w2' or 'freelance'
 * @property {string} earners 'dual' or 'single'
 * @property {boolean} isHomeowner
 * @property {boolean} hasDependents
 */

/**
 * Months of expenses to hold in cash, from structural risk factors.
 *
 * W-2 earners start at 3 months, plus 1 for a single-income household.
 * Freelancers start at 6 months whatever the household. Owning a home and
 * having dependents each add 1. The result is capped at 6 months for W-2
 * and 9 for freelancers.
 *
 * @param {RiskFactors} factors
 */
export function reserveMonths({ incomeType, earners, isHomeowner, hasDependents }) {
  let months = 3
  if (incomeType === 'freelance') months = 6
  else if (earners === 'single') months += 1

  if (isHomeowner) months += 1
  if (hasDependents) months += 1

  const maxMonths = incomeType === 'freelance' ? 9 : 6
  return Math.min(months, maxMonths)
}

/**
 * Reserve target in months and dollars for the given monthly expenses.
 * @param {RiskFactors & { monthlyExpenses: number }} inputs
 */
export function emergencyReserve({ monthlyExpenses, incomeType, earners, isHomeowner, hasDependents }) {
  const months = reserveMonths({ incomeType, earners, isHomeowner, hasDependents })
  return { months, amount: months * monthlyExpenses }
}
