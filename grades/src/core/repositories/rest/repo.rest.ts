/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { IGradesRepository } from "../repo.definition";
import {
  AEResponseToSemesterCourses,
  PGResponseToPartialComponents,
} from "./adapters/basic";
import { EnrollmentAPI } from "./enrollment-api";
import { AcademicSemester, PartialComponent } from "../../entities/courses";
import { addGradeRelatedInfoToSemesterCourses } from "../../domain-logic/course-utils";
import { getSemesterName } from "../../common/utils";

export class RestGradesRepository implements IGradesRepository {
  constructor(private readonly enrollmentAPI: EnrollmentAPI) {}

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

  async getAcademicSemester(period: string): Promise<AcademicSemester> {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment(period);
    const semesterCourses = AEResponseToSemesterCourses(academicEnrollment);
    const nrcs = semesterCourses.map((sc) => sc.id);
    const listOfPartialComponents = await this.getPartialComponentsOfAllNrc(
      nrcs,
      period
    );
    const semesterCoursesWithGradeInfo = await addGradeRelatedInfoToSemesterCourses(
      semesterCourses,
      listOfPartialComponents
    );

    const semesterName = getSemesterName(period);

    const academicSemester: AcademicSemester = {
      name: semesterName,
      courses: semesterCoursesWithGradeInfo,
    };

    return academicSemester;
  }

  setUserName(username: string): void {
    this.enrollmentAPI.setUserName(username);
  }
}
