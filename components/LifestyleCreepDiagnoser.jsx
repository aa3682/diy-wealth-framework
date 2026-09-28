import React from 'react';
import NumberField from './ui/NumberField';
import { useNumberInput } from '../lib/useNumberInput';
import { formatPercent } from '../lib/format';

export default function LifestyleCreepDiagnoser() {
  const pastIncome = useNumberInput(100000);
  const currentIncome = useNumberInput(130000);
  const pastSavings = useNumberInput(15000);
  const currentSavings = useNumberInput(18000);

  const incomeDelta = currentIncome.value - pastIncome.value;
  const savingsDelta = currentSavings.value - pastSavings.value;
  
  let captureRate = 0;
  if (incomeDelta > 0) {
    captureRate = (savingsDelta / incomeDelta) * 100;
  }

  let statusColor = '#ef4444'; 
  let statusBg = '#450a0a';
  let statusText = '⚠️ Severe Lifestyle Creep';
  let advice = `You captured only ${formatPercent(captureRate)} of your income increase. You are spending almost all of your new money. You urgently need an intermediate Holding Account to trap raises before they hit your checking account.`;

  if (incomeDelta <= 0) {
    statusColor = '#94a3b8';
    statusBg = '#1e293b';
    statusText = 'Income Stagnant / Decreased';
    advice = 'Your income has not increased during this period. Focus on increasing your earning power or reducing baseline expenses.';
  } else if (captureRate >= 50) {
    statusColor = '#10b981'; 
    statusBg = '#022c22';
    statusText = '✅ Excellent Wealth Capture';
    advice = `You captured ${formatPercent(captureRate)} of your new income. Your cash flow systems are highly optimized and successfully resisting lifestyle inflation.`;
  } else if (captureRate >= 20) {
    statusColor = '#f59e0b'; 
    statusBg = '#451a03';
    statusText = '⚠️ Moderate Creep';
    advice = `You captured ${formatPercent(captureRate)} of your raise. You are hitting the baseline 20% target, but your lifestyle is inflating noticeably. Consider routing your next raise entirely to investments.`;
  }

  const fieldStyles = {
    labelStyle: { color: '#94a3b8' },
    inputStyle: { padding: '0.5rem', borderRadius: '4px', backgroundColor: '#0f172a', fontSize: undefined },
  };

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem', margin: '2rem 0', backgroundColor: '#0f172a', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#f8fafc' }}>Raise Capture Diagnostic</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        Measure your lifestyle inflation over the last 3 years. Are you actually capturing your career growth, or just buying more expensive coffee?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '6px', borderTop: '4px solid #475569' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#cbd5e1' }}>3 Years Ago</div>
          <NumberField id="creep-past-income" label="Annual Income ($)" step={1000} wrapperStyle={{ marginBottom: '1rem' }} {...fieldStyles} {...pastIncome.inputProps} />
          <NumberField id="creep-past-savings" label="Annual Savings ($)" step={1000} {...fieldStyles} {...pastSavings.inputProps} />
        </div>

        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '6px', borderTop: '4px solid #38bdf8' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#38bdf8' }}>Today</div>
          <NumberField id="creep-current-income" label="Annual Income ($)" step={1000} wrapperStyle={{ marginBottom: '1rem' }} {...fieldStyles} {...currentIncome.inputProps} />
          <NumberField id="creep-current-savings" label="Annual Savings ($)" step={1000} {...fieldStyles} {...currentSavings.inputProps} />
        </div>
      </div>

      <div style={{ padding: '1.25rem', borderRadius: '6px', backgroundColor: statusBg, borderLeft: `4px solid ${statusColor}` }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: statusColor, marginBottom: '0.5rem' }}>{statusText}</div>
        <p style={{ margin: 0, fontSize: '0.95rem', color: '#f8fafc', lineHeight: '1.5' }}>{advice}</p>
      </div>
    </div>
  );
}
