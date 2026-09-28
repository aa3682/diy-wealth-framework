import React, { useState } from 'react';

export default function BondTentModeler() {
  const [monthlyBurn, setMonthlyBurn] = useState(6000);
  const [yearsProtection, setYearsProtection] = useState(3);

  const activeBurn = Number(monthlyBurn) || 0;
  const annualBurn = activeBurn * 12;
  const tentTarget = annualBurn * yearsProtection;

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem', margin: '2rem 0', backgroundColor: '#0f172a', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#f8fafc' }}>Bond Tent Modeler</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        Selling stocks during a market crash early in retirement permanently destroys your compounding engine. Calculate the exact cash and short-term bond buffer you need to ride out a bear market without selling equities.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: 'bold' }}>Monthly Retirement Living Expenses ($)</label>
          <input
            type="number" step="500" value={monthlyBurn}
            onChange={(e) => setMonthlyBurn(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc', fontSize: '1rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: 'bold' }}>Years of Bear Market Protection</label>
          <select
            value={yearsProtection} onChange={(e) => setYearsProtection(Number(e.target.value))}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc', fontSize: '1rem' }}
          >
            <option value={1}>1 Year (High Risk)</option>
            <option value={2}>2 Years (Standard Bear Market)</option>
            <option value={3}>3 Years (Conservative)</option>
            <option value={4}>4 Years (Ultra Conservative)</option>
            <option value={5}>5 Years (Lost Decade Hedge)</option>
          </select>
        </div>
      </div>

      <div style={{ padding: '1.25rem', borderRadius: '6px', backgroundColor: '#022c22', borderLeft: '4px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Required Bond Tent Buffer</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f8fafc' }}>${tentTarget.toLocaleString()}</div>
        </div>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#a7f3d0', maxWidth: '300px', lineHeight: '1.4' }}>
          In the 3 to 5 years before you retire, gradually shift this amount from equities into cash, CDs, or short-term treasuries (like SGOV or USFR) to secure your runway.
        </p>
      </div>
    </div>
  );
}
