import { ErrorCode, RepositoryError } from "../common/errors";
import { AppLogger } from "../config/logger";
import { AcademicEnrollmentResponse } from "./entities/academic-enrollment";
import { PartialGradeRequest, PartialGradeResponse } from "./entities/partial-grades";
import { AxiosInstance } from "axios";

const myLogger = AppLogger.getAppLogger().createContextLogger("enrollment-api");

export class EnrollmentAPI {
  private username?: string;

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

  constructor(private axiosClient: AxiosInstance) {}

  private async fetchAcademicEnrollement(period: string): Promise<void> {
    const url = this.getCoursesUrl(period);
    try {
      const { data } = await this.axiosClient.get<AcademicEnrollmentResponse>(url);
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
    const url = "/notas-parciales";
    const body = this.getPartiaGradeBody(nrc, period);
    try {
      const { data } = await this.axiosClient.post<PartialGradeResponse>(url, body);
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

  private getCoursesUrl(period: string): string {
    if (this.username) {
      return `/matricula/user/${this.username}/periodo/${period}`;
    }

    throw new RepositoryError(
      "username must be set",
      ErrorCode.APPLICATION_INTEGRITY_ERROR
    );
  }

  private getPartiaGradeBody(nrc: string, period: string): PartialGradeRequest {
    if (this.username) {
      return {
        user: this.username,
        periodo: period,
        nrc,
      };
    }
    throw new RepositoryError(
      "username must be set",
      ErrorCode.APPLICATION_INTEGRITY_ERROR
    );
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

  setUserName(username: string): void {
    this.username = username;
  }
}
