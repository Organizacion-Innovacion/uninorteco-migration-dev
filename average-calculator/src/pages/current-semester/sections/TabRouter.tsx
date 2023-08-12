import React from "react";
import { FinalGrade } from "./FinalGrade";
import { HowMuch } from "./HowMuch";
import { useAcademicSemester } from "./hooks/useAcademicSemester";

export interface TabRouterProps {
  index: number;
}

export function TabRouter({ index }: TabRouterProps) {
  const { academicSemester } = useAcademicSemester();

  if (index === 0) {
    return <FinalGrade academicSemester={academicSemester} />;
  }

  if (index === 1) {
    return <HowMuch academicSemester={academicSemester} />;
  }

  // reaching this error by the user is impossible unless a developer makes a mistake
  throw new Error(`Invalid index: ${index}`);
}
