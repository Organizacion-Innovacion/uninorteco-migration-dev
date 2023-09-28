import log from "loglevel";
import { ILogger } from "./logger";

type LogLevelNames = "trace" | "debug" | "info" | "warn" | "error";

function isValidLogLevel(level: string): level is LogLevelNames {
  return ["trace", "debug", "info", "warn", "error"].includes(level);
}

export class LogLevelLogger implements ILogger {
  constructor(loglevel: string) {
    if (isValidLogLevel(loglevel)) {
      log.setLevel(loglevel);
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
