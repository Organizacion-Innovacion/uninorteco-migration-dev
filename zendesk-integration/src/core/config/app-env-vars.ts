export const APP_ENV_VARS = {
  logLevel: process.env.LOG_LEVEL ?? "warn",
  apiBaseUrl: process.env.BASE_API_URL ?? "http://localhost:8080/",
};
