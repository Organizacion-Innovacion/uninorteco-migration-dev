import { useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { AppLogger } from "../../../core/config/logger";
import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { AcademicSemester } from "../../../core/entities/semester";
import { APIError } from "../../../core/common/errors";
import { usePageFatalError } from "../../../hooks/usePageFatalError";

const myLogger = AppLogger.getAppLogger().createContextLogger("academic-semester-hook");

export function useAcademicSemester() {
  const [academicSemester, setAcademicSemester] = useState<AcademicSemester>({
    courses: [],
    name: "Semestre actual",
  });

  const { setLoadingStatus } = usePageControl();
  const { setFatalError } = usePageFatalError();

  const loadCurrentSemester = async () => {
    myLogger.debug("fetching current semester");
    setLoadingStatus(true);
    try {
      const currentAcademicSemester =
        await calculatorRepository.getCurrentAcademicSemester();
      myLogger.debug("current semester fetched", { currentAcademicSemester });
      setAcademicSemester(currentAcademicSemester);
    } catch (error) {
      if (error instanceof APIError) {
        setFatalError({ error });
      }
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    myLogger.debug("loading current semester");
    loadCurrentSemester();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    academicSemester,
  };
}
