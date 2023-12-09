import { computeFinalGradeOfSemester } from "../../../domain-logic/semester-algorithms";
import { AcademicInfo } from "../../../entities/academic-info";
import { ICourseRepository } from "../../course-repository/courses.repo.definition";
import { AEResponseToSimplifiedAcademicInfo } from "../../enrollment-repository/adapters";
import { EnrollmentRepository } from "../../enrollment-repository/enrollment-api";
import { IAcademicInfoRepository } from "../academic-info.repo.definition";

/**
 * A repository that retrieves the academic information of an student
 * from the enrollment API.
 */
export class AcademicInfoRepository implements IAcademicInfoRepository {
  constructor(
    private readonly enrollmentAPI: EnrollmentRepository,
    private readonly coursesRepository: ICourseRepository
  ) {}

  /**
   * Retrieves the academic information of an student for a given period.
   *
   * @param period - The period for which to retrieve the academic information.
   * @returns A promise that resolves to the academic information.
   */
  async getAcademicInfo(period: string): Promise<AcademicInfo> {
    const academicEnrollment = await this.enrollmentAPI.getAcademicEnrollment(period);
    const simplifiedAcademicInfo =
      AEResponseToSimplifiedAcademicInfo(academicEnrollment);

    const courses = await this.coursesRepository.getCourses(period);
    const semesterAverage = computeFinalGradeOfSemester(courses);

    return {
      ...simplifiedAcademicInfo,
      currentSemesterAverage: semesterAverage,
    };
  }
}
