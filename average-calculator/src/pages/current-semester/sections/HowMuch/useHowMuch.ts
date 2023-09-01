import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicSemester } from "../../../../core/entities/semester";
import {
  computeFinalGradeOfSemester,
  computeNeededGradeForSemester,
  replaceGradeOfUnLockedCourses,
} from "../../../../core/domain-logic/semester-algorithms";
import { InvalidInputError } from "../../../../core/common/errors";
import { useSemesterCourses } from "../../hooks/useSemesterCourses";

const myLogger = AppLogger.getAppLogger().createContextLogger("how-much-hook");

export interface UseHowMuchHook {
  academicSemester: AcademicSemester;
}

export interface ErrorSnackbarOptions {
  open: boolean;
  message: string;
}

export function useHowMuchSemester({ academicSemester }: UseHowMuchHook) {
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const { courses, onGradeChange, setCourses } = useSemesterCourses({
    academicSemester,
  });
  const [errorSnackbarOptions, setErrorSnackbarOptions] =
    useState<ErrorSnackbarOptions>({
      open: false,
      message: "",
    });

  const onCloseSnackbar = () => {
    setErrorSnackbarOptions({
      open: false,
      message: "",
    });
  };

  const onComputeNeededGrade = () => {
    myLogger.debug("computing needed grade", { semesterAverage });
    try {
      const neededGrade = computeNeededGradeForSemester(
        { name: "", courses },
        semesterAverage
      );
      myLogger.debug("needed grade computed", { neededGrade });
      const newCourses = replaceGradeOfUnLockedCourses(courses, neededGrade);
      setCourses(newCourses);
    } catch (error) {
      if (error instanceof InvalidInputError) {
        myLogger.debug("error computing needed grade", {
          errorMessage: error.message,
          errorCode: error.errorCode,
        });
        setErrorSnackbarOptions({
          open: true,
          message: error.userMessage,
        });
      }
    }
  };

  const onFinalGradeChange = (grade: number) => {
    myLogger.debug("final grade changed", { grade });
    setSemesterAverage(grade);
  };

  const onLockIconPress = (id: string) => {
    myLogger.debug("lock icon pressed", { courseId: id });
    const newCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, isLocked: !course.isLocked };
      }
      return course;
    });
    setCourses(newCourses);
  };

  useEffect(() => {
    myLogger.debug("computing final grade of semester", {
      coursesGrades: academicSemester.courses.map(
        (course) => `${course.name}: ${course.grade}`
      ),
    });
    const avg = computeFinalGradeOfSemester(academicSemester);
    myLogger.debug("final grade of semester", { avg });
    setSemesterAverage(avg);
  }, [academicSemester]);

  return {
    courses,
    onLockIconPress,
    onGradeChange,
    semesterAverage,
    onFinalGradeChange,
    onComputeNeededGrade,
    errorSnackbarOptions,
    onCloseSnackbar,
  };
}
