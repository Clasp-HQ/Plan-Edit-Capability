import React, { useState } from "react";
import { Button } from "./Button";
import { TextField } from "./TextField";
import { Table } from "./Table";
import { Accordion } from "./Accordion";
import { Switch } from "./Switch";
import { RadioCardGroup } from "./RadioCardGroup";

// Enums duplicated here; in a real refactor these would be shared via a common file
export enum PremiumType {
  COMPOSITE = "composite",
  AGE_BANDED = "age_banded",
  VOLUME_BASED = "volume_based",
}

export enum ContributionType {
  EMPLOYER_PERCENTAGE = "employer_percentage",
  EMPLOYER_COST = "employer_cost",
  MEMBER_COST = "member_cost",
  FLAT_EMPLOYER_COST = "flat_employer_cost",
}

const CoverageTiers = [
  { label: "Individual", value: "individual" },
  { label: "Family", value: "family" },
  { label: "Parent + Child", value: "parent_child" },
  { label: "Parent Only", value: "parent_only" },
  { label: "Spouse Only", value: "spouse_only" },
  { label: "Child Only", value: "child_only" },
];

// Define relationship categories for volume-based editor
const RelationshipCategories = [
  { label: "Member", value: "member" },
  { label: "Spouse", value: "spouse" },
  { label: "Child", value: "child" },
];

interface PremiumInput {
  amount: string;
  coverageType?: string;
  age?: number;
}

interface WizardState {
  type?: PremiumType;
  premiums: PremiumInput[];
  contributionType?: ContributionType;
  contributionValues: Record<string, string>; // key = tier value
  thresholds: { min?: string; max?: string };
  volumeRate: string;
  volumeDenominator: string;
  maxContributingChildren: string;
  includeTobacco: boolean;
  includeRelationshipCategories: boolean;
  volumeRates: Record<string, string>;
  volumeRatesTobacco: Record<string, string>;
  ageRates: Record<number, string>;
  ageRatesTobacco: Record<number, string>;
  ageRatesSpouse: Record<number, string>;
  ageRatesChild: Record<number, string>;
}

const initialState: WizardState = {
  premiums: [],
  contributionValues: {},
  thresholds: {},
  volumeRate: "",
  volumeDenominator: "",
  maxContributingChildren: "",
  includeTobacco: false,
  includeRelationshipCategories: false,
  volumeRates: {},
  volumeRatesTobacco: {},
  ageRates: {},
  ageRatesTobacco: {},
  ageRatesSpouse: {},
  ageRatesChild: {},
};

const PremiumWizard: React.FC<{ onSave?: (state: WizardState) => void; defaultTab?: "premiums" | "contributions" }> = ({
  onSave,
  defaultTab = "premiums",
}) => {
  const [state, setState] = useState<WizardState>(initialState);

  const validatePremiums = () => {
    if (state.type === PremiumType.COMPOSITE) {
      return CoverageTiers.every((tier) =>
        state.premiums.find((p) => p.coverageType === tier.value && p.amount)
      );
    }
    // simplify other types
    return state.premiums.length > 0;
  };

  const canSave = Boolean(state.type) && validatePremiums() && Boolean(state.contributionType);

  const handleSave = () => {
    if (canSave) {
      onSave?.(state);
      console.log("Premium editor data", state);
    }
  };

  const PremiumTypeSection = (
    <div className="flex flex-col gap-4">
      <span className="text-body-bold font-body-bold">Select Premium Type</span>
      <div className="grid grid-cols-3 gap-2">
        {Object.values(PremiumType).map((t) => (
          <Button
            key={t}
            variant={state.type === t ? "brand-primary" : "neutral-secondary"}
            onClick={() => setState((s) => ({ ...s, type: t, premiums: [] }))}
          >
            {t.replace(/_/g, " ")}
          </Button>
        ))}
      </div>
    </div>
  );

  const PremiumsSection = () => {
    if (!state.type) return null;
    if (state.type === PremiumType.COMPOSITE) {
      return (
        <div className="flex flex-col gap-4">
          <span className="text-body-bold">Composite Rates</span>
          <Table>
            <Table.HeaderRow>
              <Table.HeaderCell>Coverage Tier</Table.HeaderCell>
              <Table.HeaderCell>Premium Amount ($)</Table.HeaderCell>
            </Table.HeaderRow>
            {CoverageTiers.map(({ label, value }) => {
              const existing = state.premiums.find((p) => p.coverageType === value);
              return (
                <Table.Row key={value}>
                  <Table.Cell>{label}</Table.Cell>
                  <Table.Cell>
                    <TextField className="w-[120px]">
                      <TextField.Input
                        type="number"
                        value={existing?.amount ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const amt = e.target.value;
                          setState((s) => {
                            const rest = s.premiums.filter((p) => p.coverageType !== value);
                            return {
                              ...s,
                              premiums: [...rest, { coverageType: value, amount: amt }],
                            };
                          });
                        }}
                      />
                    </TextField>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table>
        </div>
      );
    }
    if (state.type === PremiumType.AGE_BANDED) {
      return (
        <div className="flex flex-col gap-6">
          <span className="text-body-bold">Age-Banded Rates</span>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Switch checked={state.includeTobacco} onCheckedChange={checked => setState(s => ({ ...s, includeTobacco: checked }))} />
              <span className="text-body font-body text-default-font">Tobacco Usage Rates</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={state.includeRelationshipCategories} onCheckedChange={checked => setState(s => ({ ...s, includeRelationshipCategories: checked }))} />
              <span className="text-body font-body text-default-font">Separate Dependent Categories</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <Table.HeaderRow>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Rate ($)</Table.HeaderCell>
                {state.includeTobacco && <Table.HeaderCell>Tobacco Rate ($)</Table.HeaderCell>}
                {state.includeRelationshipCategories && <Table.HeaderCell>Spouse Rate ($)</Table.HeaderCell>}
                {state.includeRelationshipCategories && <Table.HeaderCell>Child Rate ($)</Table.HeaderCell>}
              </Table.HeaderRow>
              {Array.from({ length: 100 }, (_, i) => i).map((age) => (
                <Table.Row key={age}>
                  <Table.Cell>{age}</Table.Cell>
                  <Table.Cell>
                    <TextField className="w-[80px]">
                      <TextField.Input
                        type="number"
                        placeholder="$0.00"
                        value={state.ageRates[age] ?? ""}
                        onChange={e => setState(s => ({
                          ...s,
                          ageRates: { ...s.ageRates, [age]: e.target.value }
                        }))}
                      />
                    </TextField>
                  </Table.Cell>
                  {state.includeTobacco && (
                    <Table.Cell>
                      <TextField className="w-[80px]">
                        <TextField.Input
                          type="number"
                          placeholder="$0.00"
                          value={state.ageRatesTobacco[age] ?? ""}
                          onChange={e => setState(s => ({
                            ...s,
                            ageRatesTobacco: { ...s.ageRatesTobacco, [age]: e.target.value }
                          }))}
                        />
                      </TextField>
                    </Table.Cell>
                  )}
                  {state.includeRelationshipCategories && (
                    <>
                      <Table.Cell>
                        <TextField className="w-[80px]">
                          <TextField.Input
                            type="number"
                            placeholder="$0.00"
                            value={state.ageRatesSpouse[age] ?? ""}
                            onChange={e => setState(s => ({
                              ...s,
                              ageRatesSpouse: { ...s.ageRatesSpouse, [age]: e.target.value }
                            }))}
                          />
                        </TextField>
                      </Table.Cell>
                      <Table.Cell>
                        <TextField className="w-[80px]">
                          <TextField.Input
                            type="number"
                            placeholder="$0.00"
                            value={state.ageRatesChild[age] ?? ""}
                            onChange={e => setState(s => ({
                              ...s,
                              ageRatesChild: { ...s.ageRatesChild, [age]: e.target.value }
                            }))}
                          />
                        </TextField>
                      </Table.Cell>
                    </>
                  )}
                </Table.Row>
              ))}
            </Table>
          </div>
        </div>
      );
    }
    if (state.type === PremiumType.VOLUME_BASED) {
      return (
        <div className="flex flex-col gap-6">
          <span className="text-body-bold">Volume-Based Rates</span>
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="flex flex-col gap-1">
              <span className="text-caption font-caption text-default-font">Rate per Unit</span>
              <TextField>
                <TextField.Input
                  type="number"
                  placeholder="$0.00"
                  value={state.volumeRate}
                  onChange={(e) => setState(s => ({ ...s, volumeRate: e.target.value }))}
                />
              </TextField>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-caption font-caption text-default-font">Unit Denominator</span>
              <TextField>
                <TextField.Input
                  type="number"
                  placeholder="1000"
                  value={state.volumeDenominator}
                  onChange={(e) => setState(s => ({ ...s, volumeDenominator: e.target.value }))}
                />
              </TextField>
            </div>
          </div>
          <div className="flex flex-col gap-1 max-w-md">
            <span className="text-caption font-caption text-default-font">Max Contributing Children</span>
            <TextField className="w-[120px]">
              <TextField.Input
                type="number"
                placeholder="0"
                value={state.maxContributingChildren}
                onChange={(e) => setState(s => ({ ...s, maxContributingChildren: e.target.value }))}
              />
            </TextField>
          </div>
          <div className="grid grid-cols-2 gap-8 items-center max-w-md">
            <div className="flex items-center gap-2">
              <Switch checked={state.includeTobacco} onCheckedChange={checked => setState(s => ({ ...s, includeTobacco: checked }))} />
              <span className="text-body font-body text-default-font">Tobacco Usage Rates</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={state.includeRelationshipCategories} onCheckedChange={checked => setState(s => ({ ...s, includeRelationshipCategories: checked }))} />
              <span className="text-body font-body text-default-font">Separate Dependent Categories</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-body-bold">Define Volume Rates</span>
            <Table>
              <Table.HeaderRow>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Rate per {state.volumeDenominator || "Unit"}</Table.HeaderCell>
                {state.includeTobacco && <Table.HeaderCell>Rate for Tobacco</Table.HeaderCell>}
              </Table.HeaderRow>
              {(state.includeRelationshipCategories ? RelationshipCategories : [{ label: "Default", value: "default" }])
                .map(({ label, value }) => (
                <Table.Row key={value}>
                  <Table.Cell>{label}</Table.Cell>
                  <Table.Cell>
                    <TextField className="w-[120px]">
                      <TextField.Input
                        type="number"
                        placeholder="$0.00"
                        value={state.volumeRates[value] ?? ""}
                        onChange={e => setState(s => ({
                          ...s,
                          volumeRates: { ...s.volumeRates, [value]: e.target.value }
                        }))}
                      />
                    </TextField>
                  </Table.Cell>
                  {state.includeTobacco && (
                    <Table.Cell>
                      <TextField className="w-[120px]">
                        <TextField.Input
                          type="number"
                          placeholder="$0.00"
                          value={state.volumeRatesTobacco[value] ?? ""}
                          onChange={e => setState(s => ({
                            ...s,
                            volumeRatesTobacco: { ...s.volumeRatesTobacco, [value]: e.target.value }
                          }))}
                        />
                      </TextField>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table>
          </div>
        </div>
      );
    }
    return null;
  };

  const ContributionSection = (
    <div className="flex flex-col gap-4">
      <span className="text-body-bold">Contribution Strategy</span>
      <RadioCardGroup
        value={state.contributionType ?? ""}
        onValueChange={(val: string) => setState(s => ({ ...s, contributionType: val as ContributionType }))}
        className="flex flex-wrap gap-2"
      >
        {Object.entries(ContributionType).map(([key, ct]) => (
          <RadioCardGroup.RadioCard key={ct} value={ct} hideRadio={false}>
            <div className="text-body font-body text-default-font">
              {ct.replace(/_/g, " ")}
            </div>
          </RadioCardGroup.RadioCard>
        ))}
      </RadioCardGroup>
      {state.contributionType && (
        <span className="text-sm text-neutral-500">
          {state.contributionType === ContributionType.EMPLOYER_PERCENTAGE
            ? "The company contributes a percentage of the premium cost for each coverage tier."
            : state.contributionType === ContributionType.EMPLOYER_COST
            ? "The company contributes a fixed dollar amount for each coverage tier."
            : state.contributionType === ContributionType.MEMBER_COST
            ? "The employee pays a fixed amount, with the company responsible for the remainder."
            : state.contributionType === ContributionType.FLAT_EMPLOYER_COST
            ? "Applies a flat employer contribution to the total premium."
            : ""}
        </span>
      )}
      <div className="mt-4">
        <Table>
          <Table.HeaderRow>
            <Table.HeaderCell>Coverage Tier</Table.HeaderCell>
            <Table.HeaderCell>Contribution</Table.HeaderCell>
          </Table.HeaderRow>
          {CoverageTiers.map(({ label, value }) => (
            <Table.Row key={value}>
              <Table.Cell>{label}</Table.Cell>
              <Table.Cell>
                <TextField className="w-[120px]">
                  <TextField.Input
                    type="number"
                    value={state.contributionValues[value] ?? ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const amt = e.target.value;
                      setState((s) => ({ ...s, contributionValues: { ...s.contributionValues, [value]: amt } }));
                    }}
                  />
                </TextField>
              </Table.Cell>
            </Table.Row>
          ))}
          {/* Optional monthly thresholds embedded as rows */}
          <Table.Row key="monthly-min">
            <Table.Cell>Monthly Min Threshold</Table.Cell>
            <Table.Cell>
              <TextField className="w-[120px]">
                <TextField.Input
                  type="number"
                  placeholder="$0.00"
                  value={state.thresholds.min ?? ""}
                  onChange={e => setState(s => ({ ...s, thresholds: { ...s.thresholds, min: e.target.value } }))}
                />
              </TextField>
            </Table.Cell>
          </Table.Row>
          <Table.Row key="monthly-max">
            <Table.Cell>Monthly Max Threshold</Table.Cell>
            <Table.Cell>
              <TextField className="w-[120px]">
                <TextField.Input
                  type="number"
                  placeholder="$0.00"
                  value={state.thresholds.max ?? ""}
                  onChange={e => setState(s => ({ ...s, thresholds: { ...s.thresholds, max: e.target.value } }))}
                />
              </TextField>
            </Table.Cell>
          </Table.Row>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-start gap-8 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
      {/* Premium Type selection only on the Premiums tab */}
      {defaultTab === "premiums" && PremiumTypeSection}

      {/* Render only the requested panel */}
      <div className="w-full flex flex-col gap-6">
        {defaultTab === "premiums" && state.type && (
          <div>{PremiumsSection()}</div>
        )}
        {defaultTab === "contributions" && (
          <div className="flex flex-col gap-6">
            {/* Always show contributions strategy and table */}
            {ContributionSection}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex w-full justify-end pt-4 border-t border-solid border-neutral-border mt-4">
        <Button onClick={handleSave} disabled={!canSave}>
          Save Premium Setup
        </Button>
      </div>
    </div>
  );
};

export default PremiumWizard; 