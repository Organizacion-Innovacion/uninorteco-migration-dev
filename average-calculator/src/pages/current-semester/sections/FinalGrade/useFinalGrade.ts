import { useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicSemester, SemesterCourse } from "../../../../core/entities/semester";
import { computeFinalGradeOfSemester } from "../../../../core/domain-logic/semester-algorithms";
import { DomainError } from "../../../../core/common/errors";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-grade-courses");

export interface UseFinalGrade {
  academicSemester: AcademicSemester;
}

export function useFinalGrade({ academicSemester }: UseFinalGrade) {
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const [courses, setCourses] = useState<SemesterCourse[]>([]);

  const { setErrorMessage } = usePageControl();

  const onGradeChange = (id: string, grade: number) => {
    myLogger.debug("grade changed", { id, grade });
    const newCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, grade };
      }
      return course;
    });
    setCourses(newCourses);
  };

  // we can use academicSemester.courses.length instead of this courses state
  // because the total number of credits is not going to change
  const totalCredits = academicSemester.courses.reduce(
    (acc, course) => acc + course.credits,
    0
  );

  useEffect(() => {
    try {
      // This function will not use the name of the semester, but the courses
      // consider changing the function signature to only receive the courses
      const avg = computeFinalGradeOfSemester({ courses, name: "" });
      setSemesterAverage(avg);
    } catch (error) {
      if (error instanceof DomainError) {
        myLogger.error("error computing semester average", {
          errorMessage: error.message,
          errorCode: error.errorCode,
        });
        setErrorMessage({
          headerMessage: "Lo sentimos",
          textMessage: error.userMessage,
          iconName: "error",
          iconColor: "red",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses]);

  useEffect(() => {
    setCourses(academicSemester.courses);
  }, [academicSemester]);

  return {
    courses,
    semesterAverage,
    onGradeChange,
    totalCredits,
  };
}
