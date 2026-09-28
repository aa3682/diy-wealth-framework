import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import Tile from './ui/Tile';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD, formatPercent } from '../lib/format';
import { stressTest } from '../lib/withdrawal';

/** @param {import('../lib/withdrawal').ScenarioResult} scenario */
const outcome = (scenario) =>
  scenario.depletedYear === null ? formatUSD(Math.round(scenario.endBalance)) : `Runs out in year ${scenario.depletedYear}`;

export default function WithdrawalStressTest() {
  const portfolio = useNumberInput(1000000);
  const withdrawal = useNumberInput(40000);
  const years = useNumberInput(30, { min: 3, max: 60 });
  const averageReturn = useNumberInput(5, { min: -10, max: 20 });
  const crash1 = useNumberInput(-25, { min: -90, max: 0 });
  const crash2 = useNumberInput(-15, { min: -90, max: 0 });

  const { withdrawalRate, recoveryReturn, steady, earlyCrash, lateCrash } = stressTest({
    portfolio: portfolio.value,
    withdrawal: withdrawal.value,
    years: years.value,
    averageReturn: averageReturn.value,
    crash: [crash1.value, crash2.value],
  });

  /** @type {[string, import('../lib/withdrawal').ScenarioResult][]} */
  const scenarios = [
    ['Steady Market', steady],
    ['Crash in Years 1–2', earlyCrash],
    [`Crash in Years ${years.value - 1}–${years.value}`, lateCrash],
  ];
  const failed = scenarios.filter(([, s]) => s.depletedYear !== null);

  return (
    <ToolCard
      title="Withdrawal Stress Test"
      lede="Same average return, three different orders. See how much the timing of a crash matters once you are withdrawing."
    >
      <div className={styles.grid} style={{ '--min': '160px' }}>
        <NumberField id="swr-portfolio" label="Starting Portfolio ($)" step={50000} {...portfolio.inputProps} />
        <NumberField id="swr-withdrawal" label="Yearly Withdrawal ($)" step={1000} {...withdrawal.inputProps} />
        <NumberField id="swr-years" label="Years in Retirement" step={1} {...years.inputProps} />
      </div>
      <div className={styles.grid} style={{ '--min': '160px' }}>
        <NumberField id="swr-return" label="Average Return After Inflation (%)" step={0.5} {...averageReturn.inputProps} />
        <NumberField id="swr-crash1" label="Crash Year 1 (%)" step={5} {...crash1.inputProps} />
        <NumberField id="swr-crash2" label="Crash Year 2 (%)" step={5} {...crash2.inputProps} />
      </div>
      <p className={styles.note}>
        Withdrawals stay flat in today&apos;s dollars and come out at the start of each year. In the crash scenarios the other years return {formatPercent(recoveryReturn)}, so all three average the same {formatPercent(averageReturn.value)}.
      </p>

      <div className={styles.grid} style={{ '--min': '180px' }}>
        {scenarios.map(([label, scenario]) => (
          <Tile
            key={label}
            tone={scenario.depletedYear === null ? 'accent' : 'danger'}
            label={label}
            value={outcome(scenario)}
            note={scenario.depletedYear === null ? `left after ${years.value} years` : null}
          />
        ))}
      </div>

      {failed.length === 0 ? (
        <ResultPanel tone="accent">
          <div className={styles.resultBody}>
            At a <strong>{formatPercent(withdrawalRate)}</strong> withdrawal rate your plan lasts all {years.value} years in every scenario, even with the crash first.
          </div>
        </ResultPanel>
      ) : steady.depletedYear !== null ? (
        <ResultPanel tone="danger">
          <div className={styles.resultBody}>
            At a <strong>{formatPercent(withdrawalRate)}</strong> withdrawal rate the money runs out in year <strong>{steady.depletedYear}</strong> even in a steady market. Lower the withdrawal or build a larger portfolio first.
          </div>
        </ResultPanel>
      ) : (
        <ResultPanel tone="warn">
          <div className={styles.resultBody}>
            At a <strong>{formatPercent(withdrawalRate)}</strong> withdrawal rate your plan survives a steady market, but with a {failed.map(([label, s]) => `${label.toLowerCase()} the money runs out in year ${s.depletedYear}`).join(' and with a ')}. That is sequence-of-return risk: <a href="#sequence-of-return-risk-the-bond-tent">a bond tent</a> covers the early years so you are not selling after a crash.
          </div>
        </ResultPanel>
      )}
    </ToolCard>
  );
}
