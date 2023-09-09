import { APP_ENV_VARS } from "../core/config/app-env-vars";
import { SemesterCourse } from "../core/entities/semester";

export function numberToString(n: number, precision = 2) {
  const roundNumber = Math.round(n * 10 ** precision) / 10 ** precision;
  return roundNumber.toFixed(precision);
}

/**
 * Sort courses by credits in descending order. Courses with more credits will be first.
 */
export function sortSemesterCoursesByCredits(courses: SemesterCourse[]) {
  return courses.sort((a, b) => {
    if (a.credits === b.credits) {
      return 0;
    }
    return a.credits > b.credits ? -1 : 1;
  });
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
