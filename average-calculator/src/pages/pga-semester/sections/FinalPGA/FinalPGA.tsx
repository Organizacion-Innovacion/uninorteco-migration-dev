import React from "react";
import { AcademicInfo } from "../../../../core/entities/academic-info";

interface FinalPGAProps {
  academicInfo: AcademicInfo;
}

export function FinalPGA({ academicInfo }: FinalPGAProps) {
  console.log(academicInfo);

  return (
    <div>
      <p>final pga</p>
    </div>
  );
}
