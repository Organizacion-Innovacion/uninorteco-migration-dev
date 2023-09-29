import { Course } from "../../entities/course";

export interface ICourseRepository {
  getCourse(courseIdentifier: string, period: string): Promise<Course>;
  getCourses(period: string): Promise<Course[]>;
}
