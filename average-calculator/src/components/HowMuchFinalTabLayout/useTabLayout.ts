import { useState } from "react";

export interface TabLayoutValue {
  index: number;
  tabId: string;
}

export interface TabContent {
  label: string;
  tabId: string;
}

export const defaultTabs: TabContent[] = [
  {
    label: "Mi nota final es",
    tabId: "finalGrade",
  },
  {
    label: "Cuanto necesito",
    tabId: "howMuch",
  },
];

export interface UseTabLayoutHook {
  tabs?: TabContent[];
}

export function useTabLayout(
  { tabs = defaultTabs }: UseTabLayoutHook = {
    tabs: defaultTabs,
  }
) {
  const [tabLayoutValue, setTabLayoutValue] = useState<TabLayoutValue>({
    index: 0,
    tabId: tabs[0].tabId,
  });

  const onIndexChange = (index: number) => {
    setTabLayoutValue({
      index,
      tabId: tabs[index].tabId,
    });
  };

  const tabLabels = tabs.map((tab) => tab.label);

  return {
    tabLayoutValue,
    onIndexChange,
    tabLabels,
  };
}
