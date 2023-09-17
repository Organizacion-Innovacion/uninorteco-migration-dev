import { InvalidInputError } from "../src/core/common/errors";
import {
  computeFinalGradeOfSemester,
  computeNeededGradeForSemester,
} from "../src/core/domain-logic/semester-algorithms";
import { AcademicSemester } from "../src/core/entities/semester";
import { createTestAcademicSemester } from "./test-utils";

function replaceGradeOfUnLockedCourses(
  academicSemester: AcademicSemester,
  grade: number
) {
  academicSemester.courses.forEach((course) => {
    if (!course.isLocked) {
      // eslint-disable-next-line no-param-reassign
      course.grade = grade;
    }
  });
}

describe("semester algorithms", () => {
  describe("computeFinalGradeOfSemester", () => {
    test.each([
      [[0.8, 2.5, 1.9, 2.5, 2.4, 1.4], [2, 3, 3, 3, 3, 3], 1.98],
      [[4.9, 4.9, 4.9, 4.4, 4.9], [3, 3, 3, 3, 3], 4.8],
      [[4.9, 5, 4.9, 5, 4.9], [4, 3, 3, 3, 3], 4.93], // 4.9375
      [[5, 5, 5, 5], [3, 3, 4, 3], 5],
      [[0, 0, 0, 0], [3, 3, 4, 3], 0],
    ])(
      "should compute average of an academic semester with grades %p and weights %p to be %p",
      (grades, weights, expected) => {
        const academicSemester = createTestAcademicSemester(grades, weights);
        const result = computeFinalGradeOfSemester(academicSemester);
        // we can use toBe() because we are flooring the result to 2 decimals
        expect(result).toBe(expected);
      }
    );
    it("should ignore courses with 0 credits", () => {
      const grades = [4, 5, 3];
      const credits = [3, 2, 0];
      const academicSemester = createTestAcademicSemester(grades, credits);
      const result = computeFinalGradeOfSemester(academicSemester);

      expect(result).toBe(4.4);
    });
  });
  describe("computeNeededGradeForSemester", () => {
    test.each([
      [3, [3, 2.5, 0], [5, 3, 2], [true, true, false], 3.8],
      [
        3.8,
        [4.5, 5, 1.9, 2.5, 0, 0],
        [2, 3, 3, 3, 3, 3],
        [true, true, true, true, false, false],
        4.6,
      ],
      [4.5, [0, 4], [5, 1], [false, true], 4.6],
    ])(
      "should compute needed grade of the desired grade %p for a semester with grades %p and credits %p and locked components %p to be %p",
      (desiredGrade, grades, credits, isLocked, expected) => {
        const semester = createTestAcademicSemester(grades, credits, isLocked);
        const neededGrade = computeNeededGradeForSemester(semester, desiredGrade);

        replaceGradeOfUnLockedCourses(semester, neededGrade);
        const finalGrade = computeFinalGradeOfSemester(semester);

        // we can use toBe() because we are rounding to 1 decimal place
        expect(neededGrade).toBe(expected);
        expect(finalGrade).toBeGreaterThanOrEqual(desiredGrade);
        expect(Math.abs(finalGrade - desiredGrade)).toBeLessThanOrEqual(0.1);
      }
    );
    it("should ignore courses with 0 credits", () => {
      const desiredGrade = 4.4;
      const grades = [0, 5, 3];
      const credits = [3, 2, 0];
      const isLocked = [false, true, true];
      const expected = 4.1;

      const semester = createTestAcademicSemester(grades, credits, isLocked);
      const neededGrade = computeNeededGradeForSemester(semester, desiredGrade);

      replaceGradeOfUnLockedCourses(semester, neededGrade);
      const finalGrade = computeFinalGradeOfSemester(semester);

      expect(neededGrade).toBe(expected);
      expect(finalGrade).toBeGreaterThanOrEqual(desiredGrade);
      expect(Math.abs(finalGrade - desiredGrade)).toBeLessThanOrEqual(0.1);
    });
    it("should compute needed grade of 5 if desired grade is 5 and all components are unlocked", () => {
      const desiredGrade = 5;
      const grades = [0, 0, 0];
      const credits = [3, 5, 2];
      const isLocked = [false, false, false];
      const expected = 5;

      const semester = createTestAcademicSemester(grades, credits, isLocked);
      const neededGrade = computeNeededGradeForSemester(semester, desiredGrade);

      replaceGradeOfUnLockedCourses(semester, neededGrade);
      const finalGrade = computeFinalGradeOfSemester(semester);

      expect(neededGrade).toBe(expected);
      expect(finalGrade).toBe(desiredGrade);
    });
    it("should throw an error if all components are locked", () => {
      const desiredGrade = 5;
      const grades = [0, 0, 0];
      const credits = [3, 5, 2];
      const isLocked = [true, true, true];

      const semester = createTestAcademicSemester(grades, credits, isLocked);
      try {
        computeNeededGradeForSemester(semester, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
      }
    });
    it("should throw an error if desired grade is less than current grade", () => {
      const desiredGrade = 3;
      // current grade is 3.5, so it is impossible to get 3
      const grades = [5, 4, 0];
      const credits = [3, 5, 2];
      const isLocked = [true, true, false];

      const semester = createTestAcademicSemester(grades, credits, isLocked);
      try {
        computeNeededGradeForSemester(semester, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
        if (error instanceof InvalidInputError) {
          expect(error.errorParams.fieldName).toBe("desiredGrade");
          expect(error.errorParams.minGrade).toBeCloseTo(3.5);
        }
      }
    });
    it("should throw an error if desired grade is 4.8 and current grade is 3.5 and remaining weight is 0.2", () => {
      const desiredGrade = 4.8;
      // maximun grade is 4.5, so it is impossible to get 4.8
      const grades = [5, 4, 0];
      const credits = [3, 5, 2];
      const isLocked = [true, true, false];

      const semester = createTestAcademicSemester(grades, credits, isLocked);
      try {
        computeNeededGradeForSemester(semester, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
        if (error instanceof InvalidInputError) {
          expect(error.errorParams.fieldName).toBe("desiredGrade");
          expect(error.errorParams.maxGrade).toBe(4.5);
        }
      }
    });
    it("should throw an error if desired grade is 5 and current grade is 3.497 and remaining weight is 0.3", () => {
      const desiredGrade = 5;
      // 3497 / 700 is a imposible grade, but it is used to test the extreme case
      // different arrange of weights and grades can lead to this case
      const grades = [3497 / 700, 0];
      const credits = [7, 3];
      const isLocked = [true, false];

      const semester = createTestAcademicSemester(grades, credits, isLocked);
      try {
        computeNeededGradeForSemester(semester, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
        if (error instanceof InvalidInputError) {
          expect(error.errorParams.fieldName).toBe("desiredGrade");
        }
      }
    });
  });
});
