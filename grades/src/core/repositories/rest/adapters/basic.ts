import { AppLogger } from "../../../config/logger";
import { SemesterCourse, PartialComponent } from "../../../entities/courses";
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
    wasEvaluated: false,
    // in this adapter we consider that there are no characteristics for the course
    characteristics: new Set(),
    components: [],
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
    name: pgComponent.SHRGCOM_NAME,
    weight: pgComponent.SHRGCOM_WEIGHT,
    grade,
    gradeAsString: gradeAsStr,
    wasEvaluated,
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
