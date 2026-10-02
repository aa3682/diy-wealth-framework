import React from 'react';
import styles from './LeadCapture.module.css';

// The templates are static files in public/templates/, built by
// scripts/build-templates.py. The booking line stays hidden until the
// owner supplies a real booking URL.
// The cheat sheet PDF in public/downloads/ is rendered from sources/2026-money-cheat-sheet.html.
const PLACEHOLDER_URL = '#';
const CASH_FLOW_URL = '/templates/cash-flow-tracker.xlsx';
const NET_WORTH_URL = '/templates/net-worth-dashboard.xlsx';
const CHEAT_SHEET_URL = '/downloads/2026-money-cheat-sheet.pdf';
const BOOKING_URL = PLACEHOLDER_URL;

/**
 * Lead-capture card with a download button per file. The booking
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
        <a href={CHEAT_SHEET_URL} download aria-label="Download the 2026 Money Cheat Sheet (PDF)" className={`${styles.cta} cta-button-hover`}>
          2026 Cheat Sheet
        </a>
      </div>
      <p className={styles.note}>Free .xlsx templates for Excel, Google Sheets or Numbers, plus a one-page 2026 figures PDF.</p>

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
