import { computeFinalGradeOfSemester } from "../../../domain-logic/semester-algorithms";
import { AcademicInfo } from "../../../entities/academic-info";
import { ICourseRepository } from "../../course-repository/courses.repo.definition";
import { AEResponseToSimplifiedAcademicInfo } from "../../enrollment-repository/adapters";
import { EnrollmentRepository } from "../../enrollment-repository/enrollment-api";
import { IAcademicInfoRepository } from "../academic-info.repo.definition";

export class AcademicInfoRepository implements IAcademicInfoRepository {
  constructor(
    private readonly enrollmentAPI: EnrollmentRepository,
    private readonly coursesRepository: ICourseRepository
  ) {}

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
