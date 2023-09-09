/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { APP_ENV_VARS } from "../config/app-env-vars";
import { ICalculatorRepository } from "./repo.definition";
import { InMemoryCalculatorRepository } from "./in-memory/repo.in-memory";
import { RestCalculatorRepository } from "./rest/repo.rest";

type RepositoryOptions = "InMemory" | "rest";

function getRepository(name: RepositoryOptions): ICalculatorRepository {
  if (name === "InMemory") {
    const data = require(`../../../fake-data/${APP_ENV_VARS.fakeDataFileName}.json`);
    const delay = data.delay ?? 1000;
    return new InMemoryCalculatorRepository(data, { responseDelay: delay });
  }

  if (name === "rest") {
    return new RestCalculatorRepository();
  }

  throw new Error("Repository not found");
}

export const calculatorRepository: ICalculatorRepository = getRepository(
  APP_ENV_VARS.repositoryName as RepositoryOptions
);
