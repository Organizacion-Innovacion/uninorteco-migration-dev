import { DomainError, ErrorCode, InvalidInputError } from "../common/errors";

/**
 * Validates a grade to ensure it is within the range of 0 to 5.
 *
 * @param grade - The grade to validate.
 * @throws {@link DomainError} If the grade is not within the range of 0 to 5.
 */
export function validateGrade(grade: number): void {
  if (grade < 0 || grade > 5) {
    throw new DomainError(
      "Lo sentimos, pero la nota debe estar entre 0 y 5",
      ErrorCode.INVALID_INPUT
    );
  }
}

/**
 * Checks if the grades and weights arrays have values greater than 0.
 *
 * @param grades - The array of grades.
 * @param weights - The array of weights.
 * @throws {@link DomainError} - If either the grades or weights array is empty.
 */
function checkGradesAndWeightsGt0(grades: number[], weights: number[]): void {
  if (grades.length === 0 || weights.length === 0) {
    throw new DomainError(
      "Las notas y los pesos no pueden estar vacíos",
      ErrorCode.INVALID_LOGIC
    );
  }
}

/**
 * Checks if the lengths of the grades and weights arrays are equal.
 *
 * @param grades - The array of grades.
 * @param weights - The array of weights.
 * @throws {@link DomainError} - If the lengths of grades and weights are not equal.
 */
function checkGradesAndWeightsLenght(grades: number[], weights: number[]): void {
  if (grades.length !== weights.length) {
    throw new DomainError(
      "Las notas y los pesos deben tener la misma longitud",
      ErrorCode.INVALID_LOGIC
    );
  }
}

/**
 * Given a list of grades and a list of weights, compute the weighted average.
 *
 * @param grades - The list of grades. grades are between 0 and 5
 * @param weights - The list of weights. weigths can be any number, but they must be positive
 * @returns the weighted average
 */
export function computeWeightedAverage(grades: number[], weights: number[]): number {
  checkGradesAndWeightsLenght(grades, weights);
  checkGradesAndWeightsGt0(grades, weights);

  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  const weightedSum = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + grade * weight;
  }, 0);

  return weightedSum / totalWeight;
}

/**
 * Given a list of grades and a list of weights, compute the weighted average.
 * This function is different from {@link computeWeightedAverage} because it takes the total weight as a parameter. This is useful when you want to compute the weighted average of a subset of components.
 *
 * Both grades and weights can be empty.
 *
 * @param grades - The list of grades. grades are between 0 and 5.
 * @param weights - The list of weights. weigths can be any number, but they must be positive
 * @param totalWeight - The total weight of the components
 * @returns The weighted average
 */
export function computeWeightedAverageGivenTotalWeight(
  grades: number[],
  weights: number[],
  totalWeight: number
): number {
  checkGradesAndWeightsLenght(grades, weights);

  if (totalWeight <= 0) {
    throw new DomainError("El peso total debe ser mayor a 0", ErrorCode.INVALID_LOGIC);
  }

  const weightedSum = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + grade * weight;
  }, 0);

  return weightedSum / totalWeight;
}

export type NeededGradeOptions = {
  maxGrade?: number;
  minGrade?: number;
};

/**
 * Compute the needed grade to obtain a desired final grade. The needed grade can be explained as follows:
 *
 * Given my current grade, a desired final grade and the remaining percentage of the course/semester to be evaluated, what is the grade I need in the remaining components to obtain the necessary points to raise my current grade to the desired final grade?
 *
 * @param desiredGrade - The desired final grade of the course/semester
 * @param currentGrade - The current grade of the course/semester
 * @param remainingWeight - The remaining weight of the course/semester to be evaluated. Weight is a number between 0 and 1.
 * @param offset - A small number to avoid throwing an error of imposible to reach the desired grade, but the grade is actually possible to reach. This happen when you are too near to the maximum grade posible of a component.
 * @returns The grade I need in the remaining components to obtain the necessary points to raise my current grade to the desired final grade
 * @throws {@link InvalidInputError} - If the desired grade is less than the current grade
 * @throws {@link InvalidInputError} - If the desired grade is greater than the maximum grade posible
 */
export function computeNeededGrade(
  desiredGrade: number,
  currentGrade: number,
  remainingWeight: number,
  offset = 0.05,
  options: NeededGradeOptions = {}
): number {
  if (remainingWeight === 0) {
    // if remaining weight is 0 is because we did not perform validations
    // on above layers. Posible errors can be an unlocked component with zero weight
    // which should not be possible
    throw new DomainError("El peso restante no puede ser 0", ErrorCode.INVALID_LOGIC);
  }

  if (desiredGrade < currentGrade) {
    const minGradeDefined = options.minGrade !== undefined;
    const errorFields = {
      fieldName: "desiredGrade",
      ...(minGradeDefined && { minGrade: options.minGrade }),
    };

    const errorMessage = minGradeDefined
      ? `Tu nota actual es ${options.minGrade}. Desear algo menor a esto no tiene sentido`
      : "Lo sentimos, pero la nota deseada causa que tus componentes restantes se vuelvan negativos";

    throw new InvalidInputError(errorMessage, errorFields);
  }

  const neededGradePoints = desiredGrade - currentGrade;

  if (neededGradePoints > 5 * remainingWeight + offset) {
    const maxGradeDefined = options.maxGrade !== undefined;
    const errorFields = {
      fieldName: "desiredGrade",
      ...(maxGradeDefined && { maxGrade: options.maxGrade }),
    };

    const errorMessage = maxGradeDefined
      ? `Tu máxima nota alcanzable es ${options.maxGrade}. Lo que deseas es imposible`
      : "Lo sentimos, La nota deseada no puede ser alcanzada";

    throw new InvalidInputError(errorMessage, errorFields);
  }

  return neededGradePoints / remainingWeight;
}

/**
 * Compute the lost points using the grades and weights of a course/semester. Lost points can be explained as follows:
 *
 * Lost points are the points you lose when you do not obtain the maximum grade in a specific component. Example: If you have a component with a weight of 0.2 and you obtain a grade of 4.5, you lose 0.1 points of the final grade in the course/semester.
 *
 * @param grades - The list of grades. grades are between 0 and 5.
 * @param weights - The list of weights. weigths can be any number, but they must be positive
 * @returns The lost points
 * */
export function computeLostPoints(grades: number[], weights: number[]): number {
  checkGradesAndWeightsLenght(grades, weights);

  const lostPoints = grades.reduce((sum, grade, index) => {
    const weight = weights[index];
    return sum + (5 - grade) * weight;
  }, 0);

  return lostPoints;
}

/**
 * Compute the maximum grade in a course/semester. The maximum grade is the highest grade you can archive at specific point in the semester if in all the remaining components you obtain the maximum grade posible (5)
 *
 * @param lockedGrades - The list of grades of the components that are locked.
 * grades are between 0 and 5
 * @param lockedWeights - The list of weights of the components that are locked.
 * weigths can be any number, but they must be positive
 * @param unlockedWeights - The list of weights of the components that are unlocked. weigths can be any number, but they must be positive
 * @returns The maximum grade
 */
export function computeMaximumGrade(
  lockedGrades: number[],
  lockedWeights: number[],
  unlockedWeights: number[]
): number {
  const unlockedGrades = Array(unlockedWeights.length).fill(5);

  const grades = [...lockedGrades, ...unlockedGrades];
  const weights = [...lockedWeights, ...unlockedWeights];

  return computeWeightedAverage(grades, weights);
}
