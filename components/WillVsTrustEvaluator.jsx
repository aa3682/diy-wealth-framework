import React, { useState } from 'react';
import ToolCard from './ui/ToolCard';
import NumberField from './ui/NumberField';
import CheckOption from './ui/CheckOption';
import ResultPanel from './ui/ResultPanel';
import styles from './ui/tool.module.css';
import { useNumberInput } from '../lib/useNumberInput';
import { evaluateWillVsTrust } from '../lib/willVsTrust';

export default function WillVsTrustEvaluator() {
  const netWorth = useNumberInput(400000);
  const [multiState, setMultiState] = useState(false);
  const [staggered, setStaggered] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const { highNetWorth, requiresTrust } = evaluateWillVsTrust({ netWorth: netWorth.value, multiState, staggered, privacy });

  return (
    <ToolCard
      title="Will vs. Trust Evaluator"
      lede="A Last Will generally goes through probate (public, slow, often costly). A funded Revocable Living Trust avoids it for the assets it holds. Select your criteria below to see how the framework's criteria apply."
    >
      <NumberField
        id="trust-net-worth"
        label="Probate-Exposed Net Worth ($)"
        hint="Include real estate, business equity, and cash. Exclude 401(k)s and IRAs, which pass directly via beneficiaries."
        step={50000}
        spaced
        {...netWorth.inputProps}
      />

      <div className={styles.grid} style={{ '--min': '100%' }}>
        <CheckOption card checked={multiState} onChange={(e) => setMultiState(e.target.checked)} detail="I own real estate in more than one US state (Triggers Ancillary Probate).">
          Multi-State Real Estate
        </CheckOption>
        <CheckOption card checked={staggered} onChange={(e) => setStaggered(e.target.checked)} detail="I want heirs to receive money in stages (e.g., ages 25, 30, 35) rather than a lump sum.">
          Controlled Distribution
        </CheckOption>
        <CheckOption card checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} detail="I want to keep my asset distribution off the public court record.">
          Maximum Privacy
        </CheckOption>
      </div>

      <ResultPanel
        tone={requiresTrust ? 'accent' : 'info'}
        title={`Framework Result: ${requiresTrust ? 'Revocable Living Trust' : 'Simple Will + TOD/POD'}`}
      >
        <div className={styles.resultBody}>
          {requiresTrust ? (
            <div>
              Your inputs meet the framework&apos;s criteria for a Revocable Living Trust.
              <ul>
                {highNetWorth && <li>Probate fees on a $1M+ estate vary by state and can be substantial.</li>}
                {multiState && <li>Out-of-state property can mean opening a separate probate in each state where it sits.</li>}
                {staggered && <li>A Will alone pays out at once; a Trust is what holds money over time for delayed or milestone-based payouts.</li>}
                {privacy && <li>Wills become public record. A Trust keeps the distribution off the public court record.</li>}
              </ul>
            </div>
          ) : (
            <div>
              Your inputs fall under the framework&apos;s criteria for a standard Last Will and Testament, paired with Transfer-On-Death (TOD) and Payable-On-Death (POD) designations on bank and brokerage accounts to keep them out of probate.
            </div>
          )}
        </div>
      </ResultPanel>
    </ToolCard>
  );
}
