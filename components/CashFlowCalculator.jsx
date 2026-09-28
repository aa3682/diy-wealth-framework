import React from 'react';
import NumberField from './ui/NumberField';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';

export default function CashFlowCalculator() {
  const income = useNumberInput(6000);

  const needs = Math.round(income.value * 0.5);
  const wants = Math.round(income.value * 0.3);
  const futureYou = Math.round(income.value * 0.2);

  return (
    <div style={{
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '1.25rem',
      margin: '1.5rem 0',
      backgroundColor: '#0f172a',
      color: '#f8fafc'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>50/30/20 Cash Flow Diagnostic</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
        Enter your monthly take-home (after-tax) income to view your baseline routing targets:
      </p>

      <NumberField
        id="cashflow-income"
        label="Monthly Take-Home Pay ($)"
        step={100}
        inputStyle={{ maxWidth: '280px', marginBottom: '1.25rem' }}
        {...income.inputProps}
      />

      <div aria-live="polite" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Needs (50%)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatUSD(needs)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Housing, food, fixed bills</div>
        </div>

        <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Wants (30%)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatUSD(wants)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dining, travel, leisure</div>
        </div>

        <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Future You (20%)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{formatUSD(futureYou)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Investing, debt payoff</div>
        </div>
      </div>
    </div>
  );
}
