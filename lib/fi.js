/** Portfolio multiple of annual expenses that supports a 4% withdrawal. */
export const FI_MULTIPLE = 25

/**
 * Financial independence target under the 25x rule and progress toward it.
 * progress is in percent, capped at 100.
 */
export function fiProgress({ annualExpenses, currentPortfolio }) {
  const fiNumber = annualExpenses * FI_MULTIPLE
  const gap = Math.max(0, fiNumber - currentPortfolio)

  return {
    fiNumber,
    gap,
    progress: fiNumber > 0 ? Math.min(100, (currentPortfolio / fiNumber) * 100) : 0,
    reached: fiNumber > 0 && gap === 0,
  }
}
