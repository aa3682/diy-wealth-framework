import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { diagnoseRaiseCapture } from '../lib/raiseCapture';

export default function LifestyleCreepDiagnoser() {
  const pastIncome = useNumberInput(100000);
  const currentIncome = useNumberInput(130000);
  const pastSavings = useNumberInput(15000);
  const currentSavings = useNumberInput(18000);

  const { tone, statusText, advice } = diagnoseRaiseCapture({
    pastIncome: pastIncome.value,
    currentIncome: currentIncome.value,
    pastSavings: pastSavings.value,
    currentSavings: currentSavings.value,
  });

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
