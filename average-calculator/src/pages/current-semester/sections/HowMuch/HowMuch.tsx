import React from "react";
import { Button, Snackbar } from "@ellucian/react-design-system/core";
import { SemesterCourseCard } from "../../components/SemesterCourseCard";
import { AcademicSemester } from "../../../../core/entities/semester";
import { useHowMuchSemester } from "./useHowMuch";
import { HowMuchResultCard } from "../../components/HowMuchResultCard";
import { CoursesContainer } from "../../../common/components/CoursesContainer";

export interface HowMuchProps {
  academicSemester: AcademicSemester;
}

export function HowMuch({ academicSemester }: HowMuchProps) {
  const {
    courses,
    onLockIconPress,
    onGradeChange,
    semesterAverage,
    onFinalGradeChange,
    onComputeNeededGrade,
    errorSnackbarOptions,
    onCloseSnackbar,
  } = useHowMuchSemester({
    academicSemester,
  });

  return (
    <>
      <CoursesContainer>
        {courses.map((course) => (
          <SemesterCourseCard
            key={course.id}
            semesterCourse={course}
            onGradeChange={onGradeChange}
            onLockIconPress={onLockIconPress}
          />
        ))}
      </CoursesContainer>
      <CoursesContainer sxProps={{ mt: 16 }}>
        <HowMuchResultCard
          title="Promedio semestral"
          subtitle="Las asignaturas no bloqueadas serán modificadas para obtener un promedio semestral de"
          value={semesterAverage}
          onGradeChange={onFinalGradeChange}
          helpMessage="¿Cómo se calcula el promedio semestral?"
        />
        <Button
          sx={{
            width: "85%",
            alignSelf: "center",
            justifySelf: "center",
            my: 4,
          }}
          onClick={onComputeNeededGrade}
        >
          Calcular lo que necesito!
        </Button>
      </CoursesContainer>
      <Snackbar
        variant="error"
        open={errorSnackbarOptions.open}
        onClose={onCloseSnackbar}
        message={errorSnackbarOptions.message}
      />
    </>
  );
}
