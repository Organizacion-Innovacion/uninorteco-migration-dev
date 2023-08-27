import { useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { AppLogger } from "../../../core/config/logger";
import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { ErrorCode, RepositoryError } from "../../../core/common/errors";
import { usePageFatalError } from "../../../hooks/usePageFatalError";
import { Course } from "../../../core/entities/course";

const myLogger = AppLogger.getAppLogger().createContextLogger("use-course-hook");

export interface UseCourseHook {
  courseId: string;
}

export function useCourse({ courseId }: UseCourseHook) {
  const [course, setCourse] = useState<Course | null>(null);

  const { setLoadingStatus } = usePageControl();
  const { setFatalError } = usePageFatalError();

  const loadCourse = async () => {
    myLogger.info("fetching course info");
    setLoadingStatus(true);
    try {
      const currentCourse = await calculatorRepository.getCourse(courseId);
      myLogger.info("course info fetched", { currentAcademicInfo: currentCourse });
      setCourse(currentCourse);
    } catch (error) {
      if (error instanceof RepositoryError) {
        if (error.errorCode === ErrorCode.NOT_FOUND) {
          setFatalError({ error, iconColor: "blue", iconName: "info" });
        }
        setFatalError({ error });
      }
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    myLogger.debug("loading course info");
    loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    course,
  };
}
