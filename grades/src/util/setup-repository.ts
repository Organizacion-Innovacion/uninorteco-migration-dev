import { APP_ENV_VARS } from "../core/config/app-env-vars";
import { AppLogger } from "../core/config/logger";
import { gradesRepository } from "../core/repositories/repository-factory";
import { RestGradesRepository } from "../core/repositories/rest/repo.rest";

const myLogger = AppLogger.getAppLogger().createContextLogger("repository-setup");

export function setupRepository() {
  if (APP_ENV_VARS.repositoryName === "rest") {
    myLogger.info("setting up rest repository");
    const repository = gradesRepository as RestGradesRepository;
    repository.setUserName(APP_ENV_VARS.username);
    myLogger.info("rest repository successfully set up", {
      username: APP_ENV_VARS.username,
    });
  }
}
