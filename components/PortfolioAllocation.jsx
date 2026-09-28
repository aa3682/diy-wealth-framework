import React, { useState } from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';
import { ALLOCATIONS, allocate } from '../lib/allocation';

export default function PortfolioAllocation() {
  const capital = useNumberInput(10000);
  const [model, setModel] = useState('aggressive');

  return (
    <ToolCard title="Portfolio Allocation Simulator">
      <div className={styles.toggles} role="group" aria-label="Model portfolio">
        {Object.keys(ALLOCATIONS).map(key => (
          <button key={key} type="button" className={styles.toggle} onClick={() => setModel(key)} aria-pressed={model === key}>
            {key}
          </button>
        ))}
      </div>
      <NumberField id="allocation-capital" label="Capital to Invest ($)" step={1000} spaced {...capital.inputProps} />
      <div className={styles.stack} aria-live="polite">
        {allocate(capital.value, model).map(asset => (
          <div key={asset.ticker} className={styles.listRow} data-tone="info">
            <div><strong>{asset.ticker}</strong> <span className={styles.muted}>({asset.name})</span></div>
            <strong>{formatUSD(asset.amount, { decimals: 2 })}</strong>
          </div>
        ))}
      </div>
    </ToolCard>
  );
}
