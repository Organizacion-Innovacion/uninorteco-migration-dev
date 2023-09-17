import { useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { AppLogger } from "../../../core/config/logger";
import { calculatorRepository } from "../../../core/repositories/repository-factory";
import { RepositoryError } from "../../../core/common/errors";
import { AcademicInfo } from "../../../core/entities/academic-info";
import { usePageFatalError } from "../../../hooks/usePageFatalError";

const myLogger = AppLogger.getAppLogger().createContextLogger("academic-info-hook");

export function useAcademicInfo() {
  const [academicInfo, setAcademicInfo] = useState<AcademicInfo | null>(null);

  const { setLoadingStatus } = usePageControl();
  const { setFatalError } = usePageFatalError();

  const loadAcademicInfo = async () => {
    myLogger.info("fetching academic info");
    setLoadingStatus(true);
    try {
      const currentAcademicInfo = await calculatorRepository.getAcademicInfo();
      myLogger.info("academic info fetched", { currentAcademicInfo });
      setAcademicInfo(currentAcademicInfo);
    } catch (error) {
      if (error instanceof RepositoryError) {
        setFatalError({
          error,
          userMessage:
            "Hubo un error obteniendo las asignaturas matriculadas. Es posible que no hayas realizado la evaluación docente",
        });
      }
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    myLogger.debug("loading academic info");
    loadAcademicInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    academicInfo,
  };
}
