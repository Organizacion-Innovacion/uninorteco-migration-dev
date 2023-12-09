/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ErrorCode, RepositoryError } from "../../common/errors";
import { AppLogger } from "../logger";
import { AcademicEnrollmentResponse } from "./entities/academic-enrollment";
import { PartialGradeResponse } from "./entities/partial-grades";
import { EnrollmentRawDataClient } from "./enrollment-api.definition";

const myLogger = AppLogger.getAppLogger().createContextLogger("enrollment-api");

/**
 * The enrollment repository is responsible for fetching the student's
 * academic enrollment and partial grades from the API and caching them.
 */
export class EnrollmentRepository {
  private academicEnrollment: {
    [period: string]: AcademicEnrollmentResponse | undefined;
  } = {};

  private nrcToPartialGradeResponse: {
    [period: string]:
      | {
          [nrc: string]: PartialGradeResponse | undefined;
        }
      | undefined;
  } = {};

  constructor(private rawDataClient: EnrollmentRawDataClient) {}

  /**
   * Fetches the academic enrollment for a specific period.
   *
   * @param period - The period for which to fetch the academic enrollment.
   * ex: 202310, 202330
   * @throws {@link RepositoryError} if the academic enrollment cannot be fetched.
   */
  private async fetchAcademicEnrollement(period: string): Promise<void> {
    try {
      const data = await this.rawDataClient.getAcademicEnrollmentResponse(period);
      this.academicEnrollment[period] = data;
    } catch (error) {
      // possible 500 error or no internet connection
      if (error instanceof Error) {
        myLogger.error("an error occurred while fetching academic enrollment", error);
      }
      throw new RepositoryError(
        "cannot get academic enrollment",
        ErrorCode.APPLICATION_INTEGRITY_ERROR
      );
    }
  }

  /**
   * Fetches the partial grades for a specific NRC and period.
   *
   * @param nrc - The Course NRC for which to fetch the partial grades.
   * @param period - The period for which to fetch the partial grades.
   * @throws {@link RepositoryError} if the partial grades cannot be fetched.
   */
  private async fetchPartialGrades(nrc: string, period: string): Promise<void> {
    try {
      const data = await this.rawDataClient.getPartialGrades(nrc, period);
      this.nrcToPartialGradeResponse[period] = {
        ...this.nrcToPartialGradeResponse[period],
        [nrc]: data,
      };
    } catch (error) {
      // possible 500 error or no internet connection
      if (error instanceof Error) {
        myLogger.error("an error occurred while fetching the partial grades", {
          nrc: nrc,
          error: error,
        });
      }
      throw new RepositoryError(
        "cannot get partial grades",
        ErrorCode.APPLICATION_INTEGRITY_ERROR,
        { nrc: nrc }
      );
    }
  }

  /**
   * Retrieves the academic enrollment for a specific period.
   * If the academic enrollment is not in the cache, it will be fetched from the API.
   *
   * @param period - The period for which to retrieve the academic enrollment.
   * @returns The academic enrollment response.
   */
  async getAcademicEnrollment(period: string): Promise<AcademicEnrollmentResponse> {
    if (this.academicEnrollment[period] === undefined) {
      myLogger.info("academic enrollment not in cache, fetching from api");
      await this.fetchAcademicEnrollement(period);
    }
    // We can safely use the ! operator because we know
    // that the fetchAcademicEnrollement method will set
    // the academicEnrollment property or throw an error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.academicEnrollment[period]!;
  }

  /**
   * Retrieves the partial grade response for a specific NRC and period.
   * If the partial grade is not in the cache, it will be fetched from the API.
   *
   * @param nrc - The NRC for which to retrieve the partial grade response.
   * @param period - The period for which to retrieve the partial grade response.
   * @returns The partial grade response.
   */
  async getPartialGradeResponseOfNrc(
    nrc: string,
    period: string
  ): Promise<PartialGradeResponse> {
    if (this.nrcToPartialGradeResponse?.[period]?.[nrc] === undefined) {
      myLogger.info("partial grade not in cache, fetching from api");
      await this.fetchPartialGrades(nrc, period);
    }
    // We can safely use the ! operator because we know
    // that the fetchPartialGrades method will set
    // the nrcToPartialGradeResponse property or throw an error
    return this.nrcToPartialGradeResponse[period]![nrc]!;
  }
}
