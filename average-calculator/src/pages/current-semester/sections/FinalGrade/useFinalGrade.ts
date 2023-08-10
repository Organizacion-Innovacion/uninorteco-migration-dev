import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { calculatorRepository } from "../../../../core/repositories/repository-factory";
import { AcademicSemester } from "../../../../core/entities/semester";
import { computeFinalGradeOfSemester } from "../../../../core/domain-logic/semester-algorithms";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-grade-courses");

export function useFinalGrade() {
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

  return {
    academicSemester,
    semesterAverage,
    onGradeChange,
    totalCredits,
  };
}
