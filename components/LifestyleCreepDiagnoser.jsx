import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatPercent } from '../lib/format';

export default function LifestyleCreepDiagnoser() {
  const pastIncome = useNumberInput(100000);
  const currentIncome = useNumberInput(130000);
  const pastSavings = useNumberInput(15000);
  const currentSavings = useNumberInput(18000);

  const incomeDelta = currentIncome.value - pastIncome.value;
  const savingsDelta = currentSavings.value - pastSavings.value;

  let captureRate = 0;
  if (incomeDelta > 0) {
    captureRate = (savingsDelta / incomeDelta) * 100;
  }

  let tone = 'danger';
  let statusText = '⚠️ Severe Lifestyle Creep';
  let advice = `You captured only ${formatPercent(captureRate)} of your income increase. You are spending almost all of your new money. You urgently need an intermediate Holding Account to trap raises before they hit your checking account.`;

  if (incomeDelta <= 0) {
    tone = 'neutral';
    statusText = 'Income Stagnant / Decreased';
    advice = 'Your income has not increased during this period. Focus on increasing your earning power or reducing baseline expenses.';
  } else if (captureRate >= 50) {
    tone = 'accent';
    statusText = '✅ Excellent Wealth Capture';
    advice = `You captured ${formatPercent(captureRate)} of your new income. Your cash flow systems are highly optimized and successfully resisting lifestyle inflation.`;
  } else if (captureRate >= 20) {
    tone = 'warn';
    statusText = '⚠️ Moderate Creep';
    advice = `You captured ${formatPercent(captureRate)} of your raise. You are hitting the baseline 20% target, but your lifestyle is inflating noticeably. Consider routing your next raise entirely to investments.`;
  }

  return (
    <ToolCard
      title="Raise Capture Diagnostic"
      lede="Measure your lifestyle inflation over the last 3 years. Are you actually capturing your career growth, or just buying more expensive coffee?"
    >
      <div className={styles.grid}>
        <div className={`${styles.tile} ${styles.tileTop}`} data-tone="neutral">
          <div className={styles.tileHeading} style={{ color: 'var(--tool-text-soft)' }}>3 Years Ago</div>
          <div className={styles.stack}>
            <NumberField id="creep-past-income" label="Annual Income ($)" step={1000} {...pastIncome.inputProps} />
            <NumberField id="creep-past-savings" label="Annual Savings ($)" step={1000} {...pastSavings.inputProps} />
          </div>
        </div>

        <div className={`${styles.tile} ${styles.tileTop}`} data-tone="info">
          <div className={styles.tileHeading}>Today</div>
          <div className={styles.stack}>
            <NumberField id="creep-current-income" label="Annual Income ($)" step={1000} {...currentIncome.inputProps} />
            <NumberField id="creep-current-savings" label="Annual Savings ($)" step={1000} {...currentSavings.inputProps} />
          </div>
        </div>
      </div>

      <ResultPanel tone={tone} title={statusText}>
        <p className={styles.resultBody}>{advice}</p>
      </ResultPanel>
    </ToolCard>
  );
}
