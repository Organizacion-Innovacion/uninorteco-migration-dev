import React from "react";
import { CircularProgress } from "@ellucian/react-design-system/core";
import { FinalPGA } from "./FinalPGA";
import { HowMuchPGA } from "./HowMuchPGA";
import { useAcademicInfo } from "../hooks/useAcademicInfo";
import { Stack } from "../../../components/Stack";

export interface TabRouterProps {
  index: number;
}

export function TabRouter({ index }: TabRouterProps) {
  const { academicInfo } = useAcademicInfo();

  // Not rendering the tab content until the academic info is loaded
  // is a small optimization
  if (academicInfo !== null) {
    if (index === 0) {
      return <FinalPGA academicInfo={academicInfo} />;
    }

    if (index === 1) {
      return <HowMuchPGA academicInfo={academicInfo} />;
    }
    // reaching this error by the user is impossible unless a developer makes a mistake
    throw new Error(`Invalid index: ${index}`);
  }

  // The CircularProgress will never be rendered because of the loading state of
  // loading status of ellucian hook setLoadingStatus
  return (
    <Stack sx={{ alignItems: "center" }}>
      <CircularProgress />
    </Stack>
  );
}
