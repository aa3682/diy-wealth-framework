import React, { useState } from 'react';

export default function PortfolioAllocation() {
  const [capital, setCapital] = useState(10000);
  const [model, setModel] = useState('aggressive');

  const allocations = {
    aggressive: [
      { ticker: 'VTI', name: 'Total US Stock', percent: 0.80 },
      { ticker: 'VXUS', name: 'Total Intl Stock', percent: 0.20 }
    ],
    balanced: [
      { ticker: 'VT', name: 'Global Equities', percent: 0.80 },
      { ticker: 'BND', name: 'Total Bond Market', percent: 0.20 }
    ],
    digital: [
      { ticker: 'VTI', name: 'Total US Stock', percent: 0.75 },
      { ticker: 'VXUS', name: 'Total Intl Stock', percent: 0.20 },
      { ticker: 'IBIT/ETHA', name: 'Digital Asset ETFs', percent: 0.05 }
    ]
  };

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Portfolio Allocation Simulator</h3>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Object.keys(allocations).map(key => (
          <button key={key} onClick={() => setModel(key)} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: model === key ? '2px solid #38bdf8' : '1px solid #475569', backgroundColor: model === key ? '#1e293b' : 'transparent', color: '#fff', cursor: 'pointer', textTransform: 'capitalize' }}>
            {key}
          </button>
        ))}
      </div>
      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#cbd5e1' }}>Capital to Invest ($)</label>
      <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} style={{ width: '100%', maxWidth: '280px', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#f8fafc', marginBottom: '1.25rem' }} />
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {allocations[model].map(asset => (
          <div key={asset.ticker} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#1e293b', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
            <div><strong>{asset.ticker}</strong> <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({asset.name})</span></div>
            <strong>${(capital * asset.percent).toLocaleString(undefined, {minimumFractionDigits: 2})}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
