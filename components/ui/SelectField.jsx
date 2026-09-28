import React from 'react'
import styles from './tool.module.css'

/** A labelled <select>. Pass <option> elements as children. */
export default function SelectField({ id, label, value, onChange, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} className={styles.select} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  )
}
