import React, { useState } from 'react';
import NumberField from './ui/NumberField';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD } from '../lib/format';

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

export default function PortfolioAllocation() {
  const capital = useNumberInput(10000);
  const [model, setModel] = useState('aggressive');

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Portfolio Allocation Simulator</h3>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Object.keys(allocations).map(key => (
          <button key={key} type="button" onClick={() => setModel(key)} aria-pressed={model === key} style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: model === key ? '2px solid #38bdf8' : '1px solid #475569', backgroundColor: model === key ? '#1e293b' : 'transparent', color: '#fff', cursor: 'pointer', textTransform: 'capitalize' }}>
            {key}
          </button>
        ))}
      </div>
      <NumberField
        id="allocation-capital"
        label="Capital to Invest ($)"
        step={1000}
        inputStyle={{ maxWidth: '280px', marginBottom: '1.25rem', fontSize: undefined }}
        {...capital.inputProps}
      />
      <div aria-live="polite" style={{ display: 'grid', gap: '0.75rem' }}>
        {allocations[model].map(asset => (
          <div key={asset.ticker} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#1e293b', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
            <div><strong>{asset.ticker}</strong> <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({asset.name})</span></div>
            <strong>{formatUSD(capital.value * asset.percent, { decimals: 2 })}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
