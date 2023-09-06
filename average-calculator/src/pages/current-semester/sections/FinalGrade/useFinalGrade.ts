import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicSemester } from "../../../../core/entities/semester";
import { useSemesterCourses } from "../../hooks/useSemesterCourses";
import { calculatorFacade } from "../../../../core/domain-logic/facade";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-grade-hook");

export interface UseFinalGradeHook {
  academicSemester: AcademicSemester;
}

export function useFinalGradeSemester({ academicSemester }: UseFinalGradeHook) {
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const { courses, onGradeChange, totalCredits } = useSemesterCourses({
    academicSemester,
  });

  useEffect(() => {
    myLogger.debug("computing final grade of semester");
    const avg = calculatorFacade.semesterFinalGrade(courses);
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
