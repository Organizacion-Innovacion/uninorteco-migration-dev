import React from "react";
import { SemesterCourseCard } from "../../components/SemesterCourseCard";
import { Box } from "../../../../components/Box";
import { FinalResultCard } from "../../components/FinalResultCard";
import { useFinalGrade } from "./useFinalGrade";
import { AcademicSemester } from "../../../../core/entities/semester";

export interface FinalGradeProps {
  academicSemester: AcademicSemester;
}

export function FinalGrade({ academicSemester }: FinalGradeProps) {
  const { courses, semesterAverage, onGradeChange, totalCredits } = useFinalGrade({
    academicSemester,
  });

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(300px, 1fr))",
            md: "repeat(auto-fill, minmax(400px, 1fr))",
          },
          gap: 2,
        }}
      >
        {courses.map((course) => (
          <SemesterCourseCard
            key={course.id}
            semesterCourse={course}
            onGradeChange={onGradeChange}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(auto-fill, minmax(300px, 1fr))",
            md: "repeat(auto-fill, minmax(400px, 1fr))",
          },
          gap: 2,
          mt: 16,
        }}
      >
        <FinalResultCard
          title="Promedio semestral"
          subtitle={`Créditos: ${totalCredits}`}
          result={semesterAverage}
        />
        {/* <FinalResultCard
          title="Promediado acumulado"
          subtitle="Promediado con este semestre"
          result={4.8}
        /> */}
      </Box>
    </>
  );
}
