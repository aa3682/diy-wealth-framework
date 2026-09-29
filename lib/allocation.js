/** @typedef {{ name: string, percent: number }} Holding */

export const ALLOCATIONS = {
  aggressive: [
    { name: 'Total US stock market fund', percent: 0.80 },
    { name: 'Total international stock fund', percent: 0.20 }
  ],
  balanced: [
    { name: 'Total world stock fund', percent: 0.80 },
    { name: 'Total US bond fund', percent: 0.20 }
  ],
  conservative: [
    { name: 'Total world stock fund', percent: 0.60 },
    { name: 'Total US bond fund', percent: 0.40 }
  ],
  digital: [
    { name: 'Total US stock market fund', percent: 0.75 },
    { name: 'Total international stock fund', percent: 0.20 },
    { name: 'Spot crypto ETFs (bitcoin and ether)', percent: 0.05 }
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
