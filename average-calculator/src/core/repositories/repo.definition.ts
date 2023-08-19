import { AcademicSemester } from "../entities/semester";
import { Course } from "../entities/course";
import { AcademicInfo } from "../entities/academic-info";

export interface ICalculatorRepository {
  getCurrentAcademicSemester(): Promise<AcademicSemester>;
  getCourse(courseIdentifier: string): Promise<Course>;
  getAcademicInfo(): Promise<AcademicInfo>;
}
