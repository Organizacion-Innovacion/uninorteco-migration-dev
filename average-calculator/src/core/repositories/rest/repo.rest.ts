/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { AcademicSemester, SemesterCourse } from "../../entities/semester";
import { Course, PartialComponent } from "../../entities/course";
import { ICalculatorRepository } from "../repo.definition";
import { RepositoryError, ErrorCode } from "../../common/errors";
import { AcademicInfo } from "../../entities/academic-info";
import {
  AEResponseToSimplifiedAcademicInfo,
  AEResponseToSemesterCourses,
  PGResponseToPartialComponents,
} from "./adapters/basic";
import { AppLogger } from "../../config/logger";
import { getSemesterCourseType, wasSemesterCourseEvaluated } from "./adapters/utils";
import { calculatorFacade } from "../../domain-logic/facade";
import { getSemesterName } from "../../../util/helpers";
import { EnrollmentAPI } from "./enrollment-api";

const myLogger = AppLogger.getAppLogger().createContextLogger("rest-repo");

export class RestCalculatorRepository implements ICalculatorRepository {
  private period?: string;

  constructor(private readonly enrollmentAPI: EnrollmentAPI) {}

  private async addGradeRelatedInfoToSemesterCourses(
    semesterCourses: SemesterCourse[],
    listOfPartialComponents: PartialComponent[][]
  ): Promise<SemesterCourse[]> {
    return semesterCourses.map((sc, index) => {
      const pcs = listOfPartialComponents[index];
      const wasEvaluated = wasSemesterCourseEvaluated(pcs);
      const courseType = getSemesterCourseType(sc, pcs);
      const currentGrade = calculatorFacade.courseFinalGrade(pcs);

      return {
        ...sc,
        wasEvaluated,
        isLocked: wasEvaluated,
        courseType,
        grade: currentGrade,
      };
    });
  }

  private async getPartialComponentsOfAllNrc(
    nrc: string[]
  ): Promise<PartialComponent[][]> {
    // Cannot use for each because it is async
    // Cannot use Promise.all because it will stop on the first error and
    // we need to get all the partial grades even if one of them fails

    const listOfPartialComponents = [];

    for (const n of nrc) {
      try {
        const partialGradeResponse =
          await this.enrollmentAPI.getPartialGradeResponseOfNrc(n);
        const partialComponent = PGResponseToPartialComponents(partialGradeResponse);
        listOfPartialComponents.push(partialComponent);
      } catch (error) {
        listOfPartialComponents.push([]);
      }
    }

    return listOfPartialComponents;
  }

  async getCurrentAcademicSemester(): Promise<AcademicSemester> {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment();
    const semesterCourses = AEResponseToSemesterCourses(academicEnrollment);
    const nrcs = semesterCourses.map((sc) => sc.id);
    const listOfPartialComponents = await this.getPartialComponentsOfAllNrc(nrcs);
    const semesterCoursesWithGradeInfo =
      await this.addGradeRelatedInfoToSemesterCourses(
        semesterCourses,
        listOfPartialComponents
      );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const semesterName = getSemesterName(this.period!);

    return {
      name: semesterName,
      courses: semesterCoursesWithGradeInfo,
    };
  }

  async getCourse(courseIdentifier: string): Promise<Course> {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment();
    const semesterCourses = AEResponseToSemesterCourses(academicEnrollment);
    const semesterCourse = semesterCourses.find((sc) => sc.id === courseIdentifier);

    if (!semesterCourse) {
      myLogger.error("course not found in academic enrollment response", {
        nrc: courseIdentifier,
      });
      throw new RepositoryError("El curso no fue encontrado", ErrorCode.NOT_FOUND);
    }
    const courseName = semesterCourse.name;

    const partialGradeResponse = await this.enrollmentAPI.getPartialGradeResponseOfNrc(
      courseIdentifier
    );
    const partialComponents = PGResponseToPartialComponents(partialGradeResponse);

    // partialComponents empty means that the course has no partial grades
    if (partialComponents.length === 0) {
      myLogger.error("no partial components found in partial grades response", {
        nrc: courseIdentifier,
      });
      throw new RepositoryError(
        "No se pudo obtener las notas parciales del curso",
        ErrorCode.NOT_FOUND,
        { nrc: courseIdentifier }
      );
    }

    return {
      id: courseIdentifier,
      name: courseName,
      components: partialComponents,
    };
  }

  async getAcademicInfo(): Promise<AcademicInfo> {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment();
    const simplifiedAcademicInfo =
      AEResponseToSimplifiedAcademicInfo(academicEnrollment);

    const academicSemester = await this.getCurrentAcademicSemester();
    const currentSemesterAverage = calculatorFacade.semesterFinalGrade(
      academicSemester.courses
    );

    return {
      ...simplifiedAcademicInfo,
      currentSemesterAverage,
    };
  }

  setUserName(username: string): void {
    this.enrollmentAPI.setUserName(username);
  }

  setPeriod(period: string): void {
    this.period = period;
    this.enrollmentAPI.setPeriod(period);
  }
}
