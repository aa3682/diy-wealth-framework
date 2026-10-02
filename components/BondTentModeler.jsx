import React, { useState } from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import SelectField from './ui/SelectField';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';
import { bondTentTarget } from '../lib/bondTent';

export default function BondTentModeler() {
  const monthlyBurn = useNumberInput(6000);
  const [yearsProtection, setYearsProtection] = useState(3);

  const tentTarget = bondTentTarget({ monthlyBurn: monthlyBurn.value, years: yearsProtection });

  return (
    <ToolCard
      title="Bond Tent Modeler"
      lede="Selling stocks during a market crash early in retirement locks in losses. Enter your expenses to see the cash and short-term bond buffer this framework sets for the bear-market length you pick."
    >
      <div className={styles.grid}>
        <NumberField id="bondtent-monthly-burn" label="Monthly Retirement Living Expenses ($)" step={500} {...monthlyBurn.inputProps} />
        <SelectField id="bondtent-years" label="Years of Bear Market Protection" value={yearsProtection} onChange={(e) => setYearsProtection(Number(e.target.value))}>
          <option value={1}>1 Year (High Risk)</option>
          <option value={2}>2 Years (Standard Bear Market)</option>
          <option value={3}>3 Years (Conservative)</option>
          <option value={4}>4 Years (Ultra Conservative)</option>
          <option value={5}>5 Years (Lost Decade Hedge)</option>
        </SelectField>
      </div>

      <ResultPanel tone="accent" split>
        <div>
          <div className={styles.resultEyebrow}>Bond Tent Buffer</div>
          <div className={styles.resultBig}>{formatUSD(tentTarget)}</div>
        </div>
        <p className={styles.resultAside}>
          In this framework, this amount moves gradually from equities into cash, CDs, or short-term treasuries over the 3 to 5 years before retirement.
        </p>
      </ResultPanel>
    </ToolCard>
  );
}
