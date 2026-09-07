import React, { useState } from 'react';

export default function FiCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(80000);

  const fiNumber = annualExpenses * 25;
  const safeMonthlyWithdrawal = (fiNumber * 0.04) / 12;

  return (
    <div style={{
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '1.25rem',
      margin: '1.5rem 0',
      backgroundColor: '#0f172a',
      color: '#f8fafc'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Financial Independence Target (25x Rule)</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
        Estimate your projected annual living expenses in retirement:
      </p>

      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>
        Projected Annual Expenses ($)
      </label>
      <input
        type="number"
        step="1000"
        value={annualExpenses}
        onChange={(e) => setAnnualExpenses(Math.max(0, Number(e.target.value)))}
        style={{
          width: '100%',
          maxWidth: '280px',
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          border: '1px solid #475569',
          backgroundColor: '#1e293b',
          color: '#f8fafc',
          fontSize: '1rem',
          marginBottom: '1.25rem'
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Target Portfolio Size (25x)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38bdf8' }}>
            ${fiNumber.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Capital required for FI</div>
        </div>

        <div style={{ background: '#1e293b', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Safe Monthly Withdrawal (4%)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>
            ${Math.round(safeMonthlyWithdrawal).toLocaleString()}/mo
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Adjusted for inflation</div>
        </div>
      </div>
    </div>
  );
}
