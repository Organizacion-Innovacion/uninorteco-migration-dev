import React from "react";
import {
  TabLayout,
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

export interface HowMuchFinalTabLayoutProps {
  onIndexChange: (index: number) => void;
  index: number;
  tabs: string[];
  children: React.ReactNode;
}

export function HowMuchFinalTabLayout({
  onIndexChange,
  index,
  tabs,
  children,
}: HowMuchFinalTabLayoutProps) {
  const classes = useStyles();

  return (
    <TabLayout className={classes.tabLayout} style={{ padding: 0 }}>
      <Tabs onChange={(e: any, val: number) => onIndexChange(val)} value={index}>
        {tabs.map((tab) => (
          <Tab key={tab} label={tab} />
        ))}
      </Tabs>
      <TabLayoutContent className={classes.tabContent}>{children}</TabLayoutContent>
    </TabLayout>
  );
}
