import { ErrorCode, RepositoryError } from "../../common/errors";
import { AppLogger } from "../../config/logger";
import { axiosClient } from "./axios-client";
import { AcademicEnrollmentResponse } from "./entities/academic-enrollment";
import { PartialGradeRequest, PartialGradeResponse } from "./entities/partial-grades";

const myLogger = AppLogger.getAppLogger().createContextLogger("enrollment-api");

export class EnrollmentAPI {
  private username?: string;

  private period?: string;

  private academicEnrollment?: AcademicEnrollmentResponse;

  private nrcToPartialGradeResponse: {
    [nrc: string]: PartialGradeResponse | undefined;
  } = {};

  private async fetchAcademicEnrollement(): Promise<void> {
    const url = this.getCoursesUrl();
    try {
      const { data } = await axiosClient.get<AcademicEnrollmentResponse>(url);
      this.academicEnrollment = data;
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

  private async fetchPartialGrades(nrc: string): Promise<void> {
    const url = "/notas-parciales";
    const body = this.getPartiaGradeBody(nrc);
    try {
      const { data } = await axiosClient.post<PartialGradeResponse>(url, body);
      this.nrcToPartialGradeResponse[nrc] = data;
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

  private getCoursesUrl(): string {
    console.log(`username: ${this.username}, period: ${this.period}`);
    if (this.username && this.period) {
      return `/matricula/user/${this.username}/periodo/${this.period}`;
    }
    // if we cannot get the username and period, something really bad happened
    // and we cannot use the application
    throw new RepositoryError(
      "username and period must be set",
      ErrorCode.APPLICATION_INTEGRITY_ERROR
    );
  }

  private getPartiaGradeBody(nrc: string): PartialGradeRequest {
    if (this.username && this.period) {
      return {
        user: this.username,
        periodo: this.period,
        nrc,
      };
    }
    // if we cannot get the username and period, something really bad happened
    // and we cannot use the application
    throw new RepositoryError(
      "username and period must be set",
      ErrorCode.APPLICATION_INTEGRITY_ERROR
    );
  }

  async getAcademicEnrollment(): Promise<AcademicEnrollmentResponse> {
    if (!this.academicEnrollment) {
      await this.fetchAcademicEnrollement();
    }
    // We can safely use the ! operator because we know
    // that the fetchAcademicEnrollement method will set
    // the academicEnrollment property or throw an error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.academicEnrollment!;
  }

  async getPartialGradeResponseOfNrc(nrc: string): Promise<PartialGradeResponse> {
    if (!this.nrcToPartialGradeResponse[nrc]) {
      await this.fetchPartialGrades(nrc);
    }
    // We can safely use the ! operator because we know
    // that the fetchPartialGrades method will set
    // the nrcToPartialGradeResponse property or throw an error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.nrcToPartialGradeResponse[nrc]!;
  }

  setUserName(username: string): void {
    this.username = username;
  }

  setPeriod(period: string): void {
    this.period = period;
  }
}
