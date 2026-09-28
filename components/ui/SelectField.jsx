import React from 'react'
import styles from './tool.module.css'

/**
 * A labelled <select>. Pass <option> elements as children.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {React.ReactNode} props.label
 * @param {string | number} props.value
 * @param {React.ChangeEventHandler<HTMLSelectElement>} props.onChange
 * @param {React.ReactNode} props.children
 */
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
