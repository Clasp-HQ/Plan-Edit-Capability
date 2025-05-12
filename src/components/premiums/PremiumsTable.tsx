import React from 'react';
import { CompositeRow, AgeBandedRow, VolumeBasedRow, PremiumRow } from '../../utils/premiumSchemas';
import PremiumRowInput from './PremiumRowInput';
import { Table } from '../../ui/components/Table';
import { TextField } from '../../ui/components/TextField';
import { Button } from '../../ui/components/Button';
import { FeatherPlusCircle, FeatherX } from '@subframe/core';
import { DropdownMenu as StyledDropdownMenu } from '../../ui/components/DropdownMenu';
import { FeatherCheck } from '@subframe/core';
import * as SubframeCore from '@subframe/core';

export interface PremiumsTableProps {
  premiumType: 'composite' | 'age_banded' | 'volume_based';
  value: PremiumRow[];
  onChange: (rows: PremiumRow[]) => void;
  showTobaccoRates: boolean;
  showSeparateDependents: boolean;
}

// Composite tier options
const compositeOptions = [
  { value: 'EMP', label: 'Individual' },
  { value: 'EMP_SPOUSE', label: 'Employee + Spouse' },
  { value: 'EMP_CHILDREN', label: 'Employee + Children' },
  { value: 'FAMILY', label: 'Family' },
];

const PremiumsTable: React.FC<PremiumsTableProps> = ({
  premiumType,
  value,
  onChange,
  showTobaccoRates,
  showSeparateDependents,
}) => {
  const isComposite = premiumType === 'composite';
  const isAgeBanded = premiumType === 'age_banded';
  const isVolume = premiumType === 'volume_based';

  // Handler for composite & age-banded rate fields
  const handleRateChange = (
    index: number,
    field: 'baseRate' | 'tobaccoRate' | 'spouseRate' | 'childRate',
    val: number
  ) => {
    const rows = (value as (CompositeRow | AgeBandedRow)[]).map((row, i) =>
      i === index ? { ...row, [field]: val } : row
    );
    onChange(rows);
  };

  // Handlers for volume-based
  const handleVolumeChange = (index: number, field: keyof VolumeBasedRow, val: any) => {
    const rows = (value as VolumeBasedRow[]).map((row, i) =>
      i === index ? { ...row, [field]: val } : row
    );
    onChange(rows);
  };

  const handleAddTier = () => {
    const newRow: VolumeBasedRow = { id: Date.now().toString(), perUnit: 0, unitLabel: '' };
    onChange([...(value as VolumeBasedRow[]), newRow]);
  };

  const handleRemoveTier = (index: number) => {
    const rows = (value as VolumeBasedRow[]).filter((_, i) => i !== index);
    onChange(rows);
  };

  // Category change handler for composite tier or age
  const handleCategoryChange = (index: number, newCat: string) => {
    const rows = (value as (CompositeRow | AgeBandedRow)[]).map((row, i) => {
      if (i !== index) return row;
      if (isComposite) {
        return { ...(row as CompositeRow), tier: newCat as CompositeRow['tier'] };
      } else {
        const ageNum = parseInt(newCat, 10);
        return { ...(row as AgeBandedRow), age: isNaN(ageNum) ? 0 : ageNum, id: newCat };
      }
    });
    onChange(rows);
  };

  if (isVolume) {
    return (
      <div className="flex flex-col gap-4">
        <Table
          header={
            <Table.HeaderRow className="sticky top-0 bg-default-background z-10">
              <Table.HeaderCell>Unit Label</Table.HeaderCell>
              <Table.HeaderCell>Per Unit</Table.HeaderCell>
              <Table.HeaderCell aria-label="Actions" />
            </Table.HeaderRow>
          }
        >
          {(value as VolumeBasedRow[]).map((row, idx) => (
            <Table.Row key={row.id} clickable>
              <Table.Cell>
                <TextField className="w-full">
                  <TextField.Input
                    value={row.unitLabel}
                    onChange={e => handleVolumeChange(idx, 'unitLabel', e.target.value)}
                    placeholder="Label"
                  />
                </TextField>
              </Table.Cell>
              <Table.Cell>
                <PremiumRowInput
                  value={row.perUnit}
                  onChange={val => handleVolumeChange(idx, 'perUnit', val)}
                />
              </Table.Cell>
              <Table.Cell>
                <Button
                  variant="neutral-secondary"
                  size="small"
                  icon={<FeatherX />}
                  onClick={() => handleRemoveTier(idx)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <Button
          variant="neutral-secondary"
          size="small"
          icon={<FeatherPlusCircle />}
          onClick={handleAddTier}
        >
          Add tier
        </Button>
      </div>
    );
  }

  // Composite & Age-banded table
  return (
    <div className="overflow-auto">
      <Table
        header={
          <Table.HeaderRow className="sticky top-0 bg-default-background z-10">
            <Table.HeaderCell className="sticky left-0 z-20 bg-default-background">
              {isComposite ? 'Category' : 'Age'}
            </Table.HeaderCell>
            <Table.HeaderCell>Rate</Table.HeaderCell>
            {showTobaccoRates && <Table.HeaderCell>Tobacco Rate</Table.HeaderCell>}
            {showSeparateDependents && <Table.HeaderCell>Spouse Rate</Table.HeaderCell>}
            {showSeparateDependents && <Table.HeaderCell>Child Rate</Table.HeaderCell>}
          </Table.HeaderRow>
        }
      >
        {(value as (CompositeRow | AgeBandedRow)[]).map((row, idx) => (
          <Table.Row key={row.id} clickable>
            <Table.Cell className="sticky left-0 z-10 bg-white">
              {isComposite ? (
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild>
                    <Button variant="neutral-secondary" size="small" className="w-full text-left">
                      {compositeOptions.find(o => o.value === (row as CompositeRow).tier)?.label}
                    </Button>
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Portal>
                    <SubframeCore.DropdownMenu.Content side="bottom" align="start" sideOffset={4} asChild>
                      <StyledDropdownMenu>
                        {compositeOptions.map(opt => (
                          <StyledDropdownMenu.DropdownItem
                            key={opt.value}
                            icon={
                              (row as CompositeRow).tier === opt.value ? <FeatherCheck /> : null
                            }
                            onClick={() => handleCategoryChange(idx, opt.value)}
                          >
                            {opt.label}
                          </StyledDropdownMenu.DropdownItem>
                        ))}
                      </StyledDropdownMenu>
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
              ) : (
                <TextField className="w-full">
                  <TextField.Input
                    type="number"
                    value={typeof (row as AgeBandedRow).age === 'number' ? (row as AgeBandedRow).age.toString() : ''}
                    onChange={e => handleCategoryChange(idx, e.target.value)}
                  />
                </TextField>
              )}
            </Table.Cell>
            <Table.Cell>
              <PremiumRowInput
                value={isComposite ? (row as CompositeRow).baseRate : (row as AgeBandedRow).baseRate}
                onChange={val => handleRateChange(idx, 'baseRate', val)}
              />
            </Table.Cell>
            {showTobaccoRates && (
              <Table.Cell>
                <PremiumRowInput
                  value={((row as CompositeRow).tobaccoRate ?? (row as AgeBandedRow).tobaccoRate) as number}
                  onChange={val => handleRateChange(idx, 'tobaccoRate', val)}
                />
              </Table.Cell>
            )}
            {showSeparateDependents && (
              <>
                <Table.Cell>
                  <PremiumRowInput
                    value={((row as CompositeRow).spouseRate ?? (row as AgeBandedRow).spouseRate) as number}
                    onChange={val => handleRateChange(idx, 'spouseRate', val)}
                  />
                </Table.Cell>
                <Table.Cell>
                  <PremiumRowInput
                    value={((row as CompositeRow).childRate ?? (row as AgeBandedRow).childRate) as number}
                    onChange={val => handleRateChange(idx, 'childRate', val)}
                  />
                </Table.Cell>
              </>
            )}
          </Table.Row>
        ))}
      </Table>
    </div>
  );
};

export default PremiumsTable; 