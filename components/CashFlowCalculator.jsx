import React, { useState } from 'react';

export default function CashFlowCalculator() {
  const [income, setIncome] = useState(6000);

  const needs = (income * 0.5).toFixed(0);
  const wants = (income * 0.3).toFixed(0);
  const futureYou = (income * 0.2).toFixed(0);

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

      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>
        Monthly Take-Home Pay ($)
      </label>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
        <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Needs (50%)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>${Number(needs).toLocaleString()}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Housing, food, fixed bills</div>
        </div>

        <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Wants (30%)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>${Number(wants).toLocaleString()}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Dining, travel, leisure</div>
        </div>

        <div style={{ background: '#1e293b', padding: '0.75rem', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Future You (20%)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>${Number(futureYou).toLocaleString()}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Investing, debt payoff</div>
        </div>
      </div>
    </div>
  );
}
