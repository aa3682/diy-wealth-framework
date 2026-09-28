import React, { useState } from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';

const allocations = {
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
};

export default function PortfolioAllocation() {
  const capital = useNumberInput(10000);
  const [model, setModel] = useState('aggressive');

  return (
    <ToolCard title="Portfolio Allocation Simulator">
      <div className={styles.toggles} role="group" aria-label="Model portfolio">
        {Object.keys(allocations).map(key => (
          <button key={key} type="button" className={styles.toggle} onClick={() => setModel(key)} aria-pressed={model === key}>
            {key}
          </button>
        ))}
      </div>
      <NumberField id="allocation-capital" label="Capital to Invest ($)" step={1000} spaced {...capital.inputProps} />
      <div className={styles.stack} aria-live="polite">
        {allocations[model].map(asset => (
          <div key={asset.ticker} className={styles.listRow} data-tone="info">
            <div><strong>{asset.ticker}</strong> <span className={styles.muted}>({asset.name})</span></div>
            <strong>{formatUSD(capital.value * asset.percent, { decimals: 2 })}</strong>
          </div>
        ))}
      </div>
    </ToolCard>
  );
}
