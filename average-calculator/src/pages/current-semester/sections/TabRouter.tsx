import React from "react";
import { CircularProgress } from "@ellucian/react-design-system/core";
import { FinalGrade } from "./FinalGrade";
import { HowMuch } from "./HowMuch";
import { useAcademicSemester } from "../hooks/useAcademicSemester";
import { Stack } from "../../../components/Stack";

export interface TabRouterProps {
  index: number;
}

export function TabRouter({ index }: TabRouterProps) {
  const { academicSemester } = useAcademicSemester();

  if (academicSemester !== null) {
    if (index === 0) {
      return <FinalGrade academicSemester={academicSemester} />;
    }

    if (index === 1) {
      return <HowMuch academicSemester={academicSemester} />;
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
