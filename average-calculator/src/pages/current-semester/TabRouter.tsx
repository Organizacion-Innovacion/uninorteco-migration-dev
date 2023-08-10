import React from "react";
import { FinalGrade } from "./components/FinalGrade";
import { HowMuch } from "./components/HowMuch";

export interface TabRouterProps {
  index: number;
}

export function TabRouter({ index }: TabRouterProps) {
  if (index === 0) {
    return <FinalGrade />;
  }

  if (index === 1) {
    return <HowMuch />;
  }

  // reaching this error by the user is impossible unless a developer makes a mistake
  throw new Error(`Invalid index: ${index}`);
}
