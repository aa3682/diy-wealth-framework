/**
 * Cash and short-term bond buffer that covers living expenses for the
 * chosen number of bear-market years without selling equities.
 *
 * @param {{ monthlyBurn: number, years: number }} inputs
 */
export function bondTentTarget({ monthlyBurn, years }) {
  return monthlyBurn * 12 * years
}
