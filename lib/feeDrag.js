/** Expense ratio of a DIY index fund portfolio, in percent per year. */
export const DIY_EXPENSE_RATIO = 0.03

/** Typical assets-under-management advisory fee, in percent per year. */
export const ADVISOR_AUM_FEE = 1.00

/**
 * Future value of a lump sum plus equal monthly contributions made at the
 * end of each month, with the annual rate (in percent) compounded monthly.
 */
export function futureValue({ initial, monthly, years, annualRate }) {
  const r = annualRate / 100 / 12
  const n = years * 12
  if (r === 0) return initial + (monthly * n)

  const compoundPrincipal = initial * Math.pow(1 + r, n)
  const compoundContributions = monthly * ((Math.pow(1 + r, n) - 1) / r)
  return compoundPrincipal + compoundContributions
}

/**
 * Terminal wealth with DIY index funds against a 1% AUM advisor, each fee
 * taken off the gross return, and what the higher fee costs in dollars
 * and as a percent of the DIY outcome.
 */
export function compareFeeDrag({ initial, monthly, years, grossReturn }) {
  const fvDIY = futureValue({ initial, monthly, years, annualRate: grossReturn - DIY_EXPENSE_RATIO })
  const fvAUM = futureValue({ initial, monthly, years, annualRate: grossReturn - ADVISOR_AUM_FEE })
  const wealthLost = fvDIY - fvAUM

  return {
    fvDIY,
    fvAUM,
    wealthLost,
    percentageLost: fvDIY > 0 ? (wealthLost / fvDIY) * 100 : 0,
  }
}
