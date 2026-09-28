/**
 * @typedef {object} StressInputs
 * @property {number} portfolio       Starting balance.
 * @property {number} withdrawal      Yearly withdrawal in today's dollars, taken at the start of each year.
 * @property {number} years           Years in retirement, at least 3.
 * @property {number} averageReturn   Average yearly return after inflation, in percent.
 * @property {[number, number]} crash Returns of the two crash years, in percent (e.g. [-25, -15]).
 */

/**
 * @typedef {object} ScenarioResult
 * @property {number} endBalance         Balance after the last year; 0 once the money runs out.
 * @property {number | null} depletedYear Year whose withdrawal the balance could not fully cover, or null.
 */

/**
 * Return for the non-crash years that gives the whole sequence the same
 * compound average as `averageReturn` every year.
 *
 * @param {{ years: number, averageReturn: number, crash: [number, number] }} inputs
 */
export function recoveryReturn({ years, averageReturn, crash }) {
  const target = Math.pow(1 + averageReturn / 100, years)
  const crashGrowth = (1 + crash[0] / 100) * (1 + crash[1] / 100)
  return (Math.pow(target / crashGrowth, 1 / (years - 2)) - 1) * 100
}

/**
 * Run a withdrawal plan through a sequence of yearly returns.
 *
 * @param {number} portfolio
 * @param {number} withdrawal
 * @param {number[]} returns  One return per year, in percent.
 * @returns {ScenarioResult}
 */
export function runSequence(portfolio, withdrawal, returns) {
  let balance = portfolio
  for (let i = 0; i < returns.length; i++) {
    if (balance < withdrawal) return { endBalance: 0, depletedYear: i + 1 }
    balance = (balance - withdrawal) * (1 + returns[i] / 100)
  }
  return { endBalance: balance, depletedYear: null }
}

/**
 * The same plan through three orders of the same average return: steady
 * every year, a two-year crash at the start, and the same crash at the end.
 *
 * @param {StressInputs} inputs
 */
export function stressTest({ portfolio, withdrawal, years, averageReturn, crash }) {
  const recovery = recoveryReturn({ years, averageReturn, crash })
  const middle = Array(years - 2).fill(recovery)

  return {
    withdrawalRate: portfolio > 0 ? (withdrawal / portfolio) * 100 : 0,
    recoveryReturn: recovery,
    steady: runSequence(portfolio, withdrawal, Array(years).fill(averageReturn)),
    earlyCrash: runSequence(portfolio, withdrawal, [...crash, ...middle]),
    lateCrash: runSequence(portfolio, withdrawal, [...middle, ...crash]),
  }
}
