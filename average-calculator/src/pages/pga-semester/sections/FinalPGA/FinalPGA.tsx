import React, { useState } from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { AcademicInfo } from "../../../../core/entities/academic-info";
import { useFinalPGA } from "./useFinalPGA";
import { CoursesContainer } from "../../../common/components/CoursesContainer";
import { PGASemesterCard } from "../../components/PGASemesterCard";
import { PGAInfoModal } from "../../components/PGAInfoModal";
import { ClickableTypography } from "../../../common/components/ClickableTypography";

interface FinalPGAProps {
  academicInfo: AcademicInfo;
}

export function FinalPGA({ academicInfo }: FinalPGAProps) {
  const { finalPGA, onGradeChange, semesterAverage } = useFinalPGA({ academicInfo });
  const [open, setOpen] = useState(false);

  return (
    <>
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
      <ClickableTypography
        message="¿Cómo se calcula el promedio acumulado?"
        onClick={() => setOpen(true)}
        sxProps={{
          alignSelf: "center",
          mt: 6,
          px: 2,
          textAlign: "center",
        }}
      />
      <PGAInfoModal open={open} setOpen={setOpen} />
    </>
  );
}
