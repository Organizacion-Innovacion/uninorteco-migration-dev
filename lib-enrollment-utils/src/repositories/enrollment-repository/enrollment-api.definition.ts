import { AcademicEnrollmentResponse } from "./entities/academic-enrollment";
import { PartialGradeResponse } from "./entities/partial-grades";

export interface EnrollmentRawDataClient {
  getCourses(period: string): Promise<AcademicEnrollmentResponse>;
  getPartialGrades(nrc: string, period: string): Promise<PartialGradeResponse>;
}
