import React, { useState } from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import SelectField from './ui/SelectField';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';
import { CURRENT_TAX_YEAR, getLimits } from '../lib/limits';

const LIMITS = getLimits(CURRENT_TAX_YEAR);

export default function AccountSequencingTool() {
  const income = useNumberInput(100000);
  const matchPercent = useNumberInput(4, { min: 0, max: 100 });
  const [hsaCoverage, setHsaCoverage] = useState('self');
  const investableCash = useNumberInput(20000);

  const hsaLimit =
    hsaCoverage === 'self' ? LIMITS.hsaSelfOnly :
    hsaCoverage === 'family' ? LIMITS.hsaFamily :
    0;

  let remaining = investableCash.value;

  const step1Match = Math.min(remaining, income.value * (matchPercent.value / 100));
  remaining -= step1Match;

  const step2HSA = Math.min(remaining, hsaLimit);
  remaining -= step2HSA;

  const step3Roth = Math.min(remaining, LIMITS.ira);
  remaining -= step3Roth;

  const step4Max401k = Math.min(remaining, Math.max(0, LIMITS.employee401k - step1Match));
  remaining -= step4Max401k;

  const step5Taxable = remaining;

  const steps = [
    ['1. 401k Match', step1Match],
    ['2. HSA', step2HSA],
    ['3. Roth IRA', step3Roth],
    ['4. 401k Max', step4Max401k],
    ['5. Taxable Brokerage', step5Taxable],
  ];

  return (
    <ToolCard title="Waterfall Sequencer">
      <p className={styles.note}>
        Using {CURRENT_TAX_YEAR} IRS limits: 401(k) {formatUSD(LIMITS.employee401k)} · IRA {formatUSD(LIMITS.ira)} · HSA {formatUSD(LIMITS.hsaSelfOnly)} self-only / {formatUSD(LIMITS.hsaFamily)} family. Catch-up contributions for age 50+ are not included.
      </p>
      <div className={styles.grid} style={{ '--min': '160px' }}>
        <NumberField id="seq-income" label="Annual Income ($)" step={1000} {...income.inputProps} />
        <NumberField id="seq-match" label="401k Match (%)" step={0.5} {...matchPercent.inputProps} />
        <NumberField id="seq-cash" label="Cash to Invest/Yr ($)" step={1000} {...investableCash.inputProps} />
        <SelectField id="seq-hsa" label="HDHP / HSA Coverage" value={hsaCoverage} onChange={(e) => setHsaCoverage(e.target.value)}>
          <option value="self">Self-only</option>
          <option value="family">Family</option>
          <option value="none">Not eligible</option>
        </SelectField>
      </div>
      <div className={styles.stack} aria-live="polite">
        {steps.map(([label, amount]) => (
          <div key={label} className={styles.listRow}>
            <span>{label}</span>
            <strong className={styles.emphasis}>{formatUSD(amount)}</strong>
          </div>
        ))}
      </div>
    </ToolCard>
  );
}
