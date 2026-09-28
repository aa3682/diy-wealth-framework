import React from 'react';
import NumberField from './ui/NumberField';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';

export default function FiCalculator() {
  const annualExpenses = useNumberInput(80000);

  const fiNumber = annualExpenses.value * 25;
  const safeMonthlyWithdrawal = (fiNumber * 0.04) / 12;

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Financial Independence Target (25x Rule)</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
        Estimate your projected annual living expenses in retirement:
      </p>

      <NumberField
        id="fi-annual-expenses"
        label="Projected Annual Expenses ($)"
        step={1000}
        inputStyle={{ maxWidth: '280px', marginBottom: '1.25rem' }}
        {...annualExpenses.inputProps}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Target Portfolio Size (25x)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38bdf8' }}>{formatUSD(fiNumber)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Capital required for FI</div>
        </div>

        <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Safe Monthly Withdrawal (4%)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>{formatUSD(Math.round(safeMonthlyWithdrawal))}/mo</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Adjusted for inflation</div>
        </div>
      </div>
    </div>
  );
}
