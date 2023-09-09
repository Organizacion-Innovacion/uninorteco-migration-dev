export const APP_ENV_VARS = {
  logLevel: process.env.LOG_LEVEL ?? "warn",
  repositoryName: process.env.REPOSITORY_NAME ?? "InMemory",
  fakeDataFileName: process.env.FAKE_DATA_FILE_NAME ?? "normal",
  averageCalculatorBaseApiUrl: process.env.BASE_API_URL ?? "http://localhost:8080",
  username: process.env.USERNAME ?? "",
  period: process.env.PERIOD ?? "",
};
