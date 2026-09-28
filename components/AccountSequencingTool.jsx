import React, { useState } from 'react';
import NumberField from './ui/NumberField';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';

export default function AccountSequencingTool() {
  const income = useNumberInput(100000);
  const matchPercent = useNumberInput(4, { min: 0, max: 100 });
  const [hasHDHP, setHasHDHP] = useState(true);
  const investableCash = useNumberInput(20000);

  let remaining = investableCash.value;
  
  const step1Match = Math.min(remaining, income.value * (matchPercent.value / 100));
  remaining -= step1Match;

  const step2HSA = hasHDHP ? Math.min(remaining, 4150) : 0;
  remaining -= step2HSA;

  const step3Roth = Math.min(remaining, 7000);
  remaining -= step3Roth;

  const step4Max401k = Math.min(remaining, 23000 - step1Match);
  remaining -= step4Max401k;

  const step5Taxable = remaining;

  const fieldStyles = {
    labelStyle: { fontSize: '0.75rem', color: '#94a3b8', marginBottom: 0 },
    inputStyle: { width: 'auto', padding: '0.4rem', borderRadius: '4px', color: '#fff', fontSize: undefined },
  };

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Waterfall Sequencer</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <NumberField id="seq-income" label="Annual Income ($)" step={1000} {...fieldStyles} {...income.inputProps} />
        <NumberField id="seq-match" label="401k Match (%)" step={0.5} labelStyle={fieldStyles.labelStyle} inputStyle={{ ...fieldStyles.inputStyle, width: '80px' }} {...matchPercent.inputProps} />
        <NumberField id="seq-cash" label="Cash to Invest/Yr ($)" step={1000} {...fieldStyles} {...investableCash.inputProps} />
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <input type="checkbox" checked={hasHDHP} onChange={(e) => setHasHDHP(e.target.checked)} /> HDHP Eligible
          </label>
        </div>
      </div>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>1. 401k Match: <strong style={{ color: '#22c55e' }}>{formatUSD(step1Match)}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>2. HSA: <strong style={{ color: '#22c55e' }}>{formatUSD(step2HSA)}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>3. Roth IRA: <strong style={{ color: '#22c55e' }}>{formatUSD(step3Roth)}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>4. 401k Max: <strong style={{ color: '#22c55e' }}>{formatUSD(step4Max401k)}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>5. Taxable Brokerage: <strong style={{ color: '#22c55e' }}>{formatUSD(step5Taxable)}</strong></div>
      </div>
    </div>
  );
}
