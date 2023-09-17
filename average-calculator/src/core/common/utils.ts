import { APP_ENV_VARS } from "../config/app-env-vars";

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function getCurrentPeriod() {
  if (APP_ENV_VARS.period) {
    return APP_ENV_VARS.period;
  }
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const period = month <= 7 ? "10" : "30";
  return `${year}${period}`;
}

export function getSemesterName(period: string) {
  const year = period.slice(0, 4);
  const periodType = period.slice(4);
  const periodName = periodType === "10" ? "I" : "II";
  return `Semestre ${year}-${periodName}`;
}
