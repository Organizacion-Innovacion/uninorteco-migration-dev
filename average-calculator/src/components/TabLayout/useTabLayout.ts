import { useState } from "react";

export interface TabLayoutValue {
  index: number;
  tabId: string;
}

export interface TabContent {
  label: string;
  tabId: string;
}

export interface UseTabLayoutHook {
  tabs: TabContent[];
}

export function useTabLayout({ tabs }: UseTabLayoutHook) {
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
