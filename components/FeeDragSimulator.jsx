import React, { useState } from 'react';

export default function FeeDragSimulator() {
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyContribution, setMonthlyContribution] = useState(1000);
  const [years, setYears] = useState(30);
  const [grossReturn, setGrossReturn] = useState(8);

  const calculateFV = (annualRate) => {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) return initialInvestment + (monthlyContribution * n);
    
    const compoundPrincipal = initialInvestment * Math.pow(1 + r, n);
    const compoundContributions = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r);
    return compoundPrincipal + compoundContributions;
  };

  // DIY Index Fund (e.g., VTI at 0.03% Expense Ratio)
  const netRateDIY = grossReturn - 0.03;
  const fvDIY = calculateFV(netRateDIY);

  // Standard Advisor (1.00% AUM Fee)
  const netRateAUM = grossReturn - 1.00;
  const fvAUM = calculateFV(netRateAUM);

  const wealthLost = fvDIY - fvAUM;
  const percentageLost = (wealthLost / fvDIY) * 100;

  return (
    <div style={{
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '2rem 0',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#f8fafc' }}>The 1% Fee Drag Simulator</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        A 1% advisory fee sounds small, but you don't pay it once—you pay it every year on your total balance, compounding against you. See the math for yourself.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>Initial Portfolio ($)</label>
          <input type="number" step="5000" value={initialInvestment} onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>Monthly Addition ($)</label>
          <input type="number" step="100" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>Time Horizon (Yrs)</label>
          <input type="number" step="1" value={years} onChange={(e) => setYears(Math.max(1, Number(e.target.value)))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>Gross Return (%)</label>
          <input type="number" step="0.5" value={grossReturn} onChange={(e) => setGrossReturn(Math.max(0, Number(e.target.value)))} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '6px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>DIY Indexing (0.03% Fee)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>${Math.round(fvDIY).toLocaleString()}</div>
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '6px', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>1% AUM Advisor</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8fafc' }}>${Math.round(fvAUM).toLocaleString()}</div>
        </div>
      </div>

      <div style={{ padding: '1.25rem', backgroundColor: '#450a0a', borderRadius: '6px', textAlign: 'center', border: '1px solid #7f1d1d' }}>
        <div style={{ fontSize: '0.9rem', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
          Wealth Destroyed by 1% Fee
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem' }}>
          ${Math.round(wealthLost).toLocaleString()}
        </div>
        <div style={{ fontSize: '0.9rem', color: '#fca5a5' }}>
          You surrender <strong>{percentageLost.toFixed(1)}%</strong> of your total potential terminal wealth to fees.
        </div>
      </div>
    </div>
  );
}
