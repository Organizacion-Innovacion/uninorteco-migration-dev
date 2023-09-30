/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { RestCourseRepository } from "@uninorte/enrollment-utils/repositories";
import { IGradesRepository } from "../repo.definition";
import { AcademicSemester } from "../../entities/courses";
import { getSemesterName } from "../../helpers";

export class RestGradesRepository implements IGradesRepository {
  constructor(private readonly coursesRepository: RestCourseRepository) {}

  async getAcademicSemester(period: string): Promise<AcademicSemester> {
    const courses = await this.coursesRepository.getCourses(period);

    const semesterName = getSemesterName(period);

    const academicSemester: AcademicSemester = {
      name: semesterName,
      courses: courses,
    };

    return academicSemester;
  }

  setUserName(username: string): void {
    this.coursesRepository.setUserName(username);
  }
}
