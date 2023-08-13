import { useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { AppLogger } from "../../../core/config/logger";
import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { AcademicSemester } from "../../../core/entities/semester";
import { APIError } from "../../../core/common/errors";

const myLogger = AppLogger.getAppLogger().createContextLogger("academic-semester-hook");

export function useAcademicSemester() {
  const [academicSemester, setAcademicSemester] = useState<AcademicSemester>({
    courses: [],
    name: "Semestre actual",
  });

  const { setLoadingStatus, setErrorMessage } = usePageControl();

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
        myLogger.error("error fetching current semester", {
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
