import React from "react";
import { useAcademicSemester } from "./hooks/useAcademicSemester";

export interface CoursesSectionProps {
  period: string;
}

export function CoursesSection({ period }: CoursesSectionProps) {
  const { academicSemester } = useAcademicSemester({ period });

  return (
    <div>
      <p>{period}</p>
    </div>
  );
}
