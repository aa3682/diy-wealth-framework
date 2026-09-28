import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import Tile from './ui/Tile';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD, formatPercent } from '../lib/format';
import { CURRENT_TAX_YEAR, getLimits } from '../lib/limits';
import { employerMatch } from '../lib/employerMatch';

const LIMITS = getLimits(CURRENT_TAX_YEAR);
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** @param {number} value */
const percentLabel = (value) => formatPercent(value, { decimals: Number.isInteger(value) ? 0 : 1 });

export default function EmployerMatchCalculator() {
  const salary = useNumberInput(85000);
  const contribution = useNumberInput(3, { min: 0, max: 100 });
  const tier1Rate = useNumberInput(100, { min: 0, max: 200 });
  const tier1UpTo = useNumberInput(3, { min: 0, max: 100 });
  const tier2Rate = useNumberInput(50, { min: 0, max: 200 });
  const tier2UpTo = useNumberInput(2, { min: 0, max: 100 });

  const tiers = [
    { rate: tier1Rate.value, upTo: tier1UpTo.value },
    { rate: tier2Rate.value, upTo: tier2UpTo.value },
  ].filter(({ rate, upTo }) => rate > 0 && upTo > 0);

  const { matchNow, maxMatch, leftOnTable, fullMatchPercent, limitMonth, matchWithoutTrueUp, evenSpreadPercent } =
    employerMatch({
      salary: salary.value,
      contributionPercent: contribution.value,
      tiers,
      employeeLimit: LIMITS.employee401k,
    });
  const missing = Math.round(leftOnTable) > 0;
  const atRisk = Math.round(matchNow - matchWithoutTrueUp);

  return (
    <ToolCard
      title="Employer Match Capture"
      lede="Your match is part of your pay. Enter your plan's formula to see whether you are collecting all of it."
    >
      <p className={styles.note}>
        Using the {CURRENT_TAX_YEAR} IRS limit on your own 401(k) contributions: {formatUSD(LIMITS.employee401k)}. The match itself does not count toward it. Catch-up contributions for age 50+ are not included.
      </p>
      <div className={styles.grid} style={{ '--min': '160px' }}>
        <NumberField id="match-salary" label="Annual Salary ($)" step={1000} {...salary.inputProps} />
        <NumberField id="match-contribution" label="You Contribute (%)" step={0.5} {...contribution.inputProps} />
      </div>
      <div className={styles.grid} style={{ '--min': '140px' }}>
        <NumberField id="match-tier1-rate" label="Employer Matches (%)" step={25} {...tier1Rate.inputProps} />
        <NumberField id="match-tier1-upto" label="Of the First (% of Pay)" step={0.5} {...tier1UpTo.inputProps} />
        <NumberField id="match-tier2-rate" label="Then Matches (%)" step={25} {...tier2Rate.inputProps} />
        <NumberField id="match-tier2-upto" label="Of the Next (% of Pay)" step={0.5} {...tier2UpTo.inputProps} />
      </div>
      <p className={styles.note}>One-tier plan? Set the second pair to 0.</p>

      <div className={styles.grid}>
        <Tile tone="info" label="Your Match Now" value={formatUSD(Math.round(matchNow))} note="per year" />
        <Tile tone="accent" label="Full Match Available" value={formatUSD(Math.round(maxMatch))} note={`at ${percentLabel(fullMatchPercent)} of pay`} />
      </div>

      {missing ? (
        <ResultPanel tone="danger" centered>
          <div className={styles.resultEyebrow}>Left on the Table Each Year</div>
          <div className={styles.resultBig}>{formatUSD(Math.round(leftOnTable))}</div>
          <div className={styles.resultFine}>
            Contribute at least <strong>{percentLabel(fullMatchPercent)}</strong> of your pay to collect the full match.
          </div>
        </ResultPanel>
      ) : (
        <ResultPanel tone="accent" centered>
          <div className={styles.resultEyebrow}>Full Match Captured</div>
          <div className={styles.resultBig}>{formatUSD(Math.round(matchNow))}</div>
          <div className={styles.resultFine}>You are collecting every dollar your employer offers.</div>
        </ResultPanel>
      )}

      {limitMonth !== null && evenSpreadPercent !== null && atRisk > 0 && (
        <ResultPanel tone="warn" title="Check for a true-up">
          <div className={styles.resultBody}>
            At this rate your contributions reach the {formatUSD(LIMITS.employee401k)} limit with your <strong>{MONTHS[limitMonth - 1]}</strong> paycheck and stop for the rest of the year. If your plan matches each paycheck and has no year-end true-up, you lose about <strong>{formatUSD(atRisk)}</strong> of match. Ask HR, or contribute <strong>{formatPercent(Math.floor(evenSpreadPercent * 10) / 10)}</strong> or less so every paycheck gets matched. Assumes 12 equal monthly paychecks.
          </div>
        </ResultPanel>
      )}
    </ToolCard>
  );
}
