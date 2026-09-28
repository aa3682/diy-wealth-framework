import React, { useState } from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import SelectField from './ui/SelectField';
import CheckOption from './ui/CheckOption';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';

export default function EmergencyReserveCalculator() {
  const monthlyExpenses = useNumberInput(4000);
  const [incomeType, setIncomeType] = useState('w2');
  const [earners, setEarners] = useState('dual');
  const [isHomeowner, setIsHomeowner] = useState(false);
  const [hasDependents, setHasDependents] = useState(false);

  let targetMonths = 3;
  if (incomeType === 'freelance') targetMonths = 6;
  else if (earners === 'single') targetMonths += 1;

  if (isHomeowner) targetMonths += 1;
  if (hasDependents) targetMonths += 1;

  const maxMonths = incomeType === 'freelance' ? 9 : 6;
  targetMonths = Math.min(targetMonths, maxMonths);

  const targetDollarAmount = targetMonths * monthlyExpenses.value;

  return (
    <ToolCard
      title="Emergency Moat Sizer"
      lede="Not all emergencies are created equal. Adjust your structural risk factors below to calculate your exact liquidity target."
    >
      <NumberField id="reserve-monthly-expenses" label="Absolute Baseline Monthly Expenses ($)" step={500} spaced {...monthlyExpenses.inputProps} />

      <div className={styles.grid}>
        <SelectField id="reserve-income-type" label="Income Source" value={incomeType} onChange={(e) => setIncomeType(e.target.value)}>
          <option value="w2">W-2 Employee (Stable)</option>
          <option value="freelance">Freelancer / Contractor</option>
        </SelectField>
        <SelectField id="reserve-earners" label="Household Earners" value={earners} onChange={(e) => setEarners(e.target.value)}>
          <option value="dual">Dual Income (Split Risk)</option>
          <option value="single">Single Income</option>
        </SelectField>
      </div>

      <div className={styles.row}>
        <CheckOption checked={isHomeowner} onChange={(e) => setIsHomeowner(e.target.checked)}>I own a home (Repair Risk)</CheckOption>
        <CheckOption checked={hasDependents} onChange={(e) => setHasDependents(e.target.checked)}>I have dependents</CheckOption>
      </div>

      <ResultPanel tone="accent" split>
        <div>
          <div className={styles.resultEyebrow}>Target Reserve: {targetMonths} Months</div>
          <div className={styles.resultBig}>{formatUSD(targetDollarAmount)}</div>
        </div>
        <p className={styles.resultAside}>
          Keep this capital in a highly liquid High-Yield Savings Account (HYSA). Do not invest these funds in the market.
        </p>
      </ResultPanel>
    </ToolCard>
  );
}
