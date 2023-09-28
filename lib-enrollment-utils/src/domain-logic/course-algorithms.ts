import { InvalidInputError } from "../common/errors";
import { Course } from "../entities/course";
import { PartialComponent } from "../entities/partial-component";
import {
  computeWeightedAverage,
  computeNeededGrade,
  computeWeightedAverageGivenTotalWeight,
  computeMaximumGrade,
} from "./generic";

export function computeFinalGradeOfCourse(course: Course) {
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
