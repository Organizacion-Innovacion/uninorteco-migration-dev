import { AcademicEnrollmentResponse } from "./entities/academic-enrollment";
import { PartialGradeResponse } from "./entities/partial-grades";

/**
 * Represents the client interface for retrieving enrollment raw data.
 * This allows the consumer to retrieve the raw data using any method they want.
 */
export interface EnrollmentRawDataClient {
  /**
   * Retrieves the academic enrollment response for a given period.
   * @param period - The period for which to retrieve the academic enrollment response.
   * @returns A promise that resolves to the academic enrollment response.
   */
  getAcademicEnrollmentResponse(period: string): Promise<AcademicEnrollmentResponse>;

  /**
   * Retrieves the partial grades for a given NRC and period.
   * @param nrc - The Course NRC for which to retrieve the partial grades.
   * @param period - The period for which to retrieve the partial grades.
   * @returns A promise that resolves to the partial grade response.
   */
  getPartialGrades(nrc: string, period: string): Promise<PartialGradeResponse>;
}
