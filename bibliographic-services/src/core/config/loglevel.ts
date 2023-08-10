import log from "loglevel";
import { APP_ENV_VARS } from "./app-env-vars";
import { ILogger } from "./logger";

type LogLevelNames = "trace" | "debug" | "info" | "warn" | "error";

function isValidLogLevel(level: string): level is LogLevelNames {
  return ["trace", "debug", "info", "warn", "error"].includes(level);
}

export class LogLevelLogger implements ILogger {
  constructor() {
    if (isValidLogLevel(APP_ENV_VARS.logLevel)) {
      log.setLevel(APP_ENV_VARS.logLevel);
    } else {
      log.setLevel("warn");
    }
  }

  error(message: string, meta: { [key: string]: any } = {}) {
    log.error(message, meta);
  }

  warn(message: string, meta: { [key: string]: any } = {}) {
    log.warn(message, meta);
  }

  info(message: string, meta: { [key: string]: any } = {}) {
    log.info(message, meta);
  }

  debug(message: string, meta: { [key: string]: any } = {}) {
    log.debug(message, meta);
  }
}
