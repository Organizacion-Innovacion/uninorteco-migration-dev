import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { Course } from "../../../../core/entities/course";
import { usePartialComponents } from "../../hooks/usePartialComponents";
import { calculatorFacade } from "../../../../core/domain-logic/facade";

const myLogger = AppLogger.getAppLogger().createContextLogger(
  "final-grade-course-hook"
);

export interface UseFinalGradeCourseHook {
  course: Course;
}

export function useFinalGradeCourse({ course }: UseFinalGradeCourseHook) {
  const [finalCourseGrade, setFinalCourseGrade] = useState<number>(0);
  const { components, onGradeChange, evaluatedPercentage } = usePartialComponents({
    course,
  });

  useEffect(() => {
    myLogger.debug("computing final grade of course");
    const finalGrade = calculatorFacade.courseFinalGrade(components);
    myLogger.debug("final grade of course", { finalGrade });
    setFinalCourseGrade(finalGrade);
  }, [components]);

  return {
    finalCourseGrade,
    onGradeChange,
    components,
    evaluatedPercentage,
  };
}
