import { SemesterCourse } from "../entities/courses";

export interface IGradesRepository {
  getCourses(period: string): Promise<SemesterCourse[]>;
}
