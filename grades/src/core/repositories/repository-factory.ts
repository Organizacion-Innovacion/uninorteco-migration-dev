/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import {
  EnrollmentRepository,
  RestCourseRepository,
} from "@uninorte/enrollment-utils/repositories";
import { APP_ENV_VARS } from "../config/app-env-vars";
import { IGradesRepository } from "./repo.definition";
import { RestGradesRepository } from "./rest/repo.rest";
import { axiosClient } from "../insfractructure/axios-client";

type RepositoryOptions = "InMemory" | "rest";

function getRepository(name: RepositoryOptions): IGradesRepository {
  if (name === "InMemory") {
    throw new Error("InMemory repository not implemented");
  }

  if (name === "rest") {
    const enrollmentRepo = new EnrollmentRepository(axiosClient);
    const coursesRepo = new RestCourseRepository(enrollmentRepo);
    return new RestGradesRepository(coursesRepo);
  }

  throw new Error("Repository not found");
}

export const gradesRepository: IGradesRepository = getRepository(
  APP_ENV_VARS.repositoryName as RepositoryOptions
);
