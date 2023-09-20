import React from "react";

export interface CoursesSectionProps {
  period: string;
}

export function CoursesSection({ period }: CoursesSectionProps) {
  return (
    <div>
      <p>{period}</p>
    </div>
  );
}
