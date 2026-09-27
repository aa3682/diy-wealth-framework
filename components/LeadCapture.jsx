import React from 'react';

export default function LeadCapture() {
  return (
    <div style={{
      border: '1px solid #10b981',
      borderRadius: '8px',
      padding: '2rem',
      margin: '3rem 0',
      backgroundColor: '#022c22',
      color: '#f8fafc',
      textAlign: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold' }}>
        Automate This Framework
      </h3>
      <p style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        Stop guessing. Download the Millennial Money Clarity <strong>Notion Cash Flow Tracker</strong> and <strong>Google Sheets Net Worth Dashboard</strong> to build your systems today.
      </p>
      <a href="#" style={{
        display: 'inline-block',
        backgroundColor: '#10b981',
        color: '#022c22',
        padding: '0.875rem 1.5rem',
        borderRadius: '6px',
        fontWeight: 'bold',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'background-color 0.2s'
      }}>
        Download the Free Templates
      </a>
      <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '1.5rem' }}>
        Looking for personalized, one-on-one strategy? <br/>
        <a href="#" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '600' }}>
          Book a diagnostic call with AlignFlow →
        </a>
      </p>
    </div>
  );
}
