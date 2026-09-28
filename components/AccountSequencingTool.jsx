import React, { useState } from 'react';
import NumberField from './ui/NumberField';
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

  const fieldStyles = {
    labelStyle: { fontSize: '0.75rem', color: '#94a3b8', marginBottom: 0 },
    inputStyle: { width: 'auto', padding: '0.4rem', borderRadius: '4px', color: '#fff', fontSize: undefined },
  };

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, marginBottom: '0.25rem', fontSize: '1.25rem' }}>Waterfall Sequencer</h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
        Using {CURRENT_TAX_YEAR} IRS limits: 401(k) {formatUSD(LIMITS.employee401k)} · IRA {formatUSD(LIMITS.ira)} · HSA {formatUSD(LIMITS.hsaSelfOnly)} self-only / {formatUSD(LIMITS.hsaFamily)} family. Catch-up contributions for age 50+ are not included.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <NumberField id="seq-income" label="Annual Income ($)" step={1000} {...fieldStyles} {...income.inputProps} />
        <NumberField id="seq-match" label="401k Match (%)" step={0.5} labelStyle={fieldStyles.labelStyle} inputStyle={{ ...fieldStyles.inputStyle, width: '80px' }} {...matchPercent.inputProps} />
        <NumberField id="seq-cash" label="Cash to Invest/Yr ($)" step={1000} {...fieldStyles} {...investableCash.inputProps} />
        <div>
          <label htmlFor="seq-hsa" style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8' }}>HDHP / HSA Coverage</label>
          <select
            id="seq-hsa"
            value={hsaCoverage}
            onChange={(e) => setHsaCoverage(e.target.value)}
            style={{ display: 'block', padding: '0.4rem', borderRadius: '4px', background: '#1e293b', border: '1px solid #475569', color: '#fff' }}
          >
            <option value="self">Self-only</option>
            <option value="family">Family</option>
            <option value="none">Not eligible</option>
          </select>
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
