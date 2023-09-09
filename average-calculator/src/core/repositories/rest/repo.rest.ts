import { AcademicSemester } from "../../entities/semester";
import { Course } from "../../entities/course";
import { ICalculatorRepository } from "../repo.definition";
import { RepositoryError, ErrorCode } from "../../common/errors";
import { AcademicInfo } from "../../entities/academic-info";

export class RestCalculatorRepository implements ICalculatorRepository {
  private username?: string;

  private period?: string;

  async getAcademicInfo(): Promise<AcademicInfo> {
    throw new Error("Method not implemented.");
  }

  async getCurrentAcademicSemester(): Promise<AcademicSemester> {
    throw new Error("Method not implemented.");
  }

  async getCourse(courseIdentifier: string): Promise<Course> {
    throw new Error("Method not implemented.");
  }

  private getCoursesUrl() {
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

  setUserName(username: string): void {
    this.username = username;
  }

  setPeriod(period: string): void {
    this.period = period;
  }
}
