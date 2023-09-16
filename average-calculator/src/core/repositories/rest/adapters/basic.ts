import { AppLogger } from "../../../config/logger";
import { SemesterCourse } from "../../../entities/semester";
import { PartialComponent } from "../../../entities/course";
import { AECourse, AcademicEnrollmentResponse } from "../entities/academic-enrollment";
import { PartialGradeResponse, PGComponent } from "../entities/partial-grades";

const myLogger = AppLogger.getAppLogger().createContextLogger("rest-repo-adapters");

/**
 * Transforms an AECourse into a SemesterCourse without considering
 * grade related attributes
 */
export function AECourseToSemesterCourse(aeCourse: AECourse): SemesterCourse {
  return {
    id: aeCourse.SFRSTCR_CRN,
    name: aeCourse.SSBSECT_CRSE_TITLE,
    credits: aeCourse.SFRSTCR_CREDIT_HR,
    isLocked: false,
    wasEvaluated: false,
    grade: 0,
    // in this adapter we consider that there are no characteristics for the course
    characteristics: new Set(),
  };
}

export function AEResponseToSemesterCourses(
  aeResponse: AcademicEnrollmentResponse
): SemesterCourse[] {
  if (aeResponse.resultado.length === 0) {
    myLogger.warn("no courses found in academic enrollment response");
  }

  const semesterCourses: SemesterCourse[] = aeResponse.resultado.map(
    AECourseToSemesterCourse
  );

  return semesterCourses;
}

export function PGComponentToPartialComponent(
  pgComponent: PGComponent
): PartialComponent {
  let grade = pgComponent.NOTA;
  const gradeAsStr = pgComponent.NOTAA;

  const wasEvaluated = gradeAsStr !== "---";
  const isLocked = wasEvaluated;

  if (grade < 0 || grade > 5) {
    grade = -1;
  }

  // if grade is not a number, we use -1 as a representation of an invalid grade
  // special case of PA, NA, etc.
  if (gradeAsStr !== "---" && Number.isNaN(Number(gradeAsStr))) {
    grade = -1;
  }

  const partialComponent: PartialComponent = {
    id: `${pgComponent.SHRGCOM_SEQ_NO}`,
    name: pgComponent.SHRGCOM_DESCRIPTION,
    weight: pgComponent.SHRGCOM_WEIGHT,
    grade,
    wasEvaluated,
    isLocked,
  };

  return partialComponent;
}

export function PGResponseToPartialComponents(
  pgResponse: PartialGradeResponse
): PartialComponent[] {
  if (pgResponse.resultado.length === 0) {
    myLogger.warn("no partial components found in partial grades response");
  }

  const partialComponents: PartialComponent[] = pgResponse.resultado.map(
    PGComponentToPartialComponent
  );

  return partialComponents;
}

export function getPGAFromAECourse(aeCourse: AECourse): number {
  const { PUNTOS, CREDITOS } = aeCourse;
  return Math.floor((PUNTOS / CREDITOS) * 100) / 100;
}

export type SimplifiedAcademicInfo = {
  creditsSoFar: number;
  currentCredits: number;
  currentPGA: number;
};

export function AEResponseToSimplifiedAcademicInfo(
  aeResponse: AcademicEnrollmentResponse
): SimplifiedAcademicInfo {
  const { resultado } = aeResponse;
  if (aeResponse.resultado.length === 0) {
    myLogger.warn("no courses found in academic enrollment response");
  }
  // at least one course is present
  const aeCourse = resultado[0];

  const { CREDITOS: creditsSoFar } = aeCourse;
  const pga = getPGAFromAECourse(aeCourse);
  const totalCredits = resultado.reduce(
    (acc, acourse) => acc + acourse.SFRSTCR_CREDIT_HR,
    0
  );
  return {
    creditsSoFar,
    currentCredits: totalCredits,
    currentPGA: pga,
  };
}
