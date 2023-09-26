import axios from "axios";
import { AppLogger } from "../config/logger";
import { APP_ENV_VARS } from "../config/app-env-vars";

const myLogger = AppLogger.getAppLogger().createContextLogger("axios-client");

export const axiosClient = axios.create({
  baseURL: APP_ENV_VARS.finalExamBaseApiUrl,
  timeout: 5000,
});


axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    myLogger.error("an error occurred while calling the api", error);
    return Promise.reject(error);
  }
);