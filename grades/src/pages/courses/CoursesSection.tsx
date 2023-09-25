import React from "react";
import { CircularProgress } from "@ellucian/react-design-system/core";
import { useAcademicSemester } from "./hooks/useAcademicSemester";
import { Stack } from "../../components/Stack";
import { CoursesContainer } from "../common/components/CoursesContainer";
import { SemesterCourseCard } from "./components/SemesterCourseCard";

export interface CoursesSectionProps {
  period: string;
}

export function CoursesSection({ period }: CoursesSectionProps) {
  const { academicSemester, isLoading } = useAcademicSemester({ period });

  if (isLoading) {
    return (
      <Stack sx={{ alignItems: "center" }}>
        <CircularProgress />
      </Stack>
    );
  }

  const courses = academicSemester?.courses ?? [];

  return (
    <CoursesContainer>
      {courses.map((course) => (
        <SemesterCourseCard key={course.id} semesterCourse={course} />
      ))}
    </CoursesContainer>
  );
}
