import React from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import Tile from './ui/Tile';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD, formatPercent } from '../lib/format';

const DIY_EXPENSE_RATIO = 0.03;
const ADVISOR_AUM_FEE = 1.00;

export default function FeeDragSimulator() {
  const initialInvestment = useNumberInput(50000);
  const monthlyContribution = useNumberInput(1000);
  const years = useNumberInput(30, { min: 1, max: 100 });
  const grossReturn = useNumberInput(8, { min: 0, max: 50 });

  const calculateFV = (annualRate) => {
    const r = annualRate / 100 / 12;
    const n = years.value * 12;
    if (r === 0) return initialInvestment.value + (monthlyContribution.value * n);

    const compoundPrincipal = initialInvestment.value * Math.pow(1 + r, n);
    const compoundContributions = monthlyContribution.value * ((Math.pow(1 + r, n) - 1) / r);
    return compoundPrincipal + compoundContributions;
  };

  const fvDIY = calculateFV(grossReturn.value - DIY_EXPENSE_RATIO);
  const fvAUM = calculateFV(grossReturn.value - ADVISOR_AUM_FEE);

  const wealthLost = fvDIY - fvAUM;
  const percentageLost = fvDIY > 0 ? (wealthLost / fvDIY) * 100 : 0;

  return (
    <ToolCard
      title="The 1% Fee Drag Simulator"
      lede="A 1% advisory fee sounds small, but you don't pay it once—you pay it every year on your total balance, compounding against you. See the math for yourself."
    >
      <div className={styles.grid} style={{ '--min': '140px' }}>
        <NumberField id="fee-initial" label="Initial Portfolio ($)" step={5000} {...initialInvestment.inputProps} />
        <NumberField id="fee-monthly" label="Monthly Addition ($)" step={100} {...monthlyContribution.inputProps} />
        <NumberField id="fee-years" label="Time Horizon (Yrs)" step={1} {...years.inputProps} />
        <NumberField id="fee-return" label="Gross Return (%)" step={0.5} {...grossReturn.inputProps} />
      </div>

      <div className={styles.grid}>
        <Tile tone="accent" label={`DIY Indexing (${DIY_EXPENSE_RATIO}% Fee)`} value={formatUSD(Math.round(fvDIY))} />
        <Tile tone="danger" label="1% AUM Advisor" value={<span style={{ color: 'var(--tool-text)' }}>{formatUSD(Math.round(fvAUM))}</span>} />
      </div>

      <ResultPanel tone="danger" centered>
        <div className={styles.resultEyebrow}>Wealth Destroyed by 1% Fee</div>
        <div className={styles.resultBig}>{formatUSD(Math.round(wealthLost))}</div>
        <div className={styles.resultFine}>You surrender <strong>{formatPercent(percentageLost)}</strong> of your total potential terminal wealth to fees.</div>
      </ResultPanel>
    </ToolCard>
  );
}
