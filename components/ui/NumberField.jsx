import React, { useId } from 'react'
import styles from './tool.module.css'

/**
 * A labelled numeric input. Spread `inputProps` from useNumberInput onto it.
 * The label is associated with the input via id/htmlFor so assistive
 * technology announces it and clicking the label focuses the field.
 *
 * Any other props are spread onto the input.
 *
 * @param {{ label: React.ReactNode, hint?: React.ReactNode, spaced?: boolean } & React.InputHTMLAttributes<HTMLInputElement>} props
 */
export default function NumberField({ id, label, hint = null, step, spaced = false, ...inputProps }) {
  const autoId = useId()
  const fieldId = id || autoId
  return (
    <div className={spaced ? `${styles.field} ${styles.fieldSpaced}` : styles.field}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
      </label>
      {hint && <div className={styles.hint}>{hint}</div>}
      <input id={fieldId} type="number" step={step} className={styles.input} {...inputProps} />
    </div>
  )
}
