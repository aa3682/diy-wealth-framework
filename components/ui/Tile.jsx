import React from 'react'
import styles from './tool.module.css'

/**
 * Small stat tile: label, value, optional footnote.
 *
 * @param {object} props
 * @param {string} [props.tone]
 * @param {React.ReactNode} props.label
 * @param {React.ReactNode} props.value
 * @param {React.ReactNode} [props.note]
 */
export default function Tile({ tone = 'info', label, value, note = null }) {
  return (
    <div className={styles.tile} data-tone={tone}>
      <div className={styles.tileLabel}>{label}</div>
      <div className={styles.tileValue}>{value}</div>
      {note && <div className={styles.tileNote}>{note}</div>}
    </div>
  )
}
