/** APR above which a debt is treated as an emergency, in percent. */
export const EMERGENCY_RATE = 6

/**
 * A debt as entered in the form. Balance and rate are the raw input strings.
 * @typedef {{ id: number, name: string, balance: string, rate: string }} Debt
 */

/**
 * Rank debts for the avalanche method: highest APR first.
 *
 * Balance and rate arrive as the raw strings from the form. Empty,
 * invalid or negative entries count as 0, and debts with no balance are
 * dropped. Debts with equal rates keep the order they were entered in.
 *
 * @template {Debt} T
 * @param {T[]} debts
 */
export function rankDebts(debts) {
  const ranked = debts
    .map((d) => ({ ...d, balanceNum: Math.max(0, Number(d.balance) || 0), rateNum: Math.max(0, Number(d.rate) || 0) }))
    .filter((d) => d.balanceNum > 0)
    .sort((a, b) => b.rateNum - a.rateNum)

  return {
    ranked,
    total: ranked.reduce((sum, d) => sum + d.balanceNum, 0),
    aboveEmergencyLine: ranked.filter((d) => d.rateNum > EMERGENCY_RATE).length,
  }
}
