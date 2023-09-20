import { LogLevelLogger } from "../core/config/loglevel";
import { AppLogger } from "../core/config/logger";

export function setupLogger(name = "") {
  const logLevelLogger = new LogLevelLogger();
  AppLogger.getAppLogger().setLogger(logLevelLogger);

  const myLogger = AppLogger.getAppLogger().createContextLogger("setup");
  myLogger.info(`app logger for ${name} created`);
}
