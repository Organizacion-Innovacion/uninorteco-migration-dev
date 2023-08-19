import React from "react";
import { AcademicInfo } from "../../../../core/entities/academic-info";

interface HowMuchPGAProps {
  academicInfo: AcademicInfo;
}

export function HowMuchPGA({ academicInfo }: HowMuchPGAProps) {
  console.log(academicInfo);
  return (
    <div>
      <p>how much pga</p>
    </div>
  );
}
