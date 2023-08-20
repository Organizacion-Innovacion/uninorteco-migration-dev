import { useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicInfo } from "../../../../core/entities/academic-info";
import { computeNeededSemesterAverage } from "../../../../core/domain-logic/pga";
import { InvalidInputError } from "../../../../core/common/errors";

const myLogger = AppLogger.getAppLogger().createContextLogger("how-much-pga-hook");

export interface HowMuchPGA {
  academicInfo: AcademicInfo;
}

export interface ErrorSnackbarOptions {
  open: boolean;
  message: string;
}

export function useHowMuchPGA({ academicInfo }: HowMuchPGA) {
  const [semesterAverage, setSemesterAverage] = useState<number>(0);
  const [desiredPGA, setDesiredPGA] = useState<number>(academicInfo.currentPGA);

  const [errorSnackbarOptions, setErrorSnackbarOptions] =
    useState<ErrorSnackbarOptions>({
      open: false,
      message: "",
    });

  const onCloseSnackbar = () => {
    setErrorSnackbarOptions({
      open: false,
      message: "",
    });
  };

  const onGradeChange = (grade: number) => {
    myLogger.debug("desired pga changed", { grade });
    setDesiredPGA(grade);
  };

  const onNeededSemesterAverage = () => {
    myLogger.debug("computing semester average for desired grade", {
      currentPGA: academicInfo.currentPGA,
      creditsSoFar: academicInfo.creditsSoFar,
      desiredPGA,
      currentCredits: academicInfo.currentCredits,
    });
    try {
      const neededSemesterAverage = computeNeededSemesterAverage(
        academicInfo.currentPGA,
        academicInfo.creditsSoFar,
        desiredPGA,
        academicInfo.currentCredits
      );
      myLogger.debug("semester average for desired pga", { neededSemesterAverage });
      setSemesterAverage(neededSemesterAverage);
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

  return {
    semesterAverage,
    desiredPGA,
    onGradeChange,
    onNeededSemesterAverage,
    errorSnackbarOptions,
    onCloseSnackbar,
  };
}
