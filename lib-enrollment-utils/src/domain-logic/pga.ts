import { InvalidInputError } from "../common/errors";

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
