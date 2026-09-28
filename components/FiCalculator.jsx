import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import Tile from './ui/Tile';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';

export default function FiCalculator() {
  const annualExpenses = useNumberInput(80000);

  const fiNumber = annualExpenses.value * 25;
  const safeMonthlyWithdrawal = (fiNumber * 0.04) / 12;

  return (
    <ToolCard
      title="Financial Independence Target (25x Rule)"
      lede="Estimate your projected annual living expenses in retirement:"
    >
      <NumberField id="fi-annual-expenses" label="Projected Annual Expenses ($)" step={1000} spaced {...annualExpenses.inputProps} />

      <div className={styles.grid} style={{ '--min': '180px', marginBottom: 0 }} aria-live="polite">
        <Tile tone="info" label="Target Portfolio Size (25x)" value={formatUSD(fiNumber)} note="Capital required for FI" />
        <Tile tone="green" label="Safe Monthly Withdrawal (4%)" value={`${formatUSD(Math.round(safeMonthlyWithdrawal))}/mo`} note="Adjusted for inflation" />
      </div>
    </ToolCard>
  );
}
