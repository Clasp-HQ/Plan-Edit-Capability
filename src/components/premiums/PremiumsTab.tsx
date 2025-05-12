import React, { useState, useEffect } from 'react';
import { generateCompositeRows, generateAgeBandedRows, PremiumRow } from '../../utils/premiumSchemas';
import PremiumsTable from './PremiumsTable';
import { PremiumToggles } from './toggles';
import { ToggleGroup } from '../../ui/components/ToggleGroup';

export type PremiumType = 'composite' | 'age_banded' | 'volume_based';

const PremiumsTab: React.FC = () => {
  const [premiumType, setPremiumType] = useState<PremiumType>('composite');
  const [showTobaccoRates, setShowTobaccoRates] = useState(false);
  const [showSeparateDependents, setShowSeparateDependents] = useState(false);
  const [rows, setRows] = useState<PremiumRow[]>(() =>
    generateCompositeRows()
  );

  // Seed rows when premiumType changes
  useEffect(() => {
    if (premiumType === 'composite') {
      setRows(generateCompositeRows());
    } else if (premiumType === 'age_banded') {
      setRows(generateAgeBandedRows());
    } else {
      setRows([]);
    }
  }, [premiumType]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <ToggleGroup
          type="single"
          value={premiumType}
          onValueChange={(value: string) => setPremiumType(value as PremiumType)}
          className="gap-0.5"
        >
          <ToggleGroup.Item value="composite">Composite</ToggleGroup.Item>
          <ToggleGroup.Item value="age_banded">Age Banded</ToggleGroup.Item>
          <ToggleGroup.Item value="volume_based">Volume Based</ToggleGroup.Item>
        </ToggleGroup>
        <PremiumToggles
          showTobaccoRates={showTobaccoRates}
          onToggleTobaccoRates={setShowTobaccoRates}
          showSeparateDependents={showSeparateDependents}
          onToggleSeparateDependents={setShowSeparateDependents}
        />
      </div>
      <PremiumsTable
        premiumType={premiumType}
        value={rows}
        onChange={setRows}
        showTobaccoRates={showTobaccoRates}
        showSeparateDependents={showSeparateDependents}
      />
    </div>
  );
};

export default PremiumsTab; 