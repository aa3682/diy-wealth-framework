import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD, formatPercent } from '../lib/format';
import { getLimits } from '../lib/limits';
import { proRataSplit } from '../lib/proRata';

export default function BackdoorRothSelector() {
  const contribution = useNumberInput(getLimits().ira);
  const existingBalance = useNumberInput(0);

  const activeContribution = contribution.value;
  const activeBalance = existingBalance.value;

  const { taxFreeRatio, taxableRatio, taxFreeAmount, taxableAmount, hasProRataTrap } =
    proRataSplit(activeContribution, activeBalance);

  return (
    <ToolCard
      title="Backdoor Roth Diagnostic (Pro-Rata Trap)"
      lede="The IRS aggregates all your Traditional, SEP, and SIMPLE IRAs to determine the taxability of a Backdoor Roth conversion. Enter your balances below to check your exposure."
    >
      <div className={styles.grid}>
        <NumberField id="roth-contribution" label="Planned Non-Deductible Contribution ($)" step={500} {...contribution.inputProps} />
        <NumberField id="roth-existing-balance" label="Existing Pre-Tax IRA Balance ($)" step={1000} {...existingBalance.inputProps} />
      </div>

      <ResultPanel tone={hasProRataTrap ? 'danger' : 'accent'} title={hasProRataTrap ? '⚠️ Pro-Rata Trap Detected' : '✅ No Pro-Rata Exposure'}>
        {hasProRataTrap ? (
          <div>
            <p className={styles.resultBody}>
              Because you have <strong>{formatUSD(activeBalance)}</strong> in pre-tax IRAs, the IRS views your conversion proportionally.
            </p>
            <ul style={{ margin: '0.75rem 0', fontSize: '0.9rem', color: 'var(--tool-text-soft)' }}>
              <li><strong>Tax-Free Portion:</strong> {formatUSD(Math.round(taxFreeAmount))} ({formatPercent(taxFreeRatio * 100)})</li>
              <li><strong>Taxable Portion:</strong> {formatUSD(Math.round(taxableAmount))} ({formatPercent(taxableRatio * 100)})</li>
            </ul>
            <p className={styles.resultStrong}>
              One route the IRS rules allow: if an active employer 401(k) accepts roll-ins, moving the existing {formatUSD(activeBalance)} into it before December 31st brings the year-end IRA balance used in the pro-rata calculation to $0.
            </p>
          </div>
        ) : (
          <p className={styles.resultBody}>
            You have $0 in pre-tax IRA balances, so the pro-rata rule does not apply to your <strong>{formatUSD(activeContribution)}</strong> conversion. Any earnings before the conversion are still taxable, and the IRA balance counted is the one on December 31st.
          </p>
        )}
      </ResultPanel>
    </ToolCard>
  );
}
