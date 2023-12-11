import { PartialComponent } from "../entities";
import { Course } from "../entities/course";
import { computeFinalGradeOfCourse } from "./course-algorithms";

/**
 * The course status represents how well a student is doing in a course
 * in a specific point of the semester. The greater the number level,
 * the better the student is doing. none means the course cannot be classified.
 * Consumer must translate the status to a human-readable string.
 */
export type CourseStatus = "none" | "level-1" | "level-2" | "level-3";

/**
 * The partial component status represents how well a student did in a component,
 * same characteristics as {@link CourseStatus}.
 */
export type PartialComponentStatus = "none" | "level-1" | "level-2" | "level-3";

/**
 * Gets the course status based on the grade as a percentage.
 *
 * @param grade - The grade expressed as a percentage of the maximum possible grade
 * @returns The course status as a string.
 */
export function getCourseStatusFromGradeAsPercentage(grade: number): CourseStatus {
  if (grade < 60) {
    return "level-1";
  }
  if (grade < 70) {
    return "level-2";
  }

  return "level-3";
}

/**
 * Gets the component status based on the grade as a percentage.
 * So far it is the same logic as {@link getCourseStatusFromGradeAsPercentage}.
 *
 * @param grade - The grade expressed as a percentage of the maximum possible grade
 * @returns The partial component status.
 */
export function getComponentStatusFromGradeAsPercentage(
  grade: number
): PartialComponentStatus {
  return getCourseStatusFromGradeAsPercentage(grade);
}

/**
 * Calculates the total weight of all evaluated components in a course.
 * If the course has no components, the evaluated weight is 0.
 *
 * @param course - The course object containing the components.
 * @returns The total weight of evaluated components.
 */
export function getEvaluatedWeight(course: Course): number {
  const evaluatedWeight = course.components.reduce((acc, component) => {
    if (component.wasEvaluated) {
      return acc + component.weight;
    }
    return acc;
  }, 0);
  return evaluatedWeight;
}

/**
 * Calculates the status of a course based on its characteristics and grades.
 *
 * @param course - The course for which to determine the status.
 * @returns The status of the course.
 */
export function getCourseStatus(course: Course): CourseStatus {
  /* 
    we cannot classify a course if
    
    - it has only one component, becase the the course is evaluated 
    at the end of the semester. example: seminario de vida, proyecto de vida, ect
    - it has no components, because this may be an error or the course is not evaluated
    - it has an invalid grade, because we cannot compute the final grade
  */

  if (
    course.characteristics.has("one-component") ||
    course.characteristics.has("contain-invalid-grade") ||
    course.characteristics.has("no-components")
  ) {
    return "none";
  }

  const evaluatedWeight = getEvaluatedWeight(course);
  const maximumPossibleGrade = (5 * evaluatedWeight) / 100;
  const currentGrade = computeFinalGradeOfCourse(course);
  const gradeAsPercentage = (currentGrade / maximumPossibleGrade) * 100;
  const status = getCourseStatusFromGradeAsPercentage(gradeAsPercentage);
  return status;
}

/**
 * Calculates the status of a partial component based on the grade.
 * If the component was not evaluated, the status is "none".
 * The weight of the partial component does not have influence on the status.
 * See the following formula: (Pweight * grade / Pweight * 5), where Pweight is the weight of the partial component. Pweight cancels out.
 *
 * @param component - The partial component to calculate the status for.
 * @returns The status of the partial component.
 */
export function getPartialComponentStatus(
  component: PartialComponent
): PartialComponentStatus {
  if (!component.wasEvaluated) {
    return "none";
  }

  const gradeAsPercentage = (component.grade / 5) * 100;

  return getComponentStatusFromGradeAsPercentage(gradeAsPercentage);
}
