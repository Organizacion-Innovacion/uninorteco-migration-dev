import React from "react";
import { SemesterCourseCard } from "../../components/SemesterCourseCard";
import { Box } from "../../../../components/Box";
import { FinalResultCard } from "../../components/FinalResultCard";
import { useFinalGrade } from "./useFinalGrade";

export function FinalGrade() {
  const { academicSemester, semesterAverage, onGradeChange, totalCredits } =
    useFinalGrade();

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
        {academicSemester.courses.map((course) => (
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
