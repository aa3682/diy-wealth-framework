import React from 'react';
import { formatUSD } from '../lib/format';

const SAMPLE_DEBTS = [
  { id: 1, name: 'Credit Card', balance: 5400, rate: 24.99 },
  { id: 2, name: 'Car Loan', balance: 12500, rate: 7.50 },
  { id: 3, name: 'Student Loan', balance: 22000, rate: 5.00 }
];

export default function DebtAvalancheSorter() {
  const sortedDebts = [...SAMPLE_DEBTS].sort((a, b) => b.rate - a.rate);

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Debt Avalanche Sorter</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
        Debts are mathematically ranked by interest rate. Route all excess cash to the top item.
      </p>
      
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {sortedDebts.map((debt, index) => (
          <div key={debt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#1e293b', borderRadius: '6px', borderLeft: index === 0 ? '4px solid #ef4444' : '4px solid #38bdf8' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '1rem' }}>{debt.name}</strong>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{debt.rate}% APR</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ fontSize: '1.1rem' }}>{formatUSD(debt.balance)}</strong>
              {index === 0 && <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 'bold' }}>Target First</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
