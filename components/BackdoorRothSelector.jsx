import React from 'react';
import NumberField from './ui/NumberField';
import { useNumberInput } from '../lib/useNumberInput';
import { formatUSD, formatPercent } from '../lib/format';

export default function BackdoorRothSelector() {
  const contribution = useNumberInput(7000);
  const existingBalance = useNumberInput(0);

  const activeContribution = contribution.value;
  const activeBalance = existingBalance.value;

  const totalBalance = activeContribution + activeBalance;
  const taxFreeRatio = totalBalance > 0 ? activeContribution / totalBalance : 1;
  const taxableRatio = totalBalance > 0 ? activeBalance / totalBalance : 0;
  
  const taxableAmount = activeContribution * taxableRatio;
  const taxFreeAmount = activeContribution * taxFreeRatio;
  const hasProRataTrap = activeBalance > 0;

  const fieldStyles = {
    labelStyle: { fontWeight: 'bold' },
    inputStyle: { padding: '0.75rem' },
  };

  return (
    <div style={{ border: '1px solid #334155', borderRadius: '8px', padding: '1.5rem', margin: '2rem 0', backgroundColor: '#0f172a', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ marginTop: 0, fontSize: '1.25rem', color: '#f8fafc' }}>Backdoor Roth Diagnostic (Pro-Rata Trap)</h3>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        The IRS aggregates all your Traditional, SEP, and SIMPLE IRAs to determine the taxability of a Backdoor Roth conversion. Enter your balances below to check your exposure.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <NumberField
          id="roth-contribution"
          label="Planned Non-Deductible Contribution ($)"
          step={500}
          {...fieldStyles}
          {...contribution.inputProps}
        />
        <NumberField
          id="roth-existing-balance"
          label="Existing Pre-Tax IRA Balance ($)"
          step={1000}
          {...fieldStyles}
          {...existingBalance.inputProps}
        />
      </div>

      <div style={{ padding: '1.25rem', borderRadius: '6px', backgroundColor: hasProRataTrap ? '#450a0a' : '#022c22', borderLeft: hasProRataTrap ? '4px solid #ef4444' : '4px solid #10b981' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: hasProRataTrap ? '#fca5a5' : '#6ee7b7', marginBottom: '0.5rem' }}>
          {hasProRataTrap ? '⚠️ Pro-Rata Trap Detected' : '✅ Clear to Convert'}
        </div>
        
        {hasProRataTrap ? (
          <div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#f8fafc', lineHeight: '1.5' }}>
              Because you have <strong>{formatUSD(activeBalance)}</strong> in pre-tax IRAs, the IRS views your conversion proportionally.
            </p>
            <ul style={{ marginTop: '0.75rem', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
              <li><strong>Tax-Free Portion:</strong> {formatUSD(Math.round(taxFreeAmount))} ({formatPercent(taxFreeRatio * 100)})</li>
              <li><strong>Taxable Portion:</strong> {formatUSD(Math.round(taxableAmount))} ({formatPercent(taxableRatio * 100)})</li>
            </ul>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#fca5a5', fontWeight: 'bold' }}>
              The Solution: Roll your existing {formatUSD(activeBalance)} into an active employer 401(k) before December 31st to empty your IRA balance and make this conversion 100% tax-free.
            </p>
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#f8fafc', lineHeight: '1.5' }}>
            You have $0 in pre-tax IRA balances. Your entire <strong>{formatUSD(activeContribution)}</strong> conversion will be 100% tax-free. Execute the conversion before December 31st.
          </p>
        )}
      </div>
    </div>
  );
}
