/** @typedef {{ ticker: string, name: string, percent: number }} Holding */

export const ALLOCATIONS = {
  aggressive: [
    { ticker: 'VTI', name: 'Total US Stock', percent: 0.80 },
    { ticker: 'VXUS', name: 'Total Intl Stock', percent: 0.20 }
  ],
  balanced: [
    { ticker: 'VT', name: 'Global Equities', percent: 0.80 },
    { ticker: 'BND', name: 'Total Bond Market', percent: 0.20 }
  ],
  digital: [
    { ticker: 'VTI', name: 'Total US Stock', percent: 0.75 },
    { ticker: 'VXUS', name: 'Total Intl Stock', percent: 0.20 },
    { ticker: 'IBIT/ETHA', name: 'Digital Asset ETFs', percent: 0.05 }
  ]
}

/** @typedef {keyof typeof ALLOCATIONS} ModelName */

/** Model names in button order. */
export const MODEL_NAMES = /** @type {ModelName[]} */ (Object.keys(ALLOCATIONS))

/**
 * Dollar amount for each holding of a model portfolio.
 * @param {number} capital
 * @param {ModelName} model
 * @returns {(Holding & { amount: number })[]}
 */
export function allocate(capital, model) {
  return ALLOCATIONS[model].map((asset) => ({ ...asset, amount: capital * asset.percent }))
}
