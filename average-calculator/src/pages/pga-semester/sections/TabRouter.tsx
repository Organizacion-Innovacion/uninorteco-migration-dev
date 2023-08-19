import React from "react";
import { FinalPGA } from "./FinalPGA";
import { HowMuchPGA } from "./HowMuchPGA";
import { useAcademicInfo } from "../hooks/useAcademicInfo";

export interface TabRouterProps {
  index: number;
}

export function TabRouter({ index }: TabRouterProps) {
  const { academicInfo } = useAcademicInfo();

  if (index === 0) {
    return <FinalPGA academicInfo={academicInfo} />;
  }

  if (index === 1) {
    return <HowMuchPGA academicInfo={academicInfo} />;
  }

  // reaching this error by the user is impossible unless a developer makes a mistake
  throw new Error(`Invalid index: ${index}`);
}
