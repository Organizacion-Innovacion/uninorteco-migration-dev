import { InvalidInputError } from "../common/errors";
import { Course } from "../entities/course";
import { PartialComponent } from "../entities/partial-component";
import {
  computeWeightedAverage,
  computeNeededGrade,
  computeWeightedAverageGivenTotalWeight,
  computeMaximumGrade,
} from "./generic";

/**
 * Computes the final grade of a course based on its components' grades and weights.
 * If the course contains an invalid grade, -1 is returned.
 * If the course has no components, 0 is returned.
 * The final grade is rounded to 1 decimal place.
 *
 * @param course - The course object containing components' grades and weights.
 * @returns The final grade of the course.
 */
export function computeFinalGradeOfCourse(course: Course) {
  if (course.characteristics.has("contain-invalid-grade")) {
    return -1;
  }

  const grades = course.components.map((component) => component.grade);
  const weights = course.components.map((component) => component.weight);

  if (grades.length === 0 && weights.length === 0) {
    return 0;
  }

  const average = computeWeightedAverage(grades, weights);
  // round to 1 decimal place
  const finalGrade = Math.round(average * 10) / 10;
  return finalGrade;
}

/**
 * Computes the needed grade for a course. Explanation about the needed grade can
 * be found in the {@link computeNeededGrade} generic function.
 *
 * @param course - The course object containing the components and their grades.
 * @param desiredGrade - The desired grade for the course.
 * @returns The needed grade to achieve the desired grade in the course.
 * @throws {@link InvalidInputError} If all components of the course are locked.
 */
export function computeNeededGradeForCourse(
  course: Course,
  desiredGrade: number
): number {
  // compute average for locked components
  const lockedComponents = course.components.filter((component) => component.isLocked);

  if (lockedComponents.length === course.components.length) {
    throw new InvalidInputError(
      "Lo sentimos, debes tener al menos un componente desbloqueado para realizar el cálculo"
    );
  }

  const lockedGrades = lockedComponents.map((component) => component.grade);
  const lockedWeights = lockedComponents.map((component) => component.weight);

  // this is the current grade
  const currentGrade = computeWeightedAverageGivenTotalWeight(
    lockedGrades,
    lockedWeights,
    100
  );
  const currentGradeRounded = Math.ceil(currentGrade * 10) / 10;

  const unlockedWeights = course.components
    .filter((component) => !component.isLocked)
    .map((component) => component.weight);

  const maxPossibleGrade = computeMaximumGrade(
    lockedGrades,
    lockedWeights,
    unlockedWeights
  );
  const roundedMaxPossibleGrade = Math.ceil(maxPossibleGrade * 10) / 10;

  // Compute the remaining weight
  const remainingWeightAsPercentage = 100 - lockedWeights.reduce((a, b) => a + b, 0);
  const remainingWeight = remainingWeightAsPercentage / 100;

  // compute the needed grade
  const neededGrade = computeNeededGrade(
    desiredGrade,
    currentGrade,
    remainingWeight,
    0.05,
    { maxGrade: roundedMaxPossibleGrade, minGrade: currentGradeRounded }
  );
  const roundedNeededGrade = Math.ceil(neededGrade * 10) / 10;

  // it is possible to get a grade of 5.1 because we are ceiling the number.
  // we can safely round it to 5 and will still satisfy the desired grade
  if (roundedNeededGrade === 5.1) {
    return 5;
  }

  return roundedNeededGrade;
}

/**
 * Replaces the grade of unlocked components in an array of partial components.
 *
 * @param components - The array of partial components.
 * @param grade - The new grade to replace with.
 * @returns A new array of partial components with the grade replaced for
 * unlocked components.
 */
export function replaceGradeOfUnLockedComponents(
  components: PartialComponent[],
  grade: number
) {
  const newComponents = components.map((component) => {
    if (!component.isLocked) {
      return { ...component, grade };
    }
    return component;
  });
  return newComponents;
}
