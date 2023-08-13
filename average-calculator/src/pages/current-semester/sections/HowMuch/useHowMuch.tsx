import { useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicSemester, SemesterCourse } from "../../../../core/entities/semester";
import {
  computeFinalGradeOfSemester,
  computeNeededGradeForSemester,
  replaceGradeOfUnLockedCourses,
} from "../../../../core/domain-logic/semester-algorithms";
import { InvalidInputError, DomainError } from "../../../../core/common/errors";

const myLogger = AppLogger.getAppLogger().createContextLogger("sp-how-much-courses");

export interface UseHowMuch {
  academicSemester: AcademicSemester;
}

export interface ErrorSnackbarOptions {
  open: boolean;
  message: string;
}

export function useHowMuch({ academicSemester }: UseHowMuch) {
  const [courses, setCourses] = useState<SemesterCourse[]>([]);
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const [errorSnackbarOptions, setErrorSnackbarOptions] =
    useState<ErrorSnackbarOptions>({
      open: false,
      message: "",
    });

  const { setErrorMessage } = usePageControl();

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

  const onLockIconPress = (id: string) => {
    myLogger.info(`lock icon pressed for course ${id}`);
    const newCourses = courses.map((course) => {
      if (course.id === id) {
        return { ...course, isLocked: !course.isLocked };
      }
      return course;
    });
    setCourses(newCourses);
  };

  useEffect(() => {
    setCourses(academicSemester.courses);
    try {
      const avg = computeFinalGradeOfSemester({
        courses: academicSemester.courses,
        name: "",
      });
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
    // setErrorMessage is a set state function, eslint doesn't know that
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
