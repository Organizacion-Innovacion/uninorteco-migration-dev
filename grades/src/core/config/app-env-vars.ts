export const APP_ENV_VARS = {
  logLevel: process.env.LOG_LEVEL ?? "warn",
  repositoryName: process.env.REPOSITORY_NAME ?? "InMemory",
  averageCalculatorBaseApiUrl: process.env.BASE_API_URL ?? "http://localhost:8080",
  username: process.env.USERNAME ?? "",
};
