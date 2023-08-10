import { InvalidInputError } from "../src/core/common/errors";
import {
  computeFinalGradeOfCourse,
  computeNeededGradeForCourse,
} from "../src/core/domain-logic/course-algorithms";
import { Course } from "../src/core/entities/course";
import { createTestCourse } from "./test-utils";

function replaceGradeOfUnLockedComponents(course: Course, grade: number) {
  course.components.forEach((component) => {
    if (!component.isLocked) {
      // eslint-disable-next-line no-param-reassign
      component.grade = grade;
    }
  });
}

describe("course algorithms", () => {
  describe("computeFinalGradeOfCourse", () => {
    test.each([
      [[4.5, 5, 5, 5], [25, 25, 30, 20], 4.9],
      [[4.8, 4.9, 5, 5, 3.3], [20, 20, 15, 15, 30], 4.4], // 4.43
      [[5, 5, 5, 5], [25, 25, 25, 25], 5],
      [[0, 0, 0, 0], [25, 25, 25, 25], 0],
    ])(
      "should compute average of a course with grades %p and weights %p to be %p",
      (grades, weights, expected) => {
        const course = createTestCourse(grades, weights);
        const result = computeFinalGradeOfCourse(course);
        // we can use toBe() because we are rounding to 1 decimal place
        expect(result).toBe(expected);
      }
    );
    test.each([
      [[4.9, 4.5, 0, 4, 0, 0], [20, 10, 20, 15, 15, 20], 2],
      [[3.8, 4.3, 5, 0, 0], [20, 20, 20, 20, 20], 2.6], // 2.62
      [[3.8, 4.5, 5, 0, 0], [20, 20, 20, 20, 20], 2.7], // 2.66
    ])(
      "should compute average of a course with components that are still not a evaluated. Using grades %p and weights %p to obtain %p",
      (grades, weights, expected) => {
        const course = createTestCourse(grades, weights);
        const result = computeFinalGradeOfCourse(course);
        // we can use toBe() because we are rounding to 1 decimal place
        expect(result).toBe(expected);
      }
    );
  });
  describe("computeNeededGradeForCourse", () => {
    test.each([
      [4, [5, 4, 0], [30, 50, 20], [true, true, false], 2.5],
      [4.1, [5, 4.5, 0], [30, 50, 20], [true, true, false], 1.8],
      [
        2.4,
        [4.7, 5, 0, 0, 0],
        [20, 20, 30, 15, 15],
        [true, true, false, false, false],
        0.8,
      ],
    ])(
      "should compute needed grade of the desired grade %p for a course with grades %p and weights %p and locked components %p to be %p",
      (desiredGrade, grades, weights, isLocked, expected) => {
        const course = createTestCourse(grades, weights, isLocked);
        const neededGrade = computeNeededGradeForCourse(course, desiredGrade);

        replaceGradeOfUnLockedComponents(course, neededGrade);
        const finalGrade = computeFinalGradeOfCourse(course);

        // we can use toBe() because we are rounding to 1 decimal place
        expect(neededGrade).toBe(expected);
        expect(finalGrade).toBeGreaterThanOrEqual(desiredGrade);
        expect(Math.abs(finalGrade - desiredGrade)).toBeLessThanOrEqual(0.1);
      }
    );
    it("should compute needed grade of 5 if desired grade is 5 and all components are unlocked", () => {
      const desiredGrade = 5;
      const grades = [0, 0, 0];
      const weights = [30, 50, 20];
      const isLocked = [false, false, false];
      const expected = 5;

      const course = createTestCourse(grades, weights, isLocked);
      const neededGrade = computeNeededGradeForCourse(course, desiredGrade);

      replaceGradeOfUnLockedComponents(course, neededGrade);
      const finalGrade = computeFinalGradeOfCourse(course);

      expect(neededGrade).toBe(expected);
      expect(finalGrade).toBe(desiredGrade);
    });
    it("should compute needed grade of 5 if desired grade is 3 and current grade is 0.49 and remaining weight 0.5", () => {
      const desiredGrade = 3;
      const grades = [1.5, 0.2, 0];
      const weights = [30, 20, 50];
      const isLocked = [true, true, false];
      const expected = 5;

      const course = createTestCourse(grades, weights, isLocked);
      const neededGrade = computeNeededGradeForCourse(course, desiredGrade);

      replaceGradeOfUnLockedComponents(course, neededGrade);
      const finalGrade = computeFinalGradeOfCourse(course);

      expect(neededGrade).toBe(expected);
      expect(finalGrade).toBe(desiredGrade);
    });
    it("should compute needed grade of 5 if desired grade is 3 and current grade is 0.45 and remaining weight is 0.5", () => {
      const desiredGrade = 3;
      const grades = [1.3, 0.3, 0];
      const weights = [30, 20, 50];
      const isLocked = [true, true, false];
      const expected = 5;

      const course = createTestCourse(grades, weights, isLocked);
      const neededGrade = computeNeededGradeForCourse(course, desiredGrade);

      replaceGradeOfUnLockedComponents(course, neededGrade);
      const finalGrade = computeFinalGradeOfCourse(course);

      expect(neededGrade).toBe(expected);
      expect(finalGrade).toBe(desiredGrade);
    });
    it("should throw an error if desired grade is 3 and current grade is 0.44 and remaining weight is 0.5", () => {
      const desiredGrade = 3;
      const grades = [1.2, 0.4, 0];
      const weights = [30, 20, 50];
      const isLocked = [true, true, false];

      const course = createTestCourse(grades, weights, isLocked);
      try {
        computeNeededGradeForCourse(course, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
      }
    });
    it("should throw an error if all components are locked", () => {
      const desiredGrade = 5;
      const grades = [0, 0, 0];
      const weights = [30, 50, 20];
      const isLocked = [true, true, true];

      const course = createTestCourse(grades, weights, isLocked);
      try {
        computeNeededGradeForCourse(course, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
      }
    });
    it("should throw an error if desired grade is less than current grade", () => {
      const desiredGrade = 3;
      // current grade is 3.5
      const grades = [5, 4, 0];
      const weights = [30, 50, 20];
      const isLocked = [true, true, false];

      const course = createTestCourse(grades, weights, isLocked);
      try {
        computeNeededGradeForCourse(course, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
        if (error instanceof InvalidInputError) {
          expect(error.errorParams.fieldName).toBe("desiredGrade");
        }
      }
    });
    it("should throw an error if desired grade is unrechable", () => {
      const desiredGrade = 4.8;
      // current grade is 3.5
      const grades = [5, 4, 0];
      const weights = [30, 50, 20];
      const isLocked = [true, true, false];

      const course = createTestCourse(grades, weights, isLocked);
      try {
        computeNeededGradeForCourse(course, desiredGrade);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputError);
        if (error instanceof InvalidInputError) {
          expect(error.errorParams.fieldName).toBe("desiredGrade");
        }
      }
    });
  });
});
