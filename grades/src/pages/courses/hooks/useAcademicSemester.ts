import { useCallback, useEffect, useState } from "react";
import { RepositoryError } from "@uninorte/enrollment-utils/common";
import { usePageFatalError } from "../../../hooks/usePageFatalError";
import { AcademicSemester } from "../../../core/entities/courses";
import { gradesRepository } from "../../../core/repositories/repository-factory";
import { AppLogger } from "../../../core/config/logger";

const myLogger = AppLogger.getAppLogger().createContextLogger("academic-semester-hook");

export interface UseAcademicSemesterHook {
  period: string;
}

export function useAcademicSemester({ period }: UseAcademicSemesterHook) {
  const [academicSemester, setAcademicSemester] = useState<AcademicSemester | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);

  const { setFatalError } = usePageFatalError();

  const loadCurrentSemester = useCallback(async () => {
    myLogger.info("fetching current semester");
    setLoading(true);
    try {
      const currentAcademicSemester = await gradesRepository.getAcademicSemester(
        period
      );
      myLogger.info("current semester fetched", { currentAcademicSemester });

      if (currentAcademicSemester.courses.length === 0) {
        myLogger.info("no courses found");
        setFatalError({
          userMessage:
            "No se pudo acceder a las asignaturas matriculadas. Es posible que no hayas realizado la evaluación docente",
        });
      } else {
        setAcademicSemester(currentAcademicSemester);
      }
    } catch (error) {
      if (error instanceof RepositoryError) {
        setFatalError({
          error,
          userMessage:
            "Hubo un error obteniendo las asignaturas matriculadas. Es posible que no hayas realizado la evaluación docente",
        });
      }
    } finally {
      setLoading(false);
    }
    // just reload when period changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  useEffect(() => {
    myLogger.debug("loading current semester");
    loadCurrentSemester();
  }, [loadCurrentSemester]);

  return {
    academicSemester,
    isLoading,
  };
}
