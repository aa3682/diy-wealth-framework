import React from 'react'
import styles from './tool.module.css'

/**
 * Highlighted output block. `tone` picks the colour family
 * (accent, info, danger, warn, neutral). Announces changes to
 * assistive technology by default.
 */
export default function ResultPanel({ tone = 'accent', title = null, split = false, centered = false, children }) {
  const className = [styles.result, split && styles.resultSplit, centered && styles.resultCentered]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={className} data-tone={tone} aria-live="polite">
      {title && <div className={styles.resultTitle}>{title}</div>}
      {children}
    </div>
  )
}
