import React, { useState } from 'react';

export default function WillVsTrustEvaluator() {
  const [netWorth, setNetWorth] = useState(400000);
  const [multiState, setMultiState] = useState(false);
  const [staggered, setStaggered] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  // Treat an empty input as 0 for the logic calculations
  const activeNetWorth = Number(netWorth) || 0;
  const highNetWorth = activeNetWorth >= 1000000;
  const requiresTrust = highNetWorth || multiState || staggered || privacy;

  return (
    <div style={{
      border: '1px solid #334155',
      borderRadius: '8px',
      padding: '1.5rem',
      margin: '2rem 0',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#f8fafc' }}>Will vs. Trust Evaluator</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        A Last Will goes through probate (public, slow, expensive). A Revocable Living Trust bypasses probate entirely. Select your criteria below to see which structure your wealth architecture requires.
      </p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: '#cbd5e1', fontWeight: 'bold' }}>
          Probate-Exposed Net Worth ($)
        </label>
        <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem' }}>
          Include real estate, business equity, and cash. Exclude 401(k)s and IRAs, which pass directly via beneficiaries.
        </div>
        <input
          type="number"
          step="50000"
          value={netWorth}
          onChange={(e) => setNetWorth(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
          style={{
            width: '100%',
            maxWidth: '300px',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #475569',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            fontSize: '1rem'
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: '#cbd5e1', backgroundColor: '#1e293b', padding: '0.75rem', borderRadius: '6px' }}>
          <input 
            type="checkbox" 
            checked={multiState} 
            onChange={(e) => setMultiState(e.target.checked)} 
            style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
          />
          <div>
            <strong>Multi-State Real Estate</strong>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>I own real estate in more than one US state (Triggers Ancillary Probate).</div>
          </div>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: '#cbd5e1', backgroundColor: '#1e293b', padding: '0.75rem', borderRadius: '6px' }}>
          <input 
            type="checkbox" 
            checked={staggered} 
            onChange={(e) => setStaggered(e.target.checked)} 
            style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
          />
          <div>
            <strong>Controlled Distribution</strong>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>I want heirs to receive money in stages (e.g., ages 25, 30, 35) rather than a lump sum.</div>
          </div>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: '#cbd5e1', backgroundColor: '#1e293b', padding: '0.75rem', borderRadius: '6px' }}>
          <input 
            type="checkbox" 
            checked={privacy} 
            onChange={(e) => setPrivacy(e.target.checked)} 
            style={{ width: '18px', height: '18px', accentColor: '#10b981' }}
          />
          <div>
            <strong>Maximum Privacy</strong>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>I want to keep my asset distribution off the public court record.</div>
          </div>
        </label>
      </div>

      <div style={{
        padding: '1.25rem',
        borderRadius: '6px',
        backgroundColor: requiresTrust ? '#022c22' : '#1e293b',
        borderLeft: requiresTrust ? '4px solid #10b981' : '4px solid #38bdf8'
      }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: requiresTrust ? '#6ee7b7' : '#38bdf8', marginBottom: '0.5rem' }}>
          Recommendation: {requiresTrust ? 'Revocable Living Trust' : 'Simple Will + TOD/POD'}
        </div>
        <div style={{ margin: 0, fontSize: '0.95rem', color: '#f8fafc', lineHeight: '1.5' }}>
          {requiresTrust ? (
            <div>
              You have crossed the threshold requiring a Revocable Living Trust. 
              <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem', color: '#a7f3d0', fontSize: '0.85rem' }}>
                {highNetWorth && <li>A $1M+ estate could lose tens of thousands of dollars to statutory probate fees.</li>}
                {multiState && <li>Holding out-of-state property forces your family to hire lawyers and open probate in multiple states.</li>}
                {staggered && <li>A Will cannot hold money over time; only a Trust can dictate delayed or milestone-based payouts.</li>}
                {privacy && <li>Wills become public record. A Trust keeps your family's finances completely private.</li>}
              </ul>
            </div>
          ) : (
            <div>
              Based on your current profile, a standard Last Will and Testament is sufficient, provided you diligently assign Transfer-On-Death (TOD) and Payable-On-Death (POD) designations to all your bank and brokerage accounts to avoid probate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
