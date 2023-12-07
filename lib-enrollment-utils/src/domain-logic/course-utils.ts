import { Course, CourseCharacteristic } from "../entities/course";

/**
 * Checks if a course was evaluated.
 *
 * @param course - The course to check.
 * @returns A boolean indicating whether the course was evaluated.
 */
export function wasCourseEvaluated(course: Course): boolean {
  return course.components.every((component) => component.wasEvaluated);
}

/**
 * Retrieves the characteristics of a course. Course characteristics may affect
 * how the final grade is computed. For example "Proyecto de vida" is a course
 * with zero credits which means is not considered for the weighted average.
 *
 * @param course - The course object.
 * @returns A set of course characteristics.
 */
export function getCourseCharacteristics(course: Course): Set<CourseCharacteristic> {
  const { credits, components } = course;

  const characteristics: Set<CourseCharacteristic> = new Set();

  if (credits === 0) {
    characteristics.add("zero-credits");
  }

  if (components.length === 0) {
    characteristics.add("no-components");
  }

  if (components.length === 1) {
    characteristics.add("one-component");
  }

  const invalidGradeExits = components.some((component) => component.grade === -1);

  if (invalidGradeExits) {
    characteristics.add("contain-invalid-grade");
  }

  return characteristics;
}

/**
 * Checks if a course contains only valid grades. This is necessary for the
 * average algorithms to work properly
 *
 * @param course - The course to check.
 * @returns A boolean indicating whether the course contains only valid grades.
 */
export function containOnlyValidGrades(course: Course): boolean {
  return !course.characteristics.has("contain-invalid-grade");
}

/**
 * Sort courses by credits in descending order. Courses with more credits will be first.
 *
 * @param courses - The courses to sort.
 * @returns The sorted courses.
 */
export function sortSemesterCoursesByCredits(courses: Course[]) {
  return courses.sort((a, b) => {
    if (a.credits === b.credits) {
      return 0;
    }
    return a.credits > b.credits ? -1 : 1;
  });
}
