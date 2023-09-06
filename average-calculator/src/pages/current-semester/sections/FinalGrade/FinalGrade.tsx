import React from "react";
import { SemesterCourseCard } from "../../components/SemesterCourseCard";
import { FinalGradeResultCard } from "../../components/FinalGradeResultCard";
import { useFinalGradeSemester } from "./useFinalGrade";
import { AcademicSemester } from "../../../../core/entities/semester";
import { CoursesContainer } from "../../../common/components/CoursesContainer";

export interface FinalGradeProps {
  academicSemester: AcademicSemester;
}

export function FinalGrade({ academicSemester }: FinalGradeProps) {
  const { courses, semesterAverage, onGradeChange, totalCredits } =
    useFinalGradeSemester({
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
          />
        ))}
      </CoursesContainer>
      <CoursesContainer sxProps={{ mt: 16 }}>
        <FinalGradeResultCard
          title="Promedio semestral"
          subtitle={`Créditos Semestrales: ${totalCredits}`}
          result={semesterAverage}
          helpMessage="¿Cómo se calcula el promedio semestral?"
        />
      </CoursesContainer>
    </>
  );
}
