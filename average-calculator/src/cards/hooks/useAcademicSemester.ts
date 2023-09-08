import { useEffect, useState } from "react";
import { useCardControl } from "@ellucian/experience-extension-utils";
import { AppLogger } from "../../core/config/logger";
import { AcademicSemester } from "../../core/entities/semester";
import { useCardFatalError } from "../../hooks/useCardFatalError";
import { calculatorRepository } from "../../core/repositories/repository-factory";
import { RepositoryError } from "../../core/common/errors";

const myLogger = AppLogger.getAppLogger().createContextLogger(
  "card-academic-semester-hook"
);

export function useAcademicSemester() {
  const [academicSemester, setAcademicSemester] = useState<AcademicSemester | null>(
    null
  );

  const { setLoadingStatus } = useCardControl();
  const { setFatalError } = useCardFatalError();

  const loadCurrentSemester = async () => {
    myLogger.info("fetching current semester");
    setLoadingStatus(true);
    try {
      const currentAcademicSemester =
        await calculatorRepository.getCurrentAcademicSemester();
      myLogger.info("current semester fetched", { currentAcademicSemester });
      setAcademicSemester(currentAcademicSemester);
    } catch (error) {
      if (error instanceof RepositoryError) {
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
