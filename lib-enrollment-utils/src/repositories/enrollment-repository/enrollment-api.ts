import { ErrorCode, RepositoryError } from "../../common/errors";
import { AppLogger } from "../logger";
import { AcademicEnrollmentResponse } from "./entities/academic-enrollment";
import { PartialGradeResponse } from "./entities/partial-grades";
import { EnrollmentRawDataClient } from "./enrollment-api.definition";

const myLogger = AppLogger.getAppLogger().createContextLogger("enrollment-api");

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

  private async fetchAcademicEnrollement(period: string): Promise<void> {
    try {
      const data = await this.rawDataClient.getCourses(period);
      this.academicEnrollment[period] = data;
    } catch (error) {
      // posible 500 error or no internet connection
      if (error instanceof Error) {
        myLogger.error("an error occurred while fetching academic enrollment", error);
      }
      throw new RepositoryError(
        "cannot get academic enrollment",
        ErrorCode.APPLICATION_INTEGRITY_ERROR
      );
    }
  }

  private async fetchPartialGrades(nrc: string, period: string): Promise<void> {
    try {
      const data = await this.rawDataClient.getPartialGrades(nrc, period);
      this.nrcToPartialGradeResponse[period] = {
        ...this.nrcToPartialGradeResponse[period],
        [nrc]: data,
      };
    } catch (error) {
      // posible 500 error or no internet connection
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

  async getAcademicEnrollment(period: string): Promise<AcademicEnrollmentResponse> {
    if (this.academicEnrollment[period] === undefined) {
      myLogger.info("academic enrollment not in cache, fetching from api");
      await this.fetchAcademicEnrollement(period);
    }
    // We can safely use the ! operator because we know
    // that the fetchAcademicEnrollement method will set
    // the academicEnrollment property or throw an error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.academicEnrollment[period]!;
  }

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.nrcToPartialGradeResponse[period]![nrc]!;
  }
}
