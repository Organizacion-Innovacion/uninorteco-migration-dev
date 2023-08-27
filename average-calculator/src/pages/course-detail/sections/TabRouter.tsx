import React from "react";
import { CircularProgress } from "@ellucian/react-design-system/core";
import { FinalGradeCourse } from "./FinalGradeCourse";
import { HowMuchCourse } from "./HowMuchCourse";
import { Stack } from "../../../components/Stack";
import { Course } from "../../../core/entities/course";

export interface TabRouterProps {
  index: number;
  course: Course;
}

export function TabRouter({ index, course }: TabRouterProps) {
  if (index === 0) {
    return <FinalGradeCourse course={course} />;
  }

  if (index === 1) {
    return <HowMuchCourse />;
  }

  // The CircularProgress will never be rendered because of the loading state of
  // loading status of ellucian hook setLoadingStatus
  return (
    <Stack sx={{ alignItems: "center" }}>
      <CircularProgress />
    </Stack>
  );
}
