export type ErrorLevel = "domain" | "repository" | "presentation";

export enum ErrorCode {
  INVALID_INPUT = "invalid-input",
  INVALID_ID = "invalid-id",
  INVALID_LOGIC = "invalid-logic",
  INVALID_OPERATION = "invalid-operation",
  DUPLICATED_RECORD = "duplicated-record",
  ID_NOT_PROVIDED = "id-not-provided",
  NOT_FOUND = "not-found",
  UNAUTHORIZED = "unauthorized",
  FORBIDDEN = "forbidden",
  APPLICATION_INTEGRITY_ERROR = "application-integrity-error",
}

export interface BaseErrorParams {
  [key: string]: any;
}

export class BaseError extends Error {
  public userMessage: string;

  constructor(
    userMessage: string,
    public errorCode: ErrorCode,
    public level: ErrorLevel,
    public errorParams: BaseErrorParams = {}
  ) {
    super(`[${new Date().toISOString()}] - [${level}] ${userMessage}`);

    this.userMessage = userMessage;
  }
}

export class RepositoryError extends BaseError {
  constructor(
    message: string,
    errorCode: ErrorCode,
    errorParams: BaseErrorParams = {}
  ) {
    super(message, errorCode, "repository", errorParams);
  }
}

export class DomainError extends BaseError {
  constructor(
    message: string,
    errorCode: ErrorCode,
    errorParams: BaseErrorParams = {}
  ) {
    super(message, errorCode, "domain", errorParams);
  }
}

export interface InvalidInputErrorParams extends BaseErrorParams {
  fieldName?: string;
}

export class InvalidInputError extends DomainError {
  constructor(message: string, errorParams: InvalidInputErrorParams = {}) {
    super(message, ErrorCode.INVALID_INPUT, errorParams);
  }
}
