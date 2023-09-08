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
