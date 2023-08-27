import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { computeFinalGradeOfCourse } from "../../../../core/domain-logic/course-algorithms";
import { Course } from "../../../../core/entities/course";
import { usePartialComponents } from "../../hooks/usePartialComponents";

const myLogger = AppLogger.getAppLogger().createContextLogger(
  "final-grade-course-hook"
);

export interface FinalGradeCourseHook {
  course: Course;
}

export function useFinalGradeCourse({ course }: FinalGradeCourseHook) {
  const [finalCourseGrade, setFinalCourseGrade] = useState<number>(0);
  const { components, onGradeChange, evaluatedPercentage } = usePartialComponents({
    course,
  });

  useEffect(() => {
    myLogger.debug("computing final grade of course");
    const finalGrade = computeFinalGradeOfCourse({ components, id: "", name: "" });
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
