import React from 'react'
import styles from './tool.module.css'

/**
 * A checkbox wrapped in its label. `card` gives it a surface background.
 * Pass `detail` for a secondary line under the main text.
 */
export default function CheckOption({ checked, onChange, card = false, detail = null, children }) {
  return (
    <label className={card ? `${styles.check} ${styles.checkCard}` : styles.check}>
      <input type="checkbox" className={styles.checkbox} checked={checked} onChange={onChange} />
      {detail ? (
        <div>
          <strong>{children}</strong>
          <div className={styles.checkDetail}>{detail}</div>
        </div>
      ) : (
        children
      )}
    </label>
  )
}
