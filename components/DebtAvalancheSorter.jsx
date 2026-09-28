import React, { useRef, useState } from 'react';
import ToolCard from './ui/ToolCard';
import styles from './ui/tool.module.css';
import { formatUSD } from '../lib/format';
import { EMERGENCY_RATE, rankDebts } from '../lib/debtAvalanche';

const SAMPLE_DEBTS = [
  { id: 1, name: 'Credit Card', balance: '5400', rate: '24.99' },
  { id: 2, name: 'Car Loan', balance: '12500', rate: '7.50' },
  { id: 3, name: 'Student Loan', balance: '22000', rate: '5.00' }
];

export default function DebtAvalancheSorter() {
  const [debts, setDebts] = useState(SAMPLE_DEBTS);
  const nextId = useRef(SAMPLE_DEBTS.length + 1);

  const update = (id, key, value) =>
    setDebts((list) => list.map((d) => (d.id === id ? { ...d, [key]: value } : d)));
  const remove = (id) => setDebts((list) => list.filter((d) => d.id !== id));
  const add = () => setDebts((list) => [...list, { id: nextId.current++, name: '', balance: '', rate: '' }]);

  const { ranked, total, aboveEmergencyLine } = rankDebts(debts);

  return (
    <ToolCard
      title="Debt Avalanche Sorter"
      lede="Enter your debts. They are ranked by interest rate, highest first. Pay the minimum on all of them and route every spare dollar to the top item."
    >
      <div className={styles.stack} style={{ gap: '0.5rem' }}>
        <div className={styles.rowGrid} aria-hidden="true">
          <div className={styles.columnHead}>Debt</div>
          <div className={styles.columnHead}>Balance ($)</div>
          <div className={styles.columnHead}>APR (%)</div>
          <div />
        </div>
        {debts.map((d) => (
          <div key={d.id} className={styles.rowGrid}>
            <input
              type="text"
              className={styles.input}
              aria-label="Debt name"
              placeholder="e.g. Credit Card"
              value={d.name}
              onChange={(e) => update(d.id, 'name', e.target.value)}
            />
            <input
              type="number"
              className={styles.input}
              aria-label="Balance in dollars"
              min={0}
              step={100}
              inputMode="decimal"
              value={d.balance}
              onChange={(e) => update(d.id, 'balance', e.target.value)}
            />
            <input
              type="number"
              className={styles.input}
              aria-label="Annual percentage rate"
              min={0}
              max={100}
              step={0.01}
              inputMode="decimal"
              value={d.rate}
              onChange={(e) => update(d.id, 'rate', e.target.value)}
            />
            <button type="button" className={styles.iconButton} onClick={() => remove(d.id)} aria-label={`Remove ${d.name || 'debt'}`}>
              ✕
            </button>
          </div>
        ))}
      </div>
      <button type="button" className={styles.addButton} onClick={add}>+ Add a debt</button>

      <div className={styles.stack} aria-live="polite">
        {ranked.length === 0 ? (
          <div className={styles.empty}>Add a debt with a balance to see your payoff order.</div>
        ) : (
          ranked.map((debt, index) => (
            <div
              key={debt.id}
              className={styles.listRow}
              data-tone={index === 0 ? 'danger' : debt.rateNum > EMERGENCY_RATE ? 'warn' : 'info'}
            >
              <div>
                <strong style={{ display: 'block', fontSize: '1rem' }}>{debt.name || 'Unnamed debt'}</strong>
                <span className={styles.muted}>{debt.rateNum}% APR</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '1.1rem' }}>{formatUSD(debt.balanceNum)}</strong>
                {index === 0 && <div className={styles.flag}>Target First</div>}
              </div>
            </div>
          ))
        )}
        {ranked.length > 0 && (
          <div className={styles.total}>
            <span>{aboveEmergencyLine} above the {EMERGENCY_RATE}% emergency line</span>
            <span>Total {formatUSD(total)}</span>
          </div>
        )}
      </div>
    </ToolCard>
  );
}
