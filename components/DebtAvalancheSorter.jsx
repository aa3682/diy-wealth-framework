import React from 'react';
import ToolCard from './ui/ToolCard';
import styles from './ui/tool.module.css';
import { formatUSD } from '../lib/format';

const SAMPLE_DEBTS = [
  { id: 1, name: 'Credit Card', balance: 5400, rate: 24.99 },
  { id: 2, name: 'Car Loan', balance: 12500, rate: 7.50 },
  { id: 3, name: 'Student Loan', balance: 22000, rate: 5.00 }
];

export default function DebtAvalancheSorter() {
  const sortedDebts = [...SAMPLE_DEBTS].sort((a, b) => b.rate - a.rate);

  return (
    <ToolCard
      title="Debt Avalanche Sorter"
      lede="Debts are mathematically ranked by interest rate. Route all excess cash to the top item."
    >
      <div className={styles.stack}>
        {sortedDebts.map((debt, index) => (
          <div key={debt.id} className={styles.listRow} data-tone={index === 0 ? 'danger' : 'info'}>
            <div>
              <strong style={{ display: 'block', fontSize: '1rem' }}>{debt.name}</strong>
              <span className={styles.muted}>{debt.rate}% APR</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong style={{ fontSize: '1.1rem' }}>{formatUSD(debt.balance)}</strong>
              {index === 0 && <div className={styles.flag}>Target First</div>}
            </div>
          </div>
        ))}
      </div>
    </ToolCard>
  );
}
