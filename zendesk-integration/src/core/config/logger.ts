/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
export type LoggerFunc = (message: string, meta?: { [key: string]: any }) => void;

export interface ILogger {
  error: LoggerFunc;
  warn: LoggerFunc;
  info: LoggerFunc;
  debug: LoggerFunc;
}
// Singleton pattern
export class AppLogger {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private static _instance: AppLogger;

  private logger!: ILogger;

  public static getAppLogger(): AppLogger {
    if (!this._instance) this._instance = new AppLogger();

    return this._instance;
  }

  setLogger(logger: ILogger) {
    this.logger = logger;
  }

  getLogger(): ILogger {
    return this.logger;
  }

  createContextLogger(context: string): ILogger {
    const myLogger: ILogger = {
      error: (message, meta) => {
        this.logger.error(`${context}: ${message}`, meta);
      },
      warn: (message, meta) => {
        this.logger.warn(`${context}: ${message}`, meta);
      },
      info: (message, meta) => {
        this.logger.info(`${context}: ${message}`, meta);
      },
      debug: (message, meta) => {
        this.logger.debug(`${context}: ${message}`, meta);
      },
    };
    return myLogger;
  }
}
