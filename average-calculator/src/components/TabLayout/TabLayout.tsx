import React from "react";
import {
  TabLayout as EllucianTabLayout,
  Tab,
  Tabs,
  TabLayoutContent,
  makeStyles,
} from "@ellucian/react-design-system/core";

const useStyles = makeStyles(() => ({
  tabLayout: {
    maxWidth: "1000px",
    width: "100%",
    marginBottom: "1rem",
  },
  tabContent: {
    display: "flex",
    flexDirection: "column",
  },
}));

export interface TabLayoutProps {
  onIndexChange: (index: number) => void;
  index: number;
  tabs: string[];
  children: React.ReactNode;
}

export function TabLayout({ onIndexChange, index, tabs, children }: TabLayoutProps) {
  const classes = useStyles();

  return (
    <EllucianTabLayout className={classes.tabLayout} style={{ padding: 0 }}>
      <Tabs onChange={(e: any, val: number) => onIndexChange(val)} value={index}>
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>
      <TabLayoutContent className={classes.tabContent}>{children}</TabLayoutContent>
    </EllucianTabLayout>
  );
}
