import React, { useState } from 'react';

export default function DebtAvalancheSorter() {
  const [debts, setDebts] = useState([
    { id: 1, name: 'Credit Card A', balance: 4500, rate: 22.99, minPayment: 110 },
    { id: 2, name: 'Auto Loan', balance: 12000, rate: 6.49, minPayment: 260 },
    { id: 3, name: 'Student Loan', balance: 18000, rate: 4.80, minPayment: 190 },
  ]);

  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [minPayment, setMinPayment] = useState('');

  const addDebt = (e) => {
    e.preventDefault();
    if (!name || !balance || !rate) return;
    setDebts([
      ...debts,
      {
        id: Date.now(),
        name,
        balance: parseFloat(balance),
        rate: parseFloat(rate),
        minPayment: parseFloat(minPayment) || 0,
      },
    ]);
    setName('');
    setBalance('');
    setRate('');
    setMinPayment('');
  };

  const removeDebt = (id) => {
    setDebts(debts.filter((d) => d.id !== id));
  };

  // Sort debts descending by interest rate (Avalanche Method)
  const sortedDebts = [...debts].sort((a, b) => b.rate - a.rate);
  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div style={{
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '1.25rem',
      margin: '1.5rem 0',
      backgroundColor: '#0f172a',
      color: '#f8fafc'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Debt Avalanche Priority Sorter</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
        Add your current debts. The calculator automatically orders them by payoff priority based on interest rate.
      </p>

      <form onSubmit={addDebt} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Debt Name (e.g. Card)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: '1 1 140px', padding: '0.45rem 0.6rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.85rem' }}
        />
        <input
          type="number"
          placeholder="Balance ($)"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          style={{ flex: '1 1 100px', padding: '0.45rem 0.6rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.85rem' }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Rate (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          style={{ flex: '1 1 80px', padding: '0.45rem 0.6rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.85rem' }}
        />
        <input
          type="number"
          placeholder="Min Pay ($)"
          value={minPayment}
          onChange={(e) => setMinPayment(e.target.value)}
          style={{ flex: '1 1 90px', padding: '0.45rem 0.6rem', borderRadius: '4px', border: '1px solid #475569', backgroundColor: '#1e293b', color: '#fff', fontSize: '0.85rem' }}
        />
        <button
          type="submit"
          style={{ padding: '0.45rem 1rem', borderRadius: '4px', border: 'none', backgroundColor: '#0284c7', color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
        >
          Add Debt
        </button>
      </form>

      <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
        Total Non-Mortgage Debt: <strong style={{ color: '#38bdf8' }}>${totalBalance.toLocaleString()}</strong>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
              <th style={{ padding: '0.5rem' }}>Order</th>
              <th style={{ padding: '0.5rem' }}>Name</th>
              <th style={{ padding: '0.5rem' }}>Rate</th>
              <th style={{ padding: '0.5rem' }}>Balance</th>
              <th style={{ padding: '0.5rem' }}>Action</th>
              <th style={{ padding: '0.5rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {sortedDebts.map((item, index) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #1e293b', backgroundColor: index === 0 ? 'rgba(56, 189, 248, 0.08)' : 'transparent' }}>
                <td style={{ padding: '0.5rem', fontWeight: 700, color: index === 0 ? '#38bdf8' : '#94a3b8' }}>
                  #{index + 1}
                </td>
                <td style={{ padding: '0.5rem', fontWeight: 500 }}>{item.name}</td>
                <td style={{ padding: '0.5rem', color: item.rate > 6 ? '#f87171' : '#4ade80' }}>
                  {item.rate}%
                </td>
                <td style={{ padding: '0.5rem' }}>${item.balance.toLocaleString()}</td>
                <td style={{ padding: '0.5rem', fontSize: '0.8rem', color: index === 0 ? '#38bdf8' : '#94a3b8' }}>
                  {index === 0 ? 'Route all surplus cash' : 'Pay minimum only'}
                </td>
                <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                  <button
                    onClick={() => removeDebt(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
