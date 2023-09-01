import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicInfo } from "../../../../core/entities/academic-info";
import { computeNewPGA } from "../../../../core/domain-logic/pga";

const myLogger = AppLogger.getAppLogger().createContextLogger("final-pga-hook");

export interface UseFinalPGAHook {
  academicInfo: AcademicInfo;
}

export function useFinalPGA({ academicInfo }: UseFinalPGAHook) {
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const [finalPGA, setFinalPGA] = useState<number>(0);

  const onGradeChange = (grade: number) => {
    myLogger.debug("semester average changed", { grade });
    setSemesterAverage(grade);
  };

  useEffect(() => {
    myLogger.debug("computing final pga", {
      currentPGA: academicInfo.currentPGA,
      creditsSoFar: academicInfo.creditsSoFar,
      semesterAverage,
      currentCredits: academicInfo.currentCredits,
    });
    const newPga = computeNewPGA(
      academicInfo.currentPGA,
      academicInfo.creditsSoFar,
      semesterAverage,
      academicInfo.currentCredits
    );
    myLogger.debug("final pga", { newPga });
    setFinalPGA(newPga);
  }, [academicInfo, semesterAverage]);

  return {
    semesterAverage,
    finalPGA,
    onGradeChange,
  };
}
