import { InvalidInputError } from "../common/errors";

/**
 * Computes the new PGA (Promedio General Acumulado) based on the current
 * semester data.
 *
 * @param currentPGA - The current PGA.
 * @param creditsSoFar - The total number of credits earned so far.
 * @param currentSemesterAverage - The average of the current semester.
 * @param currentCredits - The number of credits of the current semester.
 * @returns The new PGA.
 */
export function computeNewPGA(
  currentPGA: number,
  creditsSoFar: number,
  currentSemesterAverage: number,
  currentCredits: number
): number {
  const newPGA =
    (currentPGA * creditsSoFar + currentCredits * currentSemesterAverage) /
    (creditsSoFar + currentCredits);

  // floor to 2 decimal places
  return Math.floor(newPGA * 100) / 100;
}

/**
 * Computes the needed semester average to achieve
 * a desired PGA (Promedio General Acumulado).
 *
 * @param currentPGA - The current PGA.
 * @param creditsSoFar - The total number of credits earned so far.
 * @param desiredPGA - The desired PGA.
 * @param currentCredits - The number of credits of the current semester.
 * @returns The needed semester average to achieve the desired PGA.
 * @throws {@link InvalidInputError} If the needed semester average is
 * greater than 5 or less than 0.
 */
export function computeNeededSemesterAverage(
  currentPGA: number,
  creditsSoFar: number,
  desiredPGA: number,
  currentCredits: number
): number {
  const neededSemesterAverage =
    (desiredPGA * (creditsSoFar + currentCredits) - currentPGA * creditsSoFar) /
    currentCredits;

  // ceil to 2 decimal places
  const roundedNeededSemesterAverage = Math.ceil(neededSemesterAverage * 100) / 100;

  if (roundedNeededSemesterAverage > 5) {
    throw new InvalidInputError(
      "Lo sentimos, para obtener la nota deseada necesitas un promedio semestral mayor a 5",
      {
        fieldName: "desiredGrade",
      }
    );
  }

  if (roundedNeededSemesterAverage < 0) {
    throw new InvalidInputError(
      "Lo sentimos, para obtener la nota deseada necesitas un promedio semestral menor a 0",
      {
        fieldName: "desiredGrade",
      }
    );
  }

  return roundedNeededSemesterAverage;
}
