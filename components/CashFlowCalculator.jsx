import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import Tile from './ui/Tile';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';
import { splitCashFlow } from '../lib/cashFlow';

export default function CashFlowCalculator() {
  const income = useNumberInput(6000);

  const { needs, wants, futureYou } = splitCashFlow(income.value);

  return (
    <ToolCard
      title="50/30/20 Cash Flow Diagnostic"
      lede="Enter your monthly take-home (after-tax) income to view your baseline routing targets:"
    >
      <NumberField id="cashflow-income" label="Monthly Take-Home Pay ($)" step={100} spaced {...income.inputProps} />

      <div className={styles.grid} style={{ '--min': '140px', marginBottom: 0 }} aria-live="polite">
        <Tile tone="info" label="Needs (50%)" value={formatUSD(needs)} note="Housing, food, fixed bills" />
        <Tile tone="purple" label="Wants (30%)" value={formatUSD(wants)} note="Dining, travel, leisure" />
        <Tile tone="green" label="Future You (20%)" value={formatUSD(futureYou)} note="Investing, debt payoff" />
      </div>
    </ToolCard>
  );
}
