/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { APP_ENV_VARS } from "../config/app-env-vars";
import { ICalculatorRepository } from "./repo.definition";
import { InMemoryCalculatorRepository } from "./repo.in-memory";

type RepositoryOptions = "InMemory";

function getRepository(name: RepositoryOptions): ICalculatorRepository {
  if (name === "InMemory") {
    const {
      semester,
      courses,
    } = require(`../../../fake-data/${APP_ENV_VARS.fakeDataFileName}.json`);
    return new InMemoryCalculatorRepository(courses, semester);
  }
  throw new Error("Repository not found");
}

export const calculatorRepository: ICalculatorRepository = getRepository(
  APP_ENV_VARS.repositoryName as RepositoryOptions
);
