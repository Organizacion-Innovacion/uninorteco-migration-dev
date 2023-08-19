import { usePageControl } from "@ellucian/experience-extension-utils";
import { BaseError } from "../core/common/errors";
import { AppLogger } from "../core/config/logger";

const myLogger = AppLogger.getAppLogger().createContextLogger("fatal-error-hook");

interface FatalErrorOptions {
  userMessage?: string;
  headerMessage?: string;
  iconName?: string;
  iconColor?: string;
  error?: BaseError;
}

const DEFAULT_ELLUCIAN_OPTIONS: Required<
  Omit<FatalErrorOptions, "userMessage" | "error">
> = {
  headerMessage: "Lo sentimos",
  iconName: "error",
  iconColor: "red",
};

const DEFAULT_USER_MESSAGE = "Ocurrió un error inesperado";

/**
 * Hook to replace the current page with ellucian error page
 *
 * userMessage has the following priority:
 * 1. userMessage from options
 * 2. userMessage from error object
 * 3. default userMessage (DEFAULT_USER_MESSAGE)
 *
 */
export function usePageFatalError() {
  const { setErrorMessage } = usePageControl();

  const setFatalError = ({ error, ...rest }: FatalErrorOptions) => {
    const { userMessage: userMessageOption, ...ellucianErrorOptions } = rest;

    let userMessage = DEFAULT_USER_MESSAGE;
    if (error) {
      userMessage = error.userMessage;
    }
    if (userMessageOption) {
      userMessage = userMessageOption;
    }

    const finalEllucianErrorOptions = {
      ...DEFAULT_ELLUCIAN_OPTIONS,
      ...ellucianErrorOptions,
    };

    if (error) {
      myLogger.error(error.message, {
        errorMessage: error.message,
        errorCode: error.errorCode,
        errorLevel: error.level,
      });
    }

    setErrorMessage({
      textMessage: userMessage,
      ...finalEllucianErrorOptions,
    });
  };

  return {
    setFatalError,
  };
}
