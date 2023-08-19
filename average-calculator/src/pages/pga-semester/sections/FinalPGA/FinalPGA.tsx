import React from "react";
import { AcademicInfo } from "../../../../core/entities/academic-info";
import { useFinalPGA } from "./useFinalPGA";
import { CoursesContainer } from "../../../../components/CoursesContainer";
import { PGASemesterCard } from "../../components/PGASemesterCard";

interface FinalPGAProps {
  academicInfo: AcademicInfo;
}

export function FinalPGA({ academicInfo }: FinalPGAProps) {
  const { finalPGA, onGradeChange, semesterAverage } = useFinalPGA({ academicInfo });

  return (
    <CoursesContainer>
      <PGASemesterCard
        title="Promedio semestral"
        subtitle={`Créditos semestrales: ${academicInfo.currentCredits}`}
        explanation="Si dejo mi promedio semestral en:"
        onGradeChange={onGradeChange}
        value={semesterAverage}
      />
      <PGASemesterCard
        title="Promedio acumulado"
        subtitle={`Créditos aprobados: ${academicInfo.creditsSoFar}`}
        explanation="Mi promedio acumulado quedará en"
        value={finalPGA}
      />
    </CoursesContainer>
  );
}
