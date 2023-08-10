import React, { useEffect, useState } from "react";
import { AppLogger } from "../../../core/config/logger";
import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { AcademicSemester } from "../../../core/entities/semester";
import { SemesterCourseCard } from "./SemesterCourseCard";
import { Box } from "../../../components/Box";
import { FinalResultCard } from "./FinalResultCard";
import { computeFinalGradeOfSemester } from "../../../core/domain-logic/semester-algorithms";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-grade-courses");

export function FinalGrade() {
  const [academicSemester, setAcademicSemester] = useState<AcademicSemester>({
    courses: [],
    name: "Semestre actual",
  });
  const [semesterAverage, setSemesterAverage] = useState<number>(0);

  const loadCurrentSemester = async () => {
    const currentAcademicSemester =
      await calculatorRepository.getCurrentAcademicSemester();
    myLogger.debug("current semester data", currentAcademicSemester);
    setAcademicSemester(currentAcademicSemester);
  };

  const onGradeChange = (id: string, grade: number) => {
    myLogger.debug("grade changed", { id, grade });
    const newCourses = academicSemester.courses.map((course) => {
      if (course.id === id) {
        return { ...course, grade };
      }

      return course;
    });

    setAcademicSemester((semester) => ({ ...semester, courses: newCourses }));
  };

  const totalCredits = academicSemester.courses.reduce(
    (acc, course) => acc + course.credits,
    0
  );

  useEffect(() => {
    myLogger.debug("loading current semester");
    loadCurrentSemester();
  }, []);

  useEffect(() => {
    try {
      const avg = computeFinalGradeOfSemester(academicSemester);
      setSemesterAverage(avg);
    } catch (error) {
      if (error instanceof Error) {
        myLogger.error("error computing semester average", error);
      }
    }
  }, [academicSemester]);

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
        <FinalResultCard
          title="Promediado acumulado"
          subtitle="Promediado con este semestre"
          result={4.8}
        />
      </Box>
    </>
  );
}
