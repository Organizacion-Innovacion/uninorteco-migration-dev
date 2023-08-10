import { AcademicSemester } from "../entities/semester";
import { Course } from "../entities/course";

export interface ICalculatorRepository {
  getCurrentAcademicSemester(): Promise<AcademicSemester>;
  getCourse(courseIdentifier: string): Promise<Course>;
}
