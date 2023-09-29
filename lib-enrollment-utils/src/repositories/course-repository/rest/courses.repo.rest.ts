/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { ErrorCode, RepositoryError } from "../../../common/errors";
import { AppLogger } from "../../../config/logger";
import { computeFinalGradeOfCourse } from "../../../domain-logic/course-algorithms";
import {
  getCourseCharacteristics,
  wasCourseEvaluated,
} from "../../../domain-logic/course-utils";
import { Course } from "../../../entities/course";
import { PartialComponent } from "../../../entities/partial-component";
import {
  PGResponseToPartialComponents,
  AEResponseToCourses,
} from "../../enrollment-repository/adapters";
import { EnrollmentRepository } from "../../enrollment-repository/enrollment-api";
import { ICourseRepository } from "../courses.repo.definition";

const myLogger = AppLogger.getAppLogger().createContextLogger("courses-rest-repo");

export function addGradeRelatedInfoToCourse(course: Course): Course {
  const wasEvaluated = wasCourseEvaluated(course);
  const characteristics = getCourseCharacteristics(course);

  const finalGrade = computeFinalGradeOfCourse(course);

  return {
    ...course,
    grade: finalGrade,
    wasEvaluated,
    isLocked: wasEvaluated,
    characteristics,
  };
}

export class RestCourseRepository implements ICourseRepository {
  constructor(private readonly enrollmentAPI: EnrollmentRepository) {}

  private async getPartialComponentsOfAllNrc(
    nrc: string[],
    period: string
  ): Promise<PartialComponent[][]> {
    // Cannot use for each because it is async
    // Cannot use Promise.all because it will stop on the first error and
    // we need to get all the partial grades even if one of them fails

    const listOfPartialComponents = [];

    for (const n of nrc) {
      try {
        const partialGradeResponse =
          await this.enrollmentAPI.getPartialGradeResponseOfNrc(n, period);
        const partialComponent = PGResponseToPartialComponents(partialGradeResponse);
        listOfPartialComponents.push(partialComponent);
      } catch (error) {
        listOfPartialComponents.push([]);
      }
    }

    return listOfPartialComponents;
  }

  async getCourses(period: string): Promise<Course[]> {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment(period);
    const courses = AEResponseToCourses(academicEnrollment);
    const nrcs = courses.map((sc) => sc.id);
    const listOfPartialComponents = await this.getPartialComponentsOfAllNrc(
      nrcs,
      period
    );
    const coursesWithComponents = courses.map((sc, index) => {
      const partialComponents = listOfPartialComponents[index];
      const courseWithComponents = {
        ...sc,
        components: partialComponents,
      };
      return courseWithComponents;
    });
    const coursesWithGradeInfo = coursesWithComponents.map(addGradeRelatedInfoToCourse);

    return coursesWithGradeInfo;
  }

  async getCourse(courseIdentifier: string, period: string): Promise<Course> {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment(period);
    const courses = AEResponseToCourses(academicEnrollment);
    const course = courses.find((sc) => sc.id === courseIdentifier);

    if (!course) {
      myLogger.error("course not found in academic enrollment response", {
        nrc: courseIdentifier,
      });
      throw new RepositoryError("El curso no fue encontrado", ErrorCode.NOT_FOUND);
    }

    const partialGradeResponse = await this.enrollmentAPI.getPartialGradeResponseOfNrc(
      courseIdentifier,
      period
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

    const courseWithComponents = {
      ...course,
      components: partialComponents,
    };

    const courseWithGradeInfo = addGradeRelatedInfoToCourse(courseWithComponents);

    return courseWithGradeInfo;
  }

  setUserName(username: string): void {
    this.enrollmentAPI.setUserName(username);
  }
}
