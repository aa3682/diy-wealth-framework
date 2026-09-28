import React from 'react'
import styles from './tool.module.css'

/**
 * Outer card for an interactive calculator.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.title]
 * @param {React.ReactNode} [props.lede]
 * @param {React.ReactNode} props.children
 */
export default function ToolCard({ title, lede = null, children }) {
  return (
    <div className={styles.tool}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {lede && <p className={styles.lede}>{lede}</p>}
      {children}
    </div>
  )
}
