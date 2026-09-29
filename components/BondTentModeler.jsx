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
      lede="Selling stocks during a market crash early in retirement permanently destroys your compounding engine. Calculate the exact cash and short-term bond buffer you need to ride out a bear market without selling equities."
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
          <div className={styles.resultEyebrow}>Required Bond Tent Buffer</div>
          <div className={styles.resultBig}>{formatUSD(tentTarget)}</div>
        </div>
        <p className={styles.resultAside}>
          In the 3 to 5 years before you retire, gradually shift this amount from equities into cash, CDs, or short-term treasuries to secure your runway.
        </p>
      </ResultPanel>
    </ToolCard>
  );
}
