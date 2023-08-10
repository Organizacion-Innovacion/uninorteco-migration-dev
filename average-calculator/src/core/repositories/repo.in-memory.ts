import { AcademicSemester } from "../entities/semester";
import { Course } from "../entities/course";
import { ICalculatorRepository } from "./repo.definition";
import { APIError, ErrorCode } from "../common/errors";

export class InMemoryCalculatorRepository implements ICalculatorRepository {
  private courses: Course[];

  private semester: AcademicSemester;

  constructor(courses: Course[], semester: AcademicSemester) {
    this.courses = courses;
    this.semester = semester;
  }

  getCurrentAcademicSemester(): Promise<AcademicSemester> {
    return Promise.resolve(this.semester);
  }

  getCourse(courseIdentifier: string): Promise<Course> {
    const course = this.courses.find((c) => c.id === courseIdentifier);

    if (!course) {
      throw new APIError("Course not found", ErrorCode.NOT_FOUND);
    }

    return Promise.resolve(course);
  }
}
