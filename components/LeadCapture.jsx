import React from 'react';
import styles from './LeadCapture.module.css';

// Placeholder until the owner supplies the real template download and
// booking URLs. While TEMPLATES_URL is the placeholder the card is not
// rendered at all, so the live site never shows buttons that go nowhere.
// Setting a real URL brings the card back with no other change.
const PLACEHOLDER_URL = '#';
const TEMPLATES_URL = PLACEHOLDER_URL;
const BOOKING_URL = PLACEHOLDER_URL;

/**
 * Lead-capture card. Hidden while the templates link is a placeholder;
 * the booking line is hidden while the booking link is.
 *
 * @param {object} props
 * @param {string} [props.templatesUrl]
 * @param {string} [props.bookingUrl]
 */
export default function LeadCapture({ templatesUrl = TEMPLATES_URL, bookingUrl = BOOKING_URL }) {
  if (templatesUrl === PLACEHOLDER_URL) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Automate This Framework</h3>
      <p className={styles.body}>
        Stop guessing. Download the Millennial Money Clarity <strong>Notion Cash Flow Tracker</strong> and <strong>Google Sheets Net Worth Dashboard</strong> to build your systems today.
      </p>

      <a href={templatesUrl} className={`${styles.cta} cta-button-hover`}>
        Download the Free Templates
      </a>

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
