"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { FeatherEdit2, FeatherGrid2X2, FeatherCheckCircle2, FeatherTrash, FeatherAlertTriangle, FeatherPlus, FeatherArrowRight, FeatherLock, FeatherCheck } from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { Tabs } from "@/ui/components/Tabs";

function PlanManagement({ onEdit }: { onEdit: () => void }) {
  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex w-full flex-col items-start gap-6 py-6">
        <span className="text-heading-2 font-heading-2 text-default-font">
          Plans
        </span>
        <div className="flex w-full flex-col items-start gap-2">
          <Tabs>
            <Tabs.Item>Overview</Tabs.Item>
            <Tabs.Item>Employees</Tabs.Item>
            <Tabs.Item active>Plans</Tabs.Item>
            <Tabs.Item>Documents</Tabs.Item>
          </Tabs>
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 relative">
          <div className="flex w-full items-center gap-4 border-b border-solid border-neutral-border pb-4">
            <span className="w-16 flex-none"></span>
            <span className="w-48 flex-none text-body-bold font-body-bold text-default-font flex items-center">
              Plan Name
            </span>
            <span className="w-32 flex-none text-body-bold font-body-bold text-default-font flex items-center">
              Group Number
            </span>
            <span className="w-32 flex-none text-body-bold font-body-bold text-default-font flex items-center">
              Carrier
            </span>
            <span className="w-32 flex-none text-body-bold font-body-bold text-default-font flex items-center">
              Line of Coverage
            </span>
            <span className="w-32 flex-none text-body-bold font-body-bold text-default-font flex items-center">
              Premium Type
            </span>
            <span className="text-body-bold font-body-bold text-default-font grow flex items-center">
              Policy Dates
            </span>
          </div>
          <div className="flex w-full flex-col items-start gap-4">
            <div className="flex w-full items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors" onClick={() => onEdit()}>
              <span className="w-16 flex-none">
                {/* logo goes here */}
              </span>
              <span className="w-48 flex-none text-body font-body text-default-font">
                Anthem Gold PPO 25/30%
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                8058
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Anthem
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Medical
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Age Banded
              </span>
              <span className="text-body font-body text-default-font grow">
                12/31/2024 - 12/30/2025
              </span>
            </div>
            <div className="flex w-full items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors" onClick={() => onEdit()}>
              <span className="w-16 flex-none">
                {/* logo goes here */}
              </span>
              <span className="w-48 flex-none text-body font-body text-default-font">
                Delta Dental
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                1121
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Delta Dental CA
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Dental
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Composite
              </span>
              <span className="text-body font-body text-default-font grow">
                12/31/2024 - 12/30/2025
              </span>
            </div>
            <div className="flex w-full items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors" onClick={() => onEdit()}>
              <span className="w-16 flex-none">
                {/* logo goes here */}
              </span>
              <span className="w-48 flex-none text-body font-body text-default-font">
                VSP / Beam Vision
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                V3695
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                VSP
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Vision
              </span>
              <span className="w-32 flex-none text-body font-body text-default-font">
                Composite
              </span>
              <span className="text-body font-body text-default-font grow">
                12/31/2024 - 12/30/2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default PlanManagement; 