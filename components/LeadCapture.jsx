import React from 'react';
import styles from './LeadCapture.module.css';

// The templates are static files in public/templates/, built by
// scripts/build-templates.py. The booking line stays hidden until the
// owner supplies a real booking URL.
const PLACEHOLDER_URL = '#';
const CASH_FLOW_URL = '/templates/cash-flow-tracker.xlsx';
const NET_WORTH_URL = '/templates/net-worth-dashboard.xlsx';
const BOOKING_URL = PLACEHOLDER_URL;

/**
 * Lead-capture card with a download button per template. The booking
 * line is hidden while the booking link is a placeholder.
 *
 * @param {object} props
 * @param {string} [props.bookingUrl]
 */
export default function LeadCapture({ bookingUrl = BOOKING_URL }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Automate This Framework</h3>
      <p className={styles.body}>
        Stop guessing. Download the DIY Wealth Framework <strong>Cash Flow Tracker</strong> and <strong>Net Worth Dashboard</strong> to build your systems today.
      </p>

      <div className={styles.actions}>
        <a href={CASH_FLOW_URL} download aria-label="Download the Cash Flow Tracker (.xlsx)" className={`${styles.cta} cta-button-hover`}>
          Cash Flow Tracker
        </a>
        <a href={NET_WORTH_URL} download aria-label="Download the Net Worth Dashboard (.xlsx)" className={`${styles.cta} cta-button-hover`}>
          Net Worth Dashboard
        </a>
      </div>
      <p className={styles.note}>Free .xlsx files. Open in Excel, Google Sheets or Numbers.</p>

      {bookingUrl !== PLACEHOLDER_URL && (
        <p className={styles.footnote}>
          Looking for personalized, one-on-one strategy? <br />
          <a href={bookingUrl} className={styles.secondary}>
            Book a diagnostic call with AlignFlow →
          </a>
        </p>
      )}
    </div>
  );
}
