import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicSemester } from "../../../../core/entities/semester";
import { computeFinalGradeOfSemester } from "../../../../core/domain-logic/semester-algorithms";
import { useSemesterCourses } from "../../hooks/useSemesterCourses";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-grade-hook");

export interface UseFinalGrade {
  academicSemester: AcademicSemester;
}

export function useFinalGrade({ academicSemester }: UseFinalGrade) {
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const { courses, onGradeChange, totalCredits } = useSemesterCourses({
    academicSemester,
  });

  useEffect(() => {
    myLogger.debug("computing final grade of semester", {
      coursesGrades: courses.map((course) => `${course.name}: ${course.grade}`),
    });
    // This function will not use the name of the semester, but the courses
    // consider changing the function signature to only receive the courses
    // if possible
    const avg = computeFinalGradeOfSemester({ courses, name: "" });
    myLogger.debug("final grade of semester", { avg });
    setSemesterAverage(avg);
  }, [courses]);

  return {
    courses,
    semesterAverage,
    onGradeChange,
    totalCredits,
  };
}
