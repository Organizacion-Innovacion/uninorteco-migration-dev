import axios from "axios";
import { AppLogger } from "../config/logger";
import { JwtStore } from "./jwtStore";
import { APP_ENV_VARS } from "../config/app-env-vars";

const myLogger = AppLogger.getAppLogger().createContextLogger("axios-client");

export const axiosClient = axios.create({
  baseURL: APP_ENV_VARS.baseApiUrl,
  timeout: 5000,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await JwtStore.getJwtStore().getJwt();
    if (token !== "") {
      myLogger.debug("token successfully retrieved from jwt store");
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    myLogger.error("an error occurred while calling the api", error);
    return Promise.reject(error);
  }
);
