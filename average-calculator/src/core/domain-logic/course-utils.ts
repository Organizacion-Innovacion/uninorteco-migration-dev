import { BaseCourse, CourseCharacteristic } from "../entities/base-course";
import { PartialComponent } from "../entities/course";
import { SemesterCourse } from "../entities/semester";

export function wasCourseEvaluated(components: PartialComponent[]): boolean {
  return components.every((component) => component.grade > 0);
}

export function getSemesterCourseCharacteristics(
  semesterCourse: SemesterCourse,
  components: PartialComponent[]
): Set<CourseCharacteristic> {
  const { credits } = semesterCourse;

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
export function containOnlyValidGrades(course: BaseCourse): boolean {
  return !course.characteristics.has("contain-invalid-grade");
}

export function getCourseParcelacionMessage(course: BaseCourse): string {
  const { characteristics } = course;

  if (
    characteristics.has("contain-invalid-grade") &&
    characteristics.has("one-component") &&
    characteristics.has("zero-credits")
  ) {
    return "Parcelación irrelevante";
  }

  if (characteristics.has("contain-invalid-grade")) {
    return "Parcelación corrupta";
  }

  return "Ver parcelación";
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
