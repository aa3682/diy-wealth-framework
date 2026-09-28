import React from 'react';
import NumberField from './ui/NumberField';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD, formatPercent } from '../lib/format';

const DIY_EXPENSE_RATIO = 0.03;
const ADVISOR_AUM_FEE = 1.00;

export default function FeeDragSimulator() {
  const initialInvestment = useNumberInput(50000);
  const monthlyContribution = useNumberInput(1000);
  const years = useNumberInput(30, { min: 1, max: 100 });
  const grossReturn = useNumberInput(8, { min: 0, max: 50 });

  const calculateFV = (annualRate) => {
    const r = annualRate / 100 / 12;
    const n = years.value * 12;
    if (r === 0) return initialInvestment.value + (monthlyContribution.value * n);
    
    const compoundPrincipal = initialInvestment.value * Math.pow(1 + r, n);
    const compoundContributions = monthlyContribution.value * ((Math.pow(1 + r, n) - 1) / r);
    return compoundPrincipal + compoundContributions;
  };

  const fvDIY = calculateFV(grossReturn.value - DIY_EXPENSE_RATIO);
  const fvAUM = calculateFV(grossReturn.value - ADVISOR_AUM_FEE);

  const wealthLost = fvDIY - fvAUM;
  const percentageLost = fvDIY > 0 ? (wealthLost / fvDIY) * 100 : 0;

  const fieldStyles = {
    labelStyle: { fontSize: '0.8rem' },
    inputStyle: { padding: '0.5rem', borderRadius: '4px', fontSize: undefined },
  };

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem', margin: '2rem 0', backgroundColor: '#0f172a', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#f8fafc' }}>The 1% Fee Drag Simulator</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        A 1% advisory fee sounds small, but you don't pay it once—you pay it every year on your total balance, compounding against you. See the math for yourself.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <NumberField id="fee-initial" label="Initial Portfolio ($)" step={5000} {...fieldStyles} {...initialInvestment.inputProps} />
        <NumberField id="fee-monthly" label="Monthly Addition ($)" step={100} {...fieldStyles} {...monthlyContribution.inputProps} />
        <NumberField id="fee-years" label="Time Horizon (Yrs)" step={1} {...fieldStyles} {...years.inputProps} />
        <NumberField id="fee-return" label="Gross Return (%)" step={0.5} {...fieldStyles} {...grossReturn.inputProps} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '6px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>DIY Indexing ({DIY_EXPENSE_RATIO}% Fee)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>{formatUSD(Math.round(fvDIY))}</div>
        </div>
        
        <div style={{ padding: '1rem', backgroundColor: '#1e293b', borderRadius: '6px', borderLeft: '4px solid #ef4444' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>1% AUM Advisor</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f8fafc' }}>{formatUSD(Math.round(fvAUM))}</div>
        </div>
      </div>

      <div style={{ padding: '1.25rem', backgroundColor: '#450a0a', borderRadius: '6px', textAlign: 'center', border: '1px solid #7f1d1d' }}>
        <div style={{ fontSize: '0.9rem', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Wealth Destroyed by 1% Fee</div>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem' }}>{formatUSD(Math.round(wealthLost))}</div>
        <div style={{ fontSize: '0.9rem', color: '#fca5a5' }}>You surrender <strong>{formatPercent(percentageLost)}</strong> of your total potential terminal wealth to fees.</div>
      </div>
    </div>
  );
}
