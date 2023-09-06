import { useEffect, useState } from "react";
import { AppLogger } from "../../../../core/config/logger";
import { AcademicInfo } from "../../../../core/entities/academic-info";
import { InvalidInputError } from "../../../../core/common/errors";
import { calculatorFacade } from "../../../../core/domain-logic/facade";

const myLogger = AppLogger.getAppLogger().createContextLogger("how-much-pga-hook");

export interface UseHowMuchPGAHook {
  academicInfo: AcademicInfo;
}

export interface ErrorSnackbarOptions {
  open: boolean;
  message: string;
}

export function useHowMuchPGA({ academicInfo }: UseHowMuchPGAHook) {
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
    try {
      myLogger.debug("computing semester average for desired grade", {
        currentPGA: academicInfo.currentPGA,
        creditsSoFar: academicInfo.creditsSoFar,
        desiredPGA,
        currentCredits: academicInfo.currentCredits,
      });
      const neededSemesterAverage = calculatorFacade.pgaHowMuch(
        academicInfo,
        desiredPGA
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

  useEffect(() => {
    // We need to compute the semester average when the component is mounted,
    // otherwise the user will see a 0 as the semester average which is not correct.
    onNeededSemesterAverage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    semesterAverage,
    desiredPGA,
    onGradeChange,
    onNeededSemesterAverage,
    errorSnackbarOptions,
    onCloseSnackbar,
  };
}
