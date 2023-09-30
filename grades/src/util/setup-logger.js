import { AppLogger as RepoAppLogger } from "@uninorte/enrollment-utils/repositories";
import { AppLogger } from "../core/config/logger";
import { LogLevelLogger } from "../core/config/loglevel";

export function setupLogger(name = "") {
  const logLevelLogger = new LogLevelLogger();
  AppLogger.getAppLogger().setLogger(logLevelLogger);
  RepoAppLogger.getAppLogger().setLogger(logLevelLogger);

  const myLogger = AppLogger.getAppLogger().createContextLogger("setup");
  myLogger.info(`app logger for ${name} created`);
}
