import { AcademicSemester, SemesterCourse } from "../../entities/semester";
import { Course } from "../../entities/course";
import { ICalculatorRepository } from "../repo.definition";
import { RepositoryError, ErrorCode } from "../../common/errors";
import { AcademicInfo } from "../../entities/academic-info";

export interface InMemoryCalculatorRepositoryOptions {
  responseDelay?: number;
}

type Options = Required<InMemoryCalculatorRepositoryOptions>;

async function sleep(time: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, time));
}

export class InMemoryCalculatorRepository implements ICalculatorRepository {
  private readonly options: Options = {
    responseDelay: 1000,
  };

  constructor(
    private readonly data: { [key: string]: any },
    private readonly repoOptions: InMemoryCalculatorRepositoryOptions = {}
  ) {
    this.options = { ...this.options, ...repoOptions };
  }

  async getAcademicInfo(): Promise<AcademicInfo> {
    await sleep(this.options.responseDelay);
    const { statusCode } = this.data;
    if (statusCode !== 200) {
      throw new RepositoryError(this.data.error, ErrorCode.INVALID_OPERATION);
    }
    const currentSemester = await this.getCurrentAcademicSemester();
    const totalCredits = currentSemester.courses.reduce(
      (acc: number, course: SemesterCourse) => acc + course.credits,
      0
    );

    const { currentPGA, creditsSoFar } = this.data;
    return Promise.resolve({
      currentPGA,
      creditsSoFar,
      currentCredits: totalCredits,
      currentSemesterAverage: 0,
    });
  }

  async getCurrentAcademicSemester(): Promise<AcademicSemester> {
    await sleep(this.options.responseDelay);
    const { statusCode } = this.data;
    if (statusCode !== 200) {
      throw new RepositoryError(this.data.error, ErrorCode.INVALID_OPERATION);
    }

    const { semester } = this.data;
    return Promise.resolve(semester);
  }

  async getCourse(courseIdentifier: string): Promise<Course> {
    await sleep(this.options.responseDelay);
    const { statusCode } = this.data;
    if (statusCode !== 200) {
      throw new RepositoryError(this.data.error, ErrorCode.INVALID_OPERATION);
    }

    const courses = this.data.courses as Course[];
    const course = courses.find((c) => c.id === courseIdentifier);
    if (!course) {
      throw new RepositoryError("El curso no fue encontrado", ErrorCode.NOT_FOUND);
    }

    return Promise.resolve(course);
  }
}
