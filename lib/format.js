// Locale is pinned so server and client render identical strings.
// A bare toLocaleString() uses the runtime's locale, which can differ
// between the build machine and the visitor's browser and cause
// hydration mismatches.

const usdFormatters = new Map()

function usdFormatter(decimals) {
  if (!usdFormatters.has(decimals)) {
    usdFormatters.set(
      decimals,
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    )
  }
  return usdFormatters.get(decimals)
}

/** Format a number as US dollars. Non-finite input renders as an em dash. */
export function formatUSD(value, { decimals = 0 } = {}) {
  if (!Number.isFinite(value)) return '—'
  return usdFormatter(decimals).format(value)
}

/** Format a number (already in percent units, e.g. 12.5) as "12.5%". */
export function formatPercent(value, { decimals = 1 } = {}) {
  if (!Number.isFinite(value)) return '—'
  return `${value.toFixed(decimals)}%`
}
