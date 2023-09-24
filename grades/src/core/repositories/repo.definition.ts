import { AcademicSemester } from "../entities/courses";

export interface IGradesRepository {
  getAcademicSemester(period: string): Promise<AcademicSemester>;
}
