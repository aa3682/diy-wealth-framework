/**
 * Pro-rata split of a Backdoor Roth conversion.
 *
 * The IRS treats all pre-tax IRA money as one pool with the new
 * non-deductible contribution, so only the contribution's share of the
 * combined balance converts tax-free.
 */
export function proRataSplit(contribution, existingPreTaxBalance) {
  const total = contribution + existingPreTaxBalance
  const taxFreeRatio = total > 0 ? contribution / total : 1
  const taxableRatio = total > 0 ? existingPreTaxBalance / total : 0

  return {
    taxFreeRatio,
    taxableRatio,
    taxFreeAmount: contribution * taxFreeRatio,
    taxableAmount: contribution * taxableRatio,
    hasProRataTrap: existingPreTaxBalance > 0,
  }
}
