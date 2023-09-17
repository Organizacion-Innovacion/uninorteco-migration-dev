import { useEffect, useState } from "react";
import { AppLogger } from "../../../core/config/logger";
import { AcademicSemester, SemesterCourse } from "../../../core/entities/semester";
import { sortSemesterCoursesByCredits } from "../../../core/domain-logic/course-utils";

const myLogger = AppLogger.getAppLogger().createContextLogger("semester-courses-hook");

export interface UseSemesterCourseHook {
  academicSemester: AcademicSemester;
}

export function useSemesterCourses({ academicSemester }: UseSemesterCourseHook) {
  const [courses, setCourses] = useState<SemesterCourse[]>([]);

  const onGradeChange = (id: string, grade: number) => {
    myLogger.debug("grade changed", { id, grade });
    const newCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, grade };
      }
      return course;
    });
    setCourses(sortSemesterCoursesByCredits(newCourses));
  };

  // we can use academicSemester.courses instead of courses state
  // because the total number of credits is not going to change
  const totalCredits = academicSemester.courses.reduce(
    (acc, course) => acc + course.credits,
    0
  );

  useEffect(() => {
    setCourses(sortSemesterCoursesByCredits(academicSemester.courses));
  }, [academicSemester]);

  return {
    courses,
    onGradeChange,
    totalCredits,
    setCourses,
  };
}
