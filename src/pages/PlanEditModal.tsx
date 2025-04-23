"use client";

import React, { useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { FeatherArrowLeft } from "@subframe/core";
import { Tabs } from "@/ui/components/Tabs";
import { FeatherLayers } from "@subframe/core";
import { FeatherScale } from "@subframe/core";
import { FeatherClock } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherActivity } from "@subframe/core";
import { FeatherEye } from "@subframe/core";
import { FeatherPlusCircle } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { FeatherChevronDown } from "@subframe/core";
import { FeatherShield } from "@subframe/core";
import { FeatherGlobe } from "@subframe/core";
import { FeatherHome } from "@subframe/core";
import { FeatherFileDigit } from "@subframe/core";
import { FeatherCircleDot } from "@subframe/core";
import { FeatherBarChart } from "@subframe/core";
import { FeatherHelpCircle } from "@subframe/core";
import { Switch } from "@/ui/components/Switch";
import { FeatherDownload } from "@subframe/core";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { FeatherFileText } from "@subframe/core";
import { FeatherUpload } from "@subframe/core";
import { FeatherCalendar } from "@subframe/core";
import { Calendar } from "@/ui/components/Calendar";
import { FeatherX } from "@subframe/core";
import { FeatherCheck } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { Alert } from "@/ui/components/Alert";
import { FeatherAlertTriangle } from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { FeatherArrowRight } from "@subframe/core";
import { FeatherPercent } from "@subframe/core";
import { FeatherUsers } from "@subframe/core";
import { FeatherDollarSign } from "@subframe/core";
import { Drawer } from "@/ui/components/Drawer";
import { Table } from "@/ui/components/Table";
import PremiumWizard from "@/ui/components/PremiumWizard";
import { FeatherLock } from "@subframe/core";
import { Accordion } from "@/ui/components/Accordion";

// Define the Line of Coverage enum
enum LineOfCoverage {
  MEDICAL = "medical",
  DENTAL = "dental",
  VISION = "vision",
  LIFE = "life",
  ACCIDENTAL_DEATH = "accidental_death",
  VOLUNTARY_LIFE = "voluntary_life",
  VOLUNTARY_CRITICAL_ILLNESS = "voluntary_critical_illness",
  STD = "std",
  VOLUNTARY_STD = "voluntary_std",
  LTD = "ltd",
  HOSPITAL_INDEMNITY = "hospital_indemnity",
  ACCIDENT = "accident",
  CANCER = "cancer",
  HSA = "hsa",
  HEALTHCARE_FSA = "healthcare_fsa",
  LIMITED_PURPOSE_FSA = "limited_purpose_fsa",
  DEPENDENT_CARE_FSA = "dependent_care_fsa"
}

// Define the Premium Type enum
enum PremiumType {
  COMPOSITE = "composite",
  AGE_BANDED = "age_banded",
  VOLUME_BASED = "volume_based"
}

// Define the Plan Type enum
enum PlanType {
  PPO = "ppo",
  HMO = "hmo",
  DPPO = "dppo",
  DHMO = "dhmo",
  VSP = "vsp",
  LIFE = "life",
  ACCIDENTAL_DEATH = "accidental_death",
  POS = "pos"
}

// Define the Rehire Policy enum
enum RehirePolicy {
  IMMEDIATE = "immediate",
  WAITING_PERIOD = "waiting_period",
  NEXT_OPEN_ENROLLMENT = "next_open_enrollment"
}

// Define the Age Calculation Method enum
enum AgeCalculationMethod {
  COVERAGE_START_DATE = "coverage_start_date",
  PLAN_START_DATE = "plan_start_date"
}

// Add these enums after the existing ones
enum TerminationPolicy {
  TERMINATION_DATE = "termination_date",
  END_OF_MONTH = "end_of_month",
  FIFTEENTH_OF_MONTH = "fifteenth_of_month"
}

enum Subclass {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  CONTRACTOR = "contractor",
  INTERN = "intern"
}

enum PeriodType {
  DAYS = "days",
  WEEKS = "weeks",
  MONTHS = "months"
}

// Add new enums for Premium and Contribution attributes
enum CoverageType {
  INDIVIDUAL = "individual",
  FAMILY = "family",
  PARENT_CHILD = "parent_child",
  PARENT_ONLY = "parent_only",
  SPOUSE_ONLY = "spouse_only",
  CHILD_ONLY = "child_only"
}

enum RelationshipCategory {
  EMPLOYEE = "employee",
  SPOUSE = "spouse",
  CHILD = "child",
  DOMESTIC_PARTNER = "domestic_partner"
}

enum ContributionType {
  MEMBER_COST = "member_cost",
  EMPLOYER_COST = "employer_cost",
  EMPLOYER_PERCENTAGE = "employer_percentage",
  FLAT_EMPLOYER_COST = "flat_employer_cost"
}

// Indicator for field guardrail status
const FieldIndicator = ({ type }: { type: 'lock' | 'warn' | 'ok' }) => {
  let icon;
  let color;
  switch (type) {
    case 'lock': icon = <FeatherLock />; color = 'text-neutral-400'; break;
    case 'warn': icon = <FeatherAlertTriangle />; color = 'text-warning-600'; break;
    default: icon = <FeatherCheck />; color = 'text-success-600'; break;
  }
  return (
    <span className={"ml-1 inline-block " + color}>
      {icon}
    </span>
  );
};

function PlanEditModal({ onBack }: { onBack?: () => void }) {
  // State for form inputs
  const [planName, setPlanName] = useState("");
  const [groupNumber, setGroupNumber] = useState("");
  const [lineOfCoverage, setLineOfCoverage] = useState<LineOfCoverage | null>(null);
  const [carrier, setCarrier] = useState("");
  const [premiumType, setPremiumType] = useState<PremiumType | null>(null);
  const [planType, setPlanType] = useState<PlanType | null>(null);
  const [effectiveStart, setEffectiveStart] = useState<Date | undefined>(undefined);
  const [effectiveEnd, setEffectiveEnd] = useState<Date | undefined>(undefined);
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [rehirePolicy, setRehirePolicy] = useState<RehirePolicy | null>(null);

  // Add state for the attribute switches
  const [activeTab, setActiveTab] = useState("details"); // Track active tab
  const [requiresPcp, setRequiresPcp] = useState(false); // requires_primary_care_provider
  const [cobraEligible, setCobraEligible] = useState(false); // cobra_eligible
  const [requiredEnrollment, setRequiredEnrollment] = useState(false); // required_enrollment
  const [isLowCost, setIsLowCost] = useState<boolean | null>(null); // is_low_cost
  const [providesMinimumValue, setProvidesMinimumValue] = useState<boolean | null>(null); // provides_minimum_value
  const [providesEssentialCoverage, setProvidesEssentialCoverage] = useState<boolean | null>(null); // provides_essential_coverage
  const [dependentCoverageExcluded, setDependentCoverageExcluded] = useState<boolean | null>(null); // dependent_coverage_excluded
  const [spouseCoverageExcluded, setSpouseCoverageExcluded] = useState<boolean | null>(null); // spouse_coverage_excluded
  const [isPreTax, setIsPreTax] = useState(true); // is_pre_tax
  const [partnerDependentsEligible, setPartnerDependentsEligible] = useState(true); // partner_dependents_eligible
  const [childDependentsEligible, setChildDependentsEligible] = useState(true); // child_dependents_eligible
  const [baseSpouseAgeOffMember, setBaseSpouseAgeOffMember] = useState(false); // base_spouse_age_off_member
  const [hsaEligible, setHsaEligible] = useState(false); // hsa_eligible

  // Add these state variables after the existing ones
  const [requiredRegions, setRequiredRegions] = useState<string[]>([]);
  const [minimumHoursWorked, setMinimumHoursWorked] = useState<string>("");
  const [maxContributingChildren, setMaxContributingChildren] = useState<string>("");
  const [terminationPolicy, setTerminationPolicy] = useState<TerminationPolicy | null>(null);
  const [requiredSubclass, setRequiredSubclass] = useState<Subclass | null>(null);
  const [waitingPeriodDuration, setWaitingPeriodDuration] = useState<string>("");
  const [waitingPeriodType, setWaitingPeriodType] = useState<PeriodType | null>(null);

  // Add state for Premium attributes
  const [premiumAmount, setPremiumAmount] = useState<string>("");
  const [tobaccoUsage, setTobaccoUsage] = useState<boolean>(false);
  const [premiumCoverageType, setPremiumCoverageType] = useState<CoverageType | null>(null);
  const [premiumRelationshipCategory, setPremiumRelationshipCategory] = useState<RelationshipCategory | null>(null);
  const [premiumAge, setPremiumAge] = useState<string>("");

  // Add state for Contribution attributes
  const [contributionType, setContributionType] = useState<ContributionType | null>(null);
  const [contributionAmount, setContributionAmount] = useState<string>("");
  const [contributionCoverageType, setContributionCoverageType] = useState<CoverageType | null>(null);
  const [monthlyMinThreshold, setMonthlyMinThreshold] = useState<string>("");
  const [monthlyMaxThreshold, setMonthlyMaxThreshold] = useState<string>("");
  
  // Add state for premium drawer and inline contribution editing
  const [isPremiumDrawerOpen, setIsPremiumDrawerOpen] = useState<boolean>(false);
  const [isContributionDrawerOpen, setIsContributionDrawerOpen] = useState<boolean>(false);
  const [isEditingContrib, setIsEditingContrib] = useState<boolean>(false);
  
  // Define coverage tiers constant
  const CoverageTiers = [
    { label: "Individual", value: "individual" },
    { label: "Family", value: "family" },
    { label: "Parent + Child", value: "parent_child" },
    { label: "Parent Only", value: "parent_only" },
    { label: "Spouse Only", value: "spouse_only" },
    { label: "Child Only", value: "child_only" }
  ];

  // Add this constant after the existing ones
  const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  // Replace tooltip helper with subtext label
  const AttributeLabel = ({ label, description }: { label: string; description: string }) => (
    <div className="flex flex-col">
      <span className="text-body font-body text-default-font">{label}</span>
      <span className="text-xs text-subtext-color">{description}</span>
    </div>
  );

  // Add state for showing summary
  const [showSummary, setShowSummary] = useState(false);

  // Add new state for details editing
  const [isDetailsEditing, setIsDetailsEditing] = useState(false);

  // Handle save changes
  const handleSaveChanges = () => {
    // Here you would implement the logic to save the changes
    console.log({
      planName,
      groupNumber,
      lineOfCoverage,
      carrier,
      premiumType,
      planType,
      effectiveStart,
      effectiveEnd,
      // Add attributes to save
      requiresPcp,
      cobraEligible,
      requiredEnrollment,
      isLowCost,
      providesMinimumValue,
      providesEssentialCoverage,
      dependentCoverageExcluded,
      spouseCoverageExcluded,
      isPreTax,
      partnerDependentsEligible,
      childDependentsEligible,
      baseSpouseAgeOffMember,
      hsaEligible,
      requiredRegions,
      minimumHoursWorked,
      maxContributingChildren,
      terminationPolicy,
      requiredSubclass,
      waitingPeriodDuration,
      waitingPeriodType,
      // Add premium and contribution attributes
      premiumAmount,
      tobaccoUsage,
      premiumCoverageType,
      premiumRelationshipCategory,
      premiumAge,
      contributionType,
      contributionAmount,
      contributionCoverageType,
      monthlyMinThreshold,
      monthlyMaxThreshold
    });
  };

  // Handle back button (calls onBack prop in App state)
  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  // Handle next button
  const handleNext = () => {
    setShowSummary(true);
  };

  // Handle back from summary
  const handleBackFromSummary = () => {
    setShowSummary(false);
  };

  // Get display name for Line of Coverage
  const getLineOfCoverageDisplayName = (value: LineOfCoverage): string => {
    switch (value) {
      case LineOfCoverage.MEDICAL: return "Medical";
      case LineOfCoverage.DENTAL: return "Dental";
      case LineOfCoverage.VISION: return "Vision";
      case LineOfCoverage.LIFE: return "Life";
      case LineOfCoverage.ACCIDENTAL_DEATH: return "Accidental Death and Dismemberment";
      case LineOfCoverage.VOLUNTARY_LIFE: return "Voluntary Life";
      case LineOfCoverage.VOLUNTARY_CRITICAL_ILLNESS: return "Voluntary Critical Illness";
      case LineOfCoverage.STD: return "Short Term Disability";
      case LineOfCoverage.VOLUNTARY_STD: return "Voluntary Short Term Disability";
      case LineOfCoverage.LTD: return "Long Term Disability";
      case LineOfCoverage.HOSPITAL_INDEMNITY: return "Hospital Indemnity";
      case LineOfCoverage.ACCIDENT: return "Accident";
      case LineOfCoverage.CANCER: return "Cancer";
      case LineOfCoverage.HSA: return "HSA";
      case LineOfCoverage.HEALTHCARE_FSA: return "Healthcare FSA";
      case LineOfCoverage.LIMITED_PURPOSE_FSA: return "Limited Purpose FSA";
      case LineOfCoverage.DEPENDENT_CARE_FSA: return "Dependent Care FSA";
      default: return value;
    }
};
// Display name for Premium Type
const getPremiumTypeDisplayName = (value: PremiumType): string => {
  switch (value) {
    case PremiumType.COMPOSITE: return "Composite";
    case PremiumType.AGE_BANDED: return "Age Banded";
    case PremiumType.VOLUME_BASED: return "Volume Based";
    default: return value;
  }
};

// Display name for Plan Type
const getPlanTypeDisplayName = (value: PlanType): string => {
  switch (value) {
    case PlanType.PPO: return "Preferred Provider Organization";
    case PlanType.HMO: return "Health Maintenance Organization";
    case PlanType.DPPO: return "Dental Preferred Provider Organization";
    case PlanType.DHMO: return "Dental Health Maintenance Organization";
    case PlanType.VSP: return "Vision Service Plan";
    case PlanType.LIFE: return "Life Insurance";
    case PlanType.ACCIDENTAL_DEATH: return "Accidental Death & Dismemberment";
    case PlanType.POS: return "Point of Service";
    default: return value;
  }
};

// Display name for Rehire Policy
const getRehirePolicyDisplayName = (value: RehirePolicy): string => {
  switch (value) {
    case RehirePolicy.IMMEDIATE: return "Immediate";
    case RehirePolicy.WAITING_PERIOD: return "Waiting Period";
    case RehirePolicy.NEXT_OPEN_ENROLLMENT: return "Next Open Enrollment";
    default: return value;
  }
};

// Display name for Termination Policy
const getTerminationPolicyDisplayName = (value: TerminationPolicy): string => {
  switch (value) {
    case TerminationPolicy.TERMINATION_DATE: return "Termination Date";
    case TerminationPolicy.END_OF_MONTH: return "End of Month";
    case TerminationPolicy.FIFTEENTH_OF_MONTH: return "Fifteenth of Month";
    default: return value;
  }
};

// Display name for Period Type (Waiting Period)
const getPeriodTypeDisplayName = (value: PeriodType): string => {
  switch (value) {
    case PeriodType.DAYS: return "Days";
    case PeriodType.WEEKS: return "Weeks";
    case PeriodType.MONTHS: return "Months";
    default: return value;
  }
};

  // Handle date selection
  const handleStartDateSelect = (
    selected: Date | undefined,
    _triggerDate: Date,
    _modifiers: any,
    _e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    setEffectiveStart(selected);
    setIsStartDatePickerOpen(false);
  };

  const handleEndDateSelect = (
    selected: Date | undefined,
    _triggerDate: Date,
    _modifiers: any,
    _e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => {
    setEffectiveEnd(selected);
    setIsEndDatePickerOpen(false);
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
          <Button
            variant="neutral-tertiary"
            icon={<FeatherArrowLeft />}
            onClick={showSummary ? handleBackFromSummary : handleBack}
          >
            {showSummary ? "Back to edit" : "Back to plans"}
          </Button>
          <Button onClick={showSummary ? handleSaveChanges : handleNext}>
            {showSummary ? "Save changes" : "Next"}
          </Button>
        </div>
        {!showSummary ? (
          <div className="flex w-full grow shrink-0 basis-0 items-start gap-6 px-6 pb-12 h-[calc(100vh-80px)] overflow-hidden">
            <div className={`flex flex-col items-start gap-6 ${activeTab === "details" ? "w-1/2" : "w-full"} h-full`}>
            <Tabs>
                <Tabs.Item 
                  active={activeTab === "details"} 
                  icon={<FeatherLayers />}
                  onClick={() => setActiveTab("details")}
                >
                Plan Details
              </Tabs.Item>
                <Tabs.Item 
                  active={activeTab === "attributes"} 
                  icon={<FeatherScale />}
                  onClick={() => setActiveTab("attributes")}
                >
                  Attributes
                </Tabs.Item>
                <Tabs.Item 
                  active={activeTab === "premiums"} 
                  icon={<FeatherDollarSign />}
                  onClick={() => setActiveTab("premiums")}
                >
                  Premiums
                </Tabs.Item>
                <Tabs.Item 
                  active={activeTab === "contributions"} 
                  icon={<FeatherPercent />}
                  onClick={() => setActiveTab("contributions")}
                >
                  Contributions
                </Tabs.Item>
            </Tabs>
              
              {/* Plan Details Tab */}
              {activeTab === "details" && (
                <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm overflow-y-auto h-[calc(100%-48px)]">
                  <div className="flex w-full justify-end mb-4">
                    <Button variant="neutral-secondary" size="small" onClick={() => setIsDetailsEditing(prev => !prev)}>
                      {isDetailsEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                  {isDetailsEditing && (
                    <div className="w-full p-2 bg-green-100 text-green-800 text-center font-body-bold">
                      Edit mode is active
                    </div>
                  )}
                  {isDetailsEditing ? (
                    <div className="flex w-full flex-col items-start gap-4">
                      {/* Static Plan Overview */}
                      <div className="w-full">
                        <h3 className="text-heading-4 font-heading-4 text-default-font mb-4">Plan Overview</h3>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Plan Name</span>
                            <span className="text-body font-body text-default-font">{planName || "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Group Number</span>
                            <span className="text-body font-body text-default-font">{groupNumber || "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Carrier</span>
                            <span className="text-body font-body text-default-font">{carrier || "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Line of Coverage</span>
                            <span className="text-body font-body text-default-font">{lineOfCoverage ? getLineOfCoverageDisplayName(lineOfCoverage) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Plan Type</span>
                            <span className="text-body font-body text-default-font">{planType ? getPlanTypeDisplayName(planType) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Premium Type</span>
                            <span className="text-body font-body text-default-font">{premiumType ? getPremiumTypeDisplayName(premiumType) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Effective Start</span>
                            <span className="text-body font-body text-default-font">{effectiveStart ? effectiveStart.toLocaleDateString() : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Effective End</span>
                            <span className="text-body font-body text-default-font">{effectiveEnd ? effectiveEnd.toLocaleDateString() : "-"}</span>
                          </div>
                        </div>
                      </div>
                      {/* Static Participation Details */}
                      <div className="w-full">
                        <h3 className="text-heading-4 font-heading-4 text-default-font mb-4">Participation Details</h3>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Waiting Period Type</span>
                            <span className="text-body font-body text-default-font">{waitingPeriodType ? getPeriodTypeDisplayName(waitingPeriodType) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Waiting Period Duration</span>
                            <span className="text-body font-body text-default-font">{waitingPeriodDuration || "-"}</span>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <span className="text-caption-bold font-caption-bold text-default-font">Termination Policy</span>
                            <span className="text-body font-body text-default-font">{terminationPolicy ? getTerminationPolicyDisplayName(terminationPolicy) : "-"}</span>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <span className="text-caption-bold font-caption-bold text-default-font">Rehire Policy</span>
                            <span className="text-body font-body text-default-font">{rehirePolicy ? getRehirePolicyDisplayName(rehirePolicy) : "-"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full flex-col items-start gap-4">
                      {/* Static Plan Overview */}
                      <div className="w-full">
                        <h3 className="text-heading-4 font-heading-4 text-default-font mb-4">Plan Overview</h3>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Plan Name</span>
                            <span className="text-body font-body text-default-font">{planName || "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Group Number</span>
                            <span className="text-body font-body text-default-font">{groupNumber || "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Carrier</span>
                            <span className="text-body font-body text-default-font">{carrier || "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Line of Coverage</span>
                            <span className="text-body font-body text-default-font">{lineOfCoverage ? getLineOfCoverageDisplayName(lineOfCoverage) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Plan Type</span>
                            <span className="text-body font-body text-default-font">{planType ? getPlanTypeDisplayName(planType) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Premium Type</span>
                            <span className="text-body font-body text-default-font">{premiumType ? getPremiumTypeDisplayName(premiumType) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Effective Start</span>
                            <span className="text-body font-body text-default-font">{effectiveStart ? effectiveStart.toLocaleDateString() : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Effective End</span>
                            <span className="text-body font-body text-default-font">{effectiveEnd ? effectiveEnd.toLocaleDateString() : "-"}</span>
                          </div>
                        </div>
                      </div>
                      {/* Static Participation Details */}
                      <div className="w-full">
                        <h3 className="text-heading-4 font-heading-4 text-default-font mb-4">Participation Details</h3>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Waiting Period Type</span>
                            <span className="text-body font-body text-default-font">{waitingPeriodType ? getPeriodTypeDisplayName(waitingPeriodType) : "-"}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-caption-bold font-caption-bold text-default-font">Waiting Period Duration</span>
                            <span className="text-body font-body text-default-font">{waitingPeriodDuration || "-"}</span>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <span className="text-caption-bold font-caption-bold text-default-font">Termination Policy</span>
                            <span className="text-body font-body text-default-font">{terminationPolicy ? getTerminationPolicyDisplayName(terminationPolicy) : "-"}</span>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <span className="text-caption-bold font-caption-bold text-default-font">Rehire Policy</span>
                            <span className="text-body font-body text-default-font">{rehirePolicy ? getRehirePolicyDisplayName(rehirePolicy) : "-"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Attributes Tab */}
              {activeTab === "attributes" && (
                <div className="flex w-full flex-col items-start rounded-md border border-solid border-neutral-border bg-default-background px-8 py-8 shadow-sm overflow-y-auto h-[calc(100%-48px)]">
                  <div className="w-full mb-12">
                    {/* Enrollment Details Section */}
                    <div className="flex w-full flex-col items-start">
                      <h3 className="text-heading-4 font-heading-4 text-default-font mb-6">Enrollment Details</h3>
                      <div className="grid grid-cols-2 gap-8 w-full">
                        {/* Left Column */}
                        <div className="flex flex-col gap-8">
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font flex items-center">Is Pre-Tax<FieldIndicator type='warn'/></span>
                              <span className="text-sm text-neutral-500">Controls whether premiums are deducted before taxes</span>
                            </div>
                            <Switch
                              checked={isPreTax}
                              onCheckedChange={setIsPreTax}
                              defaultChecked={true}
                            />
                          </div>
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font flex items-center">Partner Dependents Eligible<FieldIndicator type='ok'/></span>
                              <span className="text-sm text-neutral-500">Currently only works with supplemental plans</span>
                            </div>
                            <Switch
                              checked={partnerDependentsEligible}
                              onCheckedChange={setPartnerDependentsEligible}
                              defaultChecked={true}
                            />
                          </div>
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font flex items-center">Child Dependents Eligible<FieldIndicator type='ok'/></span>
                              <span className="text-sm text-neutral-500">Currently only works with supplemental plans</span>
                            </div>
                            <Switch
                              checked={childDependentsEligible}
                              onCheckedChange={setChildDependentsEligible}
                              defaultChecked={true}
                            />
                          </div>
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font flex items-center">Required Enrollment<FieldIndicator type='warn'/></span>
                              <span className="text-sm text-neutral-500">Controls whether the plan is automatically enrolled for members</span>
                            </div>
                            <Switch
                              checked={requiredEnrollment}
                              onCheckedChange={setRequiredEnrollment}
                              defaultChecked={false}
                            />
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-8">
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font flex items-center">COBRA Eligible<FieldIndicator type='ok'/></span>
                              <span className="text-sm text-neutral-500">Determines if the plan is eligible for COBRA continuation</span>
                            </div>
                            <Switch
                              checked={cobraEligible}
                              onCheckedChange={setCobraEligible}
                              defaultChecked={false}
                            />
                          </div>
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font flex items-center">HSA Eligible<FieldIndicator type='warn'/></span>
                              <span className="text-sm text-neutral-500">Determines if the plan can be paired with a Health Savings Account</span>
                            </div>
                            <Switch
                              checked={hsaEligible}
                              onCheckedChange={setHsaEligible}
                              defaultChecked={false}
                            />
                          </div>
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font flex items-center">Requires Primary Care Provider<FieldIndicator type='ok'/></span>
                              <span className="text-sm text-neutral-500">Determines if members must select a primary care provider</span>
                            </div>
                            <Switch
                              checked={requiresPcp}
                              onCheckedChange={setRequiresPcp}
                              defaultChecked={false}
                            />
                          </div>
                          <div className="flex w-full items-start justify-between">
                            <div className="flex flex-col">
                              <span className="text-body-bold font-body-bold text-default-font">Max Contributing Children</span>
                              <span className="text-sm text-neutral-500">Maximum number of children that can be covered (optional)</span>
                            </div>
                            <TextField className="w-[120px]">
                              <TextField.Input
                                type="number"
                                placeholder="Enter maximum number"
                                value={maxContributingChildren}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                  const value = event.target.value;
                                  if (value === '' || parseInt(value) >= 0) {
                                    setMaxContributingChildren(value);
                                  }
                                }}
                              />
                            </TextField>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility Criteria Section */}
                  <div className="w-full">
                    <h3 className="text-heading-4 font-heading-4 text-default-font mb-6">Eligibility Criteria</h3>
                    <div className="grid grid-cols-2 gap-8 w-full">
                      {/* Required Regions */}
                      <div className="flex w-full flex-col items-start gap-1">
                        <span className="text-body-bold font-body-bold text-default-font mb-2 flex items-center">
                          Required Regions<FieldIndicator type='warn'/>
                        </span>
                        <SubframeCore.DropdownMenu.Root>
                          <SubframeCore.DropdownMenu.Trigger asChild={true}>
                            <Button
                              className="h-10 w-full flex-none text-left justify-between"
                              variant="neutral-secondary"
                              iconRight={<FeatherChevronDown />}
                            >
                              {requiredRegions.length > 0 
                                ? `${requiredRegions.length} states selected`
                                : "Select states"}
                            </Button>
                          </SubframeCore.DropdownMenu.Trigger>
                          <SubframeCore.DropdownMenu.Portal>
                            <SubframeCore.DropdownMenu.Content
                              side="bottom"
                              align="start"
                              sideOffset={4}
                              asChild={true}
                              className="w-full min-w-[200px]"
                            >
                              <div className="flex w-full flex-col gap-2 p-2 bg-white rounded-md border border-solid border-neutral-200 shadow-sm">
                                <TextField className="w-full">
                                  <TextField.Input
                                    placeholder="Search states..."
                                    onChange={(e) => {
                                      const searchTerm = e.target.value.toLowerCase();
                                      const filteredStates = US_STATES.filter(state => 
                                        state.toLowerCase().includes(searchTerm)
                                      );
                                      // You might want to store filtered states in state if needed
                                    }}
                                  />
                                </TextField>
                                <div className="flex max-h-[200px] w-full flex-col gap-1 overflow-y-auto">
                                  {US_STATES.map((state) => (
                                    <div
                                      key={state}
                                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-50"
                                      onClick={() => {
                                        setRequiredRegions(prev =>
                                          prev.includes(state)
                                            ? prev.filter(s => s !== state)
                                            : [...prev, state]
                                        );
                                      }}
                                    >
                                      <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                                        requiredRegions.includes(state)
                                          ? "border-brand-600 bg-brand-600"
                                          : "border-neutral-200"
                                      }`}>
                                        {requiredRegions.includes(state) && (
                                          <FeatherCheck className="h-3 w-3 text-white" />
                                        )}
                                      </div>
                                      <span className="text-sm">{state}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                        {requiredRegions.length > 0 && (
                          <div className="flex w-full flex-wrap gap-2 mt-2">
                            {requiredRegions.map((state) => (
                              <div
                                key={state}
                                className="flex items-center gap-1 rounded-md border border-solid border-brand-600 bg-brand-50 px-2 py-1"
                              >
                                <span className="text-sm">{state}</span>
                                <FeatherX
                                  className="h-3 w-3 cursor-pointer"
                                  onClick={() => {
                                    setRequiredRegions(prev => prev.filter(s => s !== state));
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Required Subclass */}
                      <div className="flex w-full flex-col items-start gap-1">
                        <span className="text-body-bold font-body-bold text-default-font mb-2 flex items-center">
                          Required Subclass<FieldIndicator type='warn'/>
                        </span>
                        <SubframeCore.DropdownMenu.Root>
                          <SubframeCore.DropdownMenu.Trigger asChild={true}>
                            <Button
                              className="h-10 w-full flex-none text-left justify-between"
                              variant="neutral-secondary"
                              iconRight={<FeatherChevronDown />}
                            >
                              {requiredSubclass ? requiredSubclass.replace(/_/g, " ") : "Select Required Subclass"}
                            </Button>
                          </SubframeCore.DropdownMenu.Trigger>
                          <SubframeCore.DropdownMenu.Portal>
                            <SubframeCore.DropdownMenu.Content
                              side="bottom"
                              align="start"
                              sideOffset={4}
                              asChild={true}
                              className="w-full min-w-[200px]"
                            >
                              <div className="flex w-full flex-col gap-2 p-2 bg-white rounded-md border border-solid border-neutral-200 shadow-sm">
                                <div className="flex max-h-[200px] w-full flex-col gap-1 overflow-y-auto">
                                  {Object.values(Subclass).map((value) => (
                                    <div
                                      key={value}
                                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-50"
                                      onClick={() => setRequiredSubclass(value)}
                                    >
                                      <div className={`flex h-4 w-4 items-center justify-center rounded border ${
                                        requiredSubclass === value
                                          ? "border-brand-600 bg-brand-600"
                                          : "border-neutral-200"
                                      }`}>
                                        {requiredSubclass === value && (
                                          <FeatherCheck className="h-3 w-3 text-white" />
                                        )}
                                      </div>
                                      <span className="text-sm">{value.replace(/_/g, " ")}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                      </div>

                      {/* Minimum Hours Worked */}
                      <TextField
                        className="h-auto w-full flex-none"
                        label={<span className="flex items-center text-body-bold font-body-bold text-default-font">Minimum Hours Worked<FieldIndicator type='warn'/></span>}
                        helpText="Minimum number of hours required per week"
                      >
                        <TextField.Input
                          type="number"
                          placeholder="Enter minimum hours"
                          value={minimumHoursWorked}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMinimumHoursWorked(event.target.value)}
                        />
                      </TextField>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Premiums and Contributions Tab */}
              {activeTab === "premiums" && (
                <div className="w-full h-[calc(100%-48px)] overflow-y-auto">
                  <PremiumWizard defaultTab="premiums" />
                </div>
              )}
              {activeTab === "contributions" && (
                <div className="w-full h-[calc(100%-48px)] overflow-y-auto">
                  <PremiumWizard defaultTab="contributions" />
                </div>
              )}
            </div>
            
            {/* Right side Panel with fixed height - Only shown on Details tab */}
            {activeTab === "details" && (
              <div className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6 w-1/2 h-full">
                <div className="flex w-full items-center justify-between">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Plan Document
                  </span>
                  <Button
                    disabled={true}
                    variant="neutral-secondary"
                    icon={<FeatherDownload />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Download
                  </Button>
                </div>
                <div className="flex w-full grow flex-col items-center justify-center gap-2 rounded-md border border-dashed border-neutral-border bg-default-background">
                  <IconWithBackground
                    variant="neutral"
                    size="large"
                    icon={<FeatherFileText />}
                  />
                  <span className="text-body-bold font-body-bold text-default-font">
                    Drop your plan document here
                  </span>
                  <span className="text-body font-body text-subtext-color">
                    or click to upload
                  </span>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    icon={<FeatherUpload />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Upload PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="container max-w-none flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 bg-default-background py-6 pb-12">
            <Alert
              variant="warning"
              icon={<FeatherAlertTriangle />}
              title="Premium Recalculation Required"
              description="Confirming these changes will automatically trigger a premium recalculation for all members enrolled in this plan."
              actions={
                <IconButton
                  size="medium"
                  icon={<FeatherX />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              }
            />
            <Alert
              variant="error"
              icon={<FeatherAlertTriangle />}
              title="Coverage Removal Warning"
              description="These changes will remove coverage from certain members. Please ensure this is an intended change before proceeding."
            />
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6">
              <div className="flex w-full items-center justify-between">
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Changes Summary
                </span>
                <Badge variant="neutral" icon={<FeatherClock />}>
                  Modified 2 mins ago
                </Badge>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
                {/* Group Number Summary */}
                <div className="flex w-full items-center gap-4">
                  <IconWithBackground variant="warning" icon={<FeatherFileDigit />} />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">Group Number</span>
                    <div className="flex w-full items-center gap-2">
                      <span className="text-body font-body text-subtext-color">Previous 8058</span>
                      <FeatherArrowRight className="text-body font-body text-neutral-400" />
                      <span className="text-body-bold font-body-bold text-default-font">{groupNumber || "Updated Group Number"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4">
                  <IconWithBackground variant="warning" icon={<FeatherShield />} />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">Carrier</span>
                    <div className="flex w-full items-center gap-2">
                      <span className="text-body font-body text-subtext-color">Anthem</span>
                      <FeatherArrowRight className="text-body font-body text-neutral-400" />
                      <span className="text-body-bold font-body-bold text-default-font">UnitedHealthcare</span>
                    </div>
                  </div>
                </div>
                {/* Plan Type Summary */}
                <div className="flex w-full items-center gap-4">
                  <IconWithBackground variant="warning" icon={<FeatherLayers />} />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">Plan Type</span>
                    <div className="flex w-full items-center gap-2">
                      <span className="text-body font-body text-subtext-color">{planType ? getPlanTypeDisplayName(planType) : "Preferred Provider Organization"}</span>
                      <FeatherArrowRight className="text-body font-body text-neutral-400" />
                      <span className="text-body-bold font-body-bold text-default-font">{planType ? getPlanTypeDisplayName(planType) : "Preferred Provider Organization"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4">
                  <IconWithBackground variant="warning" icon={<FeatherCalendar />} />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-body-bold font-body-bold text-default-font">Effective Dates</span>
                    <div className="flex w-full items-center gap-2">
                      <span className="text-body font-body text-subtext-color">Jan 1, 2024 - Dec 31, 2024</span>
                      <FeatherArrowRight className="text-body font-body text-neutral-400" />
                      <span className="text-body-bold font-body-bold text-default-font">Apr 1, 2024 - Mar 31, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6">
              <div className="flex w-full items-center gap-4">
                <IconWithBackground variant="error" icon={<FeatherAlertTriangle />} size="small" />
                <div className="flex grow flex-col items-start">
                  <span className="text-body-bold font-body-bold text-error-800">Affected Members</span>
                  <span className="text-body font-body text-error-700">3 members will lose coverage</span>
                </div>
              </div>
              <ul className="list-disc list-inside text-body font-body text-default-font ml-6">
                <li>John Doe</li>
                <li>Jane Smith</li>
                <li>Bob Johnson</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DefaultPageLayout>
  );
}

export default PlanEditModal;
