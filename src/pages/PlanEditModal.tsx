"use client";

import React from "react";
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

function PlanEditModal() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background">
        <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border px-6 py-4">
          <Button
            variant="neutral-tertiary"
            icon={<FeatherArrowLeft />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Back to plans
          </Button>
          <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
            Save changes
          </Button>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 items-start gap-6 px-6">
          <div className="flex flex-col items-start gap-6 w-1/2">
            <Tabs>
              <Tabs.Item active={true} icon={<FeatherLayers />}>
                Plan Details
              </Tabs.Item>
              <Tabs.Item icon={<FeatherScale />}>Policy</Tabs.Item>
              <Tabs.Item icon={<FeatherClock />}>Eligibility</Tabs.Item>
            </Tabs>
            <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
              <div className="flex w-full flex-col items-start gap-4">
                <TextField
                  className="h-auto w-full flex-none"
                  label="Plan Name"
                  helpText=""
                >
                  <TextField.Input
                    placeholder="Enter plan name"
                    value=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </TextField>
                <TextField
                  className="h-auto w-full flex-none"
                  label="Plan Type"
                  helpText=""
                >
                  <TextField.Input
                    placeholder="Enter plan type"
                    value=""
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                  />
                </TextField>
                <div className="flex w-full flex-col items-start gap-1">
                  <span className="text-caption font-caption text-default-font">
                    Line of Coverage
                  </span>
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <Button
                        className="h-8 w-full flex-none"
                        variant="neutral-secondary"
                        iconRight={<FeatherChevronDown />}
                      >
                        Select Line of Coverage
                      </Button>
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        asChild={true}
                      >
                        <DropdownMenu>
                          <DropdownMenu.DropdownItem icon={<FeatherActivity />}>Medical</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Dental</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem icon={<FeatherEye />}>Vision</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Life</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Accidental Death and Dismemberment</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Voluntary Life</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Voluntary Critical Illness</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Short Term Disability</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Voluntary Short Term Disability</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Long Term Disability</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Hospital Indemnity</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Accident</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Cancer</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>HSA</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Healthcare FSA</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Limited Purpose FSA</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Dependent Care FSA</DropdownMenu.DropdownItem>
                        </DropdownMenu>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
                </div>
                <div className="flex w-full flex-col items-start gap-1">
                  <span className="text-caption font-caption text-default-font">
                    Premium Type
                  </span>
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <Button
                        className="h-8 w-full flex-none"
                        variant="neutral-secondary"
                        iconRight={<FeatherChevronDown />}
                      >
                        Select Premium Type
                      </Button>
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        asChild={true}
                      >
                        <DropdownMenu>
                          <DropdownMenu.DropdownItem icon={<FeatherCircleDot />}>Composite</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem icon={<FeatherFileDigit />}>Age Banded</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem icon={<FeatherBarChart />}>Volume Based</DropdownMenu.DropdownItem>
                        </DropdownMenu>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
                </div>
                <div className="flex w-full flex-col items-start gap-1">
                  <span className="text-caption font-caption text-default-font">
                    Age Calculation Method
                  </span>
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <Button
                        className="h-8 w-full flex-none"
                        variant="neutral-secondary"
                        iconRight={<FeatherChevronDown />}
                      >
                        Select Age Calculation Method
                      </Button>
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        asChild={true}
                      >
                        <DropdownMenu>
                          <DropdownMenu.DropdownItem>Coverage Start Date</DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem>Plan Start Date</DropdownMenu.DropdownItem>
                        </DropdownMenu>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
                </div>
                <div className="flex w-full gap-4">
                  <TextField
                    className="h-auto w-full flex-none"
                    label="Effective Start Date"
                    type="date"
                  >
                    <TextField.Input
                      value=""
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                    />
                  </TextField>
                  <TextField
                    className="h-auto w-full flex-none"
                    label="Effective End Date"
                    type="date"
                  >
                    <TextField.Input
                      value=""
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
                    />
                  </TextField>
                </div>
              </div>
              <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body font-body text-default-font">
                    HSA Eligible
                  </span>
                  <Switch
                    checked={false}
                    onCheckedChange={(checked: boolean) => {}}
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-body font-body text-default-font">
                    Pre-tax Deductions
                  </span>
                  <Switch
                    checked={false}
                    onCheckedChange={(checked: boolean) => {}}
                  />
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-body font-body text-default-font">
                    Required Enrollment
                  </span>
                  <Switch
                    checked={false}
                    onCheckedChange={(checked: boolean) => {}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-neutral-50 px-6 py-6 w-1/2">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Plan Document
              </span>
              <Button
                disabled={true}
                variant="neutral-secondary"
                icon={<FeatherDownload />}
              >
                Download
              </Button>
            </div>
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-neutral-border bg-default-background">
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
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default PlanEditModal;