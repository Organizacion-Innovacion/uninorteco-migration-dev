export const APP_ENV_VARS = {
  logLevel: process.env.LOG_LEVEL ?? "warn",
  repositoryName: process.env.REPOSITORY_NAME ?? "InMemory",
  baseApiUrl: process.env.BASE_API_URL ?? "http://localhost:3000",
  username: process.env.USERNAME ?? "",
};
