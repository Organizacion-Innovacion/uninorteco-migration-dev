import { AcademicSemester } from "../entities/semester";
import { Course } from "../entities/course";
import { ICalculatorRepository } from "./repo.definition";
import { APIError, ErrorCode } from "../common/errors";

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

  async getCurrentAcademicSemester(): Promise<AcademicSemester> {
    await sleep(this.options.responseDelay);
    const { statusCode } = this.data;
    if (statusCode !== 200) {
      throw new APIError(this.data.error, ErrorCode.INVALID_OPERATION);
    }

    const { semester } = this.data;
    return Promise.resolve(semester);
  }

  async getCourse(courseIdentifier: string): Promise<Course> {
    await sleep(this.options.responseDelay);
    const { statusCode } = this.data;
    if (statusCode !== 200) {
      throw new APIError(this.data.error, ErrorCode.INVALID_OPERATION);
    }

    const courses = this.data.courses as Course[];
    const course = courses.find((c) => c.id === courseIdentifier);
    if (!course) {
      throw new APIError("El curso no fue encontrado", ErrorCode.NOT_FOUND);
    }

    return Promise.resolve(course);
  }
}
