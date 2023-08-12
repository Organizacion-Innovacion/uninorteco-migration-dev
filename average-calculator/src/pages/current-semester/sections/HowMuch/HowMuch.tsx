import React from "react";
import { AcademicSemester } from "../../../../core/entities/semester";

export interface HowMuchProps {
  academicSemester: AcademicSemester;
}

export function HowMuch({ academicSemester }: HowMuchProps) {
  return (
    <div>
      <p>HowMuch</p>
    </div>
  );
}
