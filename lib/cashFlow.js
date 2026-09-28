/**
 * 50/30/20 split of monthly take-home pay, each bucket rounded to the
 * nearest dollar on its own. Because of that rounding the three buckets
 * can sum to a dollar more or less than the income.
 */
export function splitCashFlow(income) {
  return {
    needs: Math.round(income * 0.5),
    wants: Math.round(income * 0.3),
    futureYou: Math.round(income * 0.2),
  }
}
