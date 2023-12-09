/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

import { ErrorCode, RepositoryError } from "../../../common/errors";
import { AppLogger } from "../../logger";
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

/**
 * Repository that retrieves courses from the enrollment API.
 */
export class RestCourseRepository implements ICourseRepository {
  constructor(private readonly enrollmentAPI: EnrollmentRepository) {}

  /**
   * Retrieves the partial components of all NRCs for a given period.
   *
   * @param nrc - An array of NRCs
   * @param period - The period for which to retrieve the partial components.
   * @returns A promise that resolves to a 2D array of partial components for each NRC.
   */
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

  /**
   * Retrieves the courses for a given period, including their partial components
   * and grade information.
   *
   * @param period - The period for which to retrieve the courses.
   * @returns A promise that resolves to an array of courses with their partial
   * components and grade information.
   */
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

  /**
   * Retrieves a specific course for a given period, including its
   * partial components and grade information.
   *
   * @param courseIdentifier - The identifier of the course to retrieve.
   * @param period - The period for which to retrieve the course.
   * @returns A promise that resolves to the course with its partial components
   * and grade information.
   * @throws {@link RepositoryError} if the course is not found or if no partial components are found for the course.
   */
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
}
