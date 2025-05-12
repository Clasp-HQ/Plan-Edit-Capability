import React from 'react';
import { Switch } from '@/ui/components/Switch';

export interface PremiumTogglesProps {
  showTobaccoRates: boolean;
  onToggleTobaccoRates: (checked: boolean) => void;
  showSeparateDependents: boolean;
  onToggleSeparateDependents: (checked: boolean) => void;
}

export const PremiumToggles: React.FC<PremiumTogglesProps> = ({
  showTobaccoRates,
  onToggleTobaccoRates,
  showSeparateDependents,
  onToggleSeparateDependents,
}) => (
  <div className="flex items-center gap-4">
    <div className="flex items-center gap-2">
      <Switch checked={showTobaccoRates} onCheckedChange={onToggleTobaccoRates} />
      <span className="text-body font-body text-default-font">Tobacco Usage Rates</span>
    </div>
    <div className="flex items-center gap-2">
      <Switch checked={showSeparateDependents} onCheckedChange={onToggleSeparateDependents} />
      <span className="text-body font-body text-default-font">Separate Dependent Categories</span>
    </div>
  </div>
); 