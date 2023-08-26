import { SemesterCourse } from "../../../core/entities/semester";
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
