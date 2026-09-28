import React, { useState } from 'react';

export default function EmergencyReserveCalculator() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000);
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

  const activeExpenses = Number(monthlyExpenses) || 0;
  const targetDollarAmount = targetMonths * activeExpenses;

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem', margin: '2rem 0', backgroundColor: '#0f172a', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#f8fafc' }}>Emergency Moat Sizer</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        Not all emergencies are created equal. Adjust your structural risk factors below to calculate your exact liquidity target.
      </p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: 'bold' }}>
          Absolute Baseline Monthly Expenses ($)
        </label>
        <input
          type="number"
          step="500"
          value={monthlyExpenses}
          onChange={(e) => setMonthlyExpenses(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
          style={{ width: '100%', maxWidth: '300px', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc', fontSize: '1rem' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 'bold' }}>Income Source</label>
          <select value={incomeType} onChange={(e) => setIncomeType(e.target.value)} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc' }}>
            <option value="w2">W-2 Employee (Stable)</option>
            <option value="freelance">Freelancer / Contractor</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 'bold' }}>Household Earners</label>
          <select value={earners} onChange={(e) => setEarners(e.target.value)} style={{ padding: '0.6rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc' }}>
            <option value="dual">Dual Income (Split Risk)</option>
            <option value="single">Single Income</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#cbd5e1' }}>
          <input type="checkbox" checked={isHomeowner} onChange={(e) => setIsHomeowner(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#10b981' }} />
          I own a home (Repair Risk)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#cbd5e1' }}>
          <input type="checkbox" checked={hasDependents} onChange={(e) => setHasDependents(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: '#10b981' }} />
          I have dependents
        </label>
      </div>

      <div style={{ padding: '1.25rem', borderRadius: '6px', backgroundColor: '#022c22', borderLeft: '4px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Target Reserve: {targetMonths} Months</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f8fafc' }}>${targetDollarAmount.toLocaleString()}</div>
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#a7f3d0', maxWidth: '300px', lineHeight: '1.4' }}>
          Keep this capital in a highly liquid High-Yield Savings Account (HYSA). Do not invest these funds in the market.
        </p>
      </div>
    </div>
  );
}
