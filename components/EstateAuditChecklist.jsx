import React, { useState } from 'react';
import CheckOption from './ui/CheckOption';
import styles from './ui/tool.module.css';

const ITEMS = [
  { id: 'beneficiaries', title: 'Beneficiaries Assigned', detail: 'Primary/Contingent named on all retirement accounts.' },
  { id: 'tod', title: 'POD/TOD Activated', detail: 'Checking, savings, and taxable brokerages have Transfer-On-Death.' },
  { id: 'will', title: 'Will / Trust Active', detail: 'Executed documents outlining asset distribution (and guardians if applicable).' },
  { id: 'directives', title: 'Advance Directives', detail: 'Financial POA and Medical Proxy officially named.' },
];

export default function EstateAuditChecklist() {
  const [checks, setChecks] = useState({});
  const toggle = (id) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  const score = ITEMS.filter((item) => checks[item.id]).length;
  const complete = score === ITEMS.length;

  return (
    <div className={styles.tool}>
      <div className={styles.header}>
        <h3 className={styles.title}>Estate Completeness Score</h3>
        <div className={complete ? `${styles.badge} ${styles.badgeComplete}` : styles.badge} aria-live="polite">
          {score} / {ITEMS.length}
        </div>
      </div>
      <div className={styles.stack}>
        {ITEMS.map((item) => (
          <CheckOption key={item.id} card checked={!!checks[item.id]} onChange={() => toggle(item.id)} detail={item.detail}>
            {item.title}
          </CheckOption>
        ))}
      </div>
    </div>
  );
}
