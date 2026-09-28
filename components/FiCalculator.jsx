import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import Tile from './ui/Tile';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD, formatPercent } from '../lib/format';
import { fiProgress } from '../lib/fi';

export default function FiCalculator() {
  const annualExpenses = useNumberInput(80000);
  const currentPortfolio = useNumberInput(250000);

  const { fiNumber, gap, progress, reached } = fiProgress({
    annualExpenses: annualExpenses.value,
    currentPortfolio: currentPortfolio.value,
  });

  return (
    <ToolCard
      title="Financial Independence Target (25x Rule)"
      lede="Estimate your projected annual living expenses in retirement and enter what you have invested today:"
    >
      <div className={styles.grid}>
        <NumberField id="fi-annual-expenses" label="Projected Annual Expenses ($)" step={1000} {...annualExpenses.inputProps} />
        <NumberField id="fi-current-portfolio" label="Current Invested Portfolio ($)" step={5000} {...currentPortfolio.inputProps} />
      </div>

      <div className={styles.grid} style={{ '--min': '180px', marginBottom: 0 }} aria-live="polite">
        <Tile tone="info" label="Target Portfolio Size (25x)" value={formatUSD(fiNumber)} note="Supports a 4% first-year withdrawal" />
        <Tile
          tone={reached ? 'accent' : 'green'}
          label="Progress to FI"
          value={formatPercent(progress, { decimals: 0 })}
          note={reached ? 'Target reached' : `${formatUSD(gap)} still to invest`}
        />
      </div>
    </ToolCard>
  );
}
