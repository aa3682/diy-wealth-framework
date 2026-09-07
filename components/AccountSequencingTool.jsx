import React, { useState } from 'react';

export default function AccountSequencingTool() {
  const [income, setIncome] = useState(100000);
  const [matchPercent, setMatchPercent] = useState(4);
  const [hasHDHP, setHasHDHP] = useState(true);
  const [investableCash, setInvestableCash] = useState(20000);

  let remaining = investableCash;
  
  const step1Match = Math.min(remaining, income * (matchPercent / 100));
  remaining -= step1Match;

  const step2HSA = hasHDHP ? Math.min(remaining, 4150) : 0;
  remaining -= step2HSA;

  const step3Roth = Math.min(remaining, 7000);
  remaining -= step3Roth;

  const step4Max401k = Math.min(remaining, 23000 - step1Match);
  remaining -= step4Max401k;

  const step5Taxable = remaining;

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem' }}>Waterfall Sequencer</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Annual Income ($)</label>
          <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} style={{ display: 'block', padding: '0.4rem', borderRadius: '4px', background: '#1e293b', border: '1px solid #475569', color: '#fff' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>401k Match (%)</label>
          <input type="number" value={matchPercent} onChange={(e) => setMatchPercent(Number(e.target.value))} style={{ display: 'block', padding: '0.4rem', width: '80px', borderRadius: '4px', background: '#1e293b', border: '1px solid #475569', color: '#fff' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Cash to Invest/Yr ($)</label>
          <input type="number" value={investableCash} onChange={(e) => setInvestableCash(Number(e.target.value))} style={{ display: 'block', padding: '0.4rem', borderRadius: '4px', background: '#1e293b', border: '1px solid #475569', color: '#fff' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <input type="checkbox" checked={hasHDHP} onChange={(e) => setHasHDHP(e.target.checked)} /> HDHP Eligible
          </label>
        </div>
      </div>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>1. 401k Match: <strong style={{ color: '#22c55e' }}>${step1Match.toLocaleString()}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>2. HSA: <strong style={{ color: '#22c55e' }}>${step2HSA.toLocaleString()}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>3. Roth IRA: <strong style={{ color: '#22c55e' }}>${step3Roth.toLocaleString()}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>4. 401k Max: <strong style={{ color: '#22c55e' }}>${step4Max401k.toLocaleString()}</strong></div>
        <div style={{ padding: '0.75rem', background: '#1e293b', borderRadius: '6px' }}>5. Taxable Brokerage: <strong style={{ color: '#22c55e' }}>${step5Taxable.toLocaleString()}</strong></div>
      </div>
    </div>
  );
}
