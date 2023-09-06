import React from "react";
import { Snackbar, Button } from "@ellucian/react-design-system/core";
import { AcademicInfo } from "../../../../core/entities/academic-info";
import { useHowMuchPGA } from "./useHowMuchPGA";
import { CoursesContainer } from "../../../common/components/CoursesContainer";
import { PGASemesterCard } from "../../components/PGASemesterCard";

interface HowMuchPGAProps {
  academicInfo: AcademicInfo;
}

export function HowMuchPGA({ academicInfo }: HowMuchPGAProps) {
  const {
    desiredPGA,
    onGradeChange,
    semesterAverage,
    onNeededSemesterAverage,
    errorSnackbarOptions,
    onCloseSnackbar,
  } = useHowMuchPGA({
    academicInfo,
  });

  return (
    <>
      <CoursesContainer>
        <PGASemesterCard
          title="Promedio acumulado"
          subtitle={`Créditos aprobados: ${academicInfo.creditsSoFar}`}
          explanation="Sí deseo un promedio acumulado de"
          onGradeChange={onGradeChange}
          value={desiredPGA}
        />
        <PGASemesterCard
          title="Promedio semestral"
          subtitle={`Créditos semestrales: ${academicInfo.currentCredits}`}
          explanation="Necesitas un promedio semestral de"
          value={semesterAverage}
        />
      </CoursesContainer>
      <Snackbar
        variant="error"
        open={errorSnackbarOptions.open}
        onClose={onCloseSnackbar}
        message={errorSnackbarOptions.message}
      />
      <Button
        sx={{
          width: "100%",
          maxWidth: "800px",
          alignSelf: "center",
          my: 6,
        }}
        onClick={onNeededSemesterAverage}
      >
        Calcular lo que necesito!
      </Button>
    </>
  );
}
