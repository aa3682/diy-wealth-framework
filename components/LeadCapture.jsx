import React from 'react';
import styles from './LeadCapture.module.css';

// TODO: replace both placeholder hrefs with the real template download and
// booking URLs.
const TEMPLATES_URL = '#';
const BOOKING_URL = '#';

export default function LeadCapture() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Automate This Framework</h3>
      <p className={styles.body}>
        Stop guessing. Download the Millennial Money Clarity <strong>Notion Cash Flow Tracker</strong> and <strong>Google Sheets Net Worth Dashboard</strong> to build your systems today.
      </p>

      <a href={TEMPLATES_URL} className={`${styles.cta} cta-button-hover`}>
        Download the Free Templates
      </a>

      <p className={styles.footnote}>
        Looking for personalized, one-on-one strategy? <br />
        <a href={BOOKING_URL} className={styles.secondary}>
          Book a diagnostic call with AlignFlow →
        </a>
      </p>
    </div>
  );
}
