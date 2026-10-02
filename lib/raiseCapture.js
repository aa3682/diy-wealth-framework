import { formatPercent, formatUSD } from './format'

const HOLDING_ACCOUNT_ADVICE =
  'This is the pattern the Holding Account, described above, is built to interrupt.'

/**
 * Diagnose lifestyle creep from income and savings at two points in time.
 *
 * captureRate is the share of the income increase that went to savings,
 * in percent. It is 0 when income did not rise, and negative when
 * savings fell while income rose.
 *
 * @param {{ pastIncome: number, currentIncome: number, pastSavings: number, currentSavings: number }} inputs
 */
export function diagnoseRaiseCapture({ pastIncome, currentIncome, pastSavings, currentSavings }) {
  const incomeDelta = currentIncome - pastIncome
  const savingsDelta = currentSavings - pastSavings
  const captureRate = incomeDelta > 0 ? (savingsDelta / incomeDelta) * 100 : 0

  if (incomeDelta <= 0) {
    return {
      captureRate,
      tone: 'neutral',
      statusText: 'Income Stagnant / Decreased',
      advice: 'Your income has not increased during this period. The two levers left are earning power and baseline expenses.',
    }
  }
  if (captureRate >= 50) {
    return {
      captureRate,
      tone: 'accent',
      statusText: '✅ Excellent Wealth Capture',
      advice: `You captured ${formatPercent(captureRate)} of your new income. At least half of your raise went to savings rather than lifestyle.`,
    }
  }
  if (captureRate >= 20) {
    return {
      captureRate,
      tone: 'warn',
      statusText: '⚠️ Moderate Creep',
      advice: `You captured ${formatPercent(captureRate)} of your raise. That clears the framework's 20% benchmark, but most of the raise went to lifestyle.`,
    }
  }
  if (captureRate < 0) {
    return {
      captureRate,
      tone: 'danger',
      statusText: '⚠️ Severe Lifestyle Creep',
      advice: `Your income rose by ${formatUSD(incomeDelta)}, but your savings fell by ${formatUSD(-savingsDelta)}. You are spending all of your raise and more. ${HOLDING_ACCOUNT_ADVICE}`,
    }
  }
  return {
    captureRate,
    tone: 'danger',
    statusText: '⚠️ Severe Lifestyle Creep',
    advice: `You captured only ${formatPercent(captureRate)} of your income increase. You are spending almost all of your new money. ${HOLDING_ACCOUNT_ADVICE}`,
  }
}
