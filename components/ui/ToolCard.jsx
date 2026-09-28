import React from 'react'
import styles from './tool.module.css'

/** Outer card for an interactive calculator. */
export default function ToolCard({ title, lede, children }) {
  return (
    <div className={styles.tool}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {lede && <p className={styles.lede}>{lede}</p>}
      {children}
    </div>
  )
}
