import { getCurrentPeriod } from "../core/common/utils";
import { APP_ENV_VARS } from "../core/config/app-env-vars";
import { AppLogger } from "../core/config/logger";
import { calculatorRepository } from "../core/repositories/repository-factory";
import { RestCalculatorRepository } from "../core/repositories/rest/repo.rest";

const myLogger = AppLogger.getAppLogger().createContextLogger("repository-setup");

export function setupRepository() {
  if (APP_ENV_VARS.repositoryName === "rest") {
    myLogger.info("setting up rest repository");
    const repository = calculatorRepository as RestCalculatorRepository;
    const currentPeriod = getCurrentPeriod();
    repository.setPeriod(currentPeriod);
    repository.setUserName(APP_ENV_VARS.username);
    myLogger.info("rest repository successfully set up", {
      currentPeriod,
      username: APP_ENV_VARS.username,
    });
  }
}
