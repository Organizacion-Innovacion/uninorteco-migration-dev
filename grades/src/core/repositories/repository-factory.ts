/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { APP_ENV_VARS } from "../config/app-env-vars";
import { IGradesRepository } from "./repo.definition";
import { EnrollmentAPI } from "./rest/enrollment-api";
import { RestGradesRepository } from "./rest/repo.rest";

type RepositoryOptions = "InMemory" | "rest";

function getRepository(name: RepositoryOptions): IGradesRepository {
  if (name === "InMemory") {
    throw new Error("InMemory repository not implemented");
  }

  if (name === "rest") {
    const enrollmentAPI = new EnrollmentAPI();
    return new RestGradesRepository(enrollmentAPI);
  }

  throw new Error("Repository not found");
}

export const gradesRepository: IGradesRepository = getRepository(
  APP_ENV_VARS.repositoryName as RepositoryOptions
);
