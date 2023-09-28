import { Course, CourseCharacteristic } from "../entities/course";

export function wasCourseEvaluated(course: Course): boolean {
  return course.components.every((component) => component.grade > 0);
}

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
 * Checks if a course contains only valid grades. this is necessary for the
 * calculator algorithms to work properly
 */
export function containOnlyValidGrades(course: Course): boolean {
  return !course.characteristics.has("contain-invalid-grade");
}

/**
 * Sort courses by credits in descending order. Courses with more credits will be first.
 */
export function sortSemesterCoursesByCredits(courses: Course[]) {
  return courses.sort((a, b) => {
    if (a.credits === b.credits) {
      return 0;
    }
    return a.credits > b.credits ? -1 : 1;
  });
}
