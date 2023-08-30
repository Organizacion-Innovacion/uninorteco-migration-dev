import { useState } from "react";

export interface ErrorSnackbarOptions {
  open: boolean;
  message: string;
}

export function useErrorSnackbar() {
  const [errorSnackbarOptions, setErrorSnackbarOptions] =
    useState<ErrorSnackbarOptions>({
      open: false,
      message: "",
    });

  const onCloseSnackbar = () => {
    setErrorSnackbarOptions({
      open: false,
      message: "",
    });
  };

  const onError = (message: string) => {
    setErrorSnackbarOptions({
      open: true,
      message,
    });
  };

  return {
    onError,
    onCloseSnackbar,
    errorSnackbarOptions,
  };
}
