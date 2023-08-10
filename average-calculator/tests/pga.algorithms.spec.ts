import { InvalidInputError } from "../src/core/common/errors";
import {
  computeNeededSemesterAverage,
  computeNewPGA,
} from "../src/core/domain-logic/pga";

describe("pga algorithms", () => {
  describe("computeNewPGA", () => {
    test.each([
      [4.84, 96, 4.5, 17, 4.78],
      [4.03, 48, 4.75, 17, 4.21],
      [3.9, 105, 4.62, 15, 3.99],
    ])(
      "should compute new PGA of a student with current PGA %p, credits so far %p, current semester average %p and current credits %p to be %p",
      (currentPGA, creditsSoFar, currentSemesterAverage, currentCredits, newPGA) => {
        const result = computeNewPGA(
          currentPGA,
          creditsSoFar,
          currentSemesterAverage,
          currentCredits
        );
        // we can use toBe() because we are rounding to 2 decimal place
        expect(result).toBe(newPGA);
      }
    );
  });
  describe("computeNeededSemesterAverage", () => {
    test.each([
      [4.56, 45, 4.62, 17, 4.78],
      [3.9, 28, 4.1, 17, 4.43],
      [4.3, 32, 4.38, 17, 4.54],
    ])(
      "should compute needed semester average of a student with current PGA %p, credits so far %p, desired PGA %p and current credits %p to be %p",
      (currentPGA, creditsSoFar, desiredPGA, currentCredits, neededSemesterAverage) => {
        const result = computeNeededSemesterAverage(
          currentPGA,
          creditsSoFar,
          desiredPGA,
          currentCredits
        );

        const finalPGA = computeNewPGA(
          currentPGA,
          creditsSoFar,
          result,
          currentCredits
        );
        // we can use toBe() because we are rounding to 2 decimal place
        expect(result).toBe(neededSemesterAverage);
        expect(finalPGA).toBeGreaterThanOrEqual(desiredPGA);
        expect(Math.abs(finalPGA - desiredPGA)).toBeLessThanOrEqual(0.1);
      }
    );
    it("should throw an error if needed grade is less than 0", () => {
      const currentPGA = 4.5;
      const creditsSoFar = 96;
      const desiredPGA = 2;
      const currentCredits = 17;

      try {
        computeNeededSemesterAverage(
          currentPGA,
          creditsSoFar,
          desiredPGA,
          currentCredits
        );
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
        if (error instanceof InvalidInputError) {
          expect(error.errorParams.fieldName).toBe("desiredGrade");
        }
      }
    });
    it("should throw an error if needed grade is greater than 5", () => {
      const currentPGA = 4.5;
      const creditsSoFar = 96;
      const desiredPGA = 5;
      const currentCredits = 15;

      try {
        computeNeededSemesterAverage(
          currentPGA,
          creditsSoFar,
          desiredPGA,
          currentCredits
        );
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
        if (error instanceof InvalidInputError) {
          expect(error.errorParams.fieldName).toBe("desiredGrade");
        }
      }
    });
  });
});
