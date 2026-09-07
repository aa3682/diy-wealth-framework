import React, { useState } from 'react';

export default function EstateAuditChecklist() {
  const [checks, setChecks] = useState({ 1: false, 2: false, 3: false, 4: false });
  const toggle = (id) => setChecks({ ...checks, [id]: !checks[id] });
  const score = Object.values(checks).filter(Boolean).length;

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.25rem', margin: '1.5rem 0', backgroundColor: '#0f172a', color: '#f8fafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Estate Completeness Score</h3>
        <div style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: score === 4 ? '#166534' : '#7f1d1d', fontWeight: 'bold' }}>
          {score} / 4
        </div>
      </div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <label style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: '#1e293b', borderRadius: '6px', cursor: 'pointer' }}>
          <input type="checkbox" checked={checks[1]} onChange={() => toggle(1)} style={{ transform: 'scale(1.2)' }} />
          <div>
            <strong>Beneficiaries Assigned</strong>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Primary/Contingent named on all retirement accounts.</div>
          </div>
        </label>
        <label style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: '#1e293b', borderRadius: '6px', cursor: 'pointer' }}>
          <input type="checkbox" checked={checks[2]} onChange={() => toggle(2)} style={{ transform: 'scale(1.2)' }} />
          <div>
            <strong>POD/TOD Activated</strong>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Checking, savings, and taxable brokerages have Transfer-On-Death.</div>
          </div>
        </label>
        <label style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: '#1e293b', borderRadius: '6px', cursor: 'pointer' }}>
          <input type="checkbox" checked={checks[3]} onChange={() => toggle(3)} style={{ transform: 'scale(1.2)' }} />
          <div>
            <strong>Will / Trust Active</strong>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Executed documents outlining asset distribution (and guardians if applicable).</div>
          </div>
        </label>
        <label style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: '#1e293b', borderRadius: '6px', cursor: 'pointer' }}>
          <input type="checkbox" checked={checks[4]} onChange={() => toggle(4)} style={{ transform: 'scale(1.2)' }} />
          <div>
            <strong>Advance Directives</strong>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Financial POA and Medical Proxy officially named.</div>
          </div>
        </label>
      </div>
    </div>
  );
}
