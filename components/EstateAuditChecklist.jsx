import React, { useState } from 'react';
import CheckOption from './ui/CheckOption';
import styles from './ui/tool.module.css';
import { ESTATE_ITEMS, estateScore } from '../lib/estateAudit';

export default function EstateAuditChecklist() {
  const [checks, setChecks] = useState(/** @type {Record<string, boolean>} */ ({}));
  /** @param {string} id */
  const toggle = (id) => setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  const { score, total, complete } = estateScore(checks);

  return (
    <div className={styles.tool}>
      <div className={styles.header}>
        <h3 className={styles.title}>Estate Completeness Score</h3>
        <div className={complete ? `${styles.badge} ${styles.badgeComplete}` : styles.badge} aria-live="polite">
          {score} / {total}
        </div>
      </div>
      <div className={styles.stack}>
        {ESTATE_ITEMS.map((item) => (
          <CheckOption key={item.id} card checked={!!checks[item.id]} onChange={() => toggle(item.id)} detail={item.detail}>
            {item.title}
          </CheckOption>
        ))}
      </div>
    </div>
  );
}
