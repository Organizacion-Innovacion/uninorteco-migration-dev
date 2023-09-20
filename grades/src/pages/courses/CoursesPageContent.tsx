import React from "react";
import { TabLayout } from "../../components/TabLayout";
import { TabContent, useTabLayout } from "../../components/TabLayout/useTabLayout";
import { getSemesterName } from "../../core/common/utils";
import { CoursesSection } from "./CoursesSection";

export interface CoursesPageContentProps {
  periods: string[];
}

export function periodsToTabContent(periods: string[]): TabContent[] {
  return periods.map((period) => ({
    tabId: period,
    label: getSemesterName(period),
  }));
}
export function CoursesPageContent({ periods }: CoursesPageContentProps) {
  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout({
    tabs: periodsToTabContent(periods),
  });

  return (
    <TabLayout
      index={tabLayoutValue.index}
      tabs={tabLabels}
      onIndexChange={onIndexChange}
    >
      <CoursesSection period={tabLayoutValue.tabId} />
    </TabLayout>
  );
}
