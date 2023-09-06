import { calculatorFacade } from "../src/core/domain-logic/facade";
import { createTestAcademicSemester, createTestCourse } from "./test-utils";

// basic test cases to verify that the facade is working as expected

describe("calculator facade", () => {
  it("courseFinalGrade", () => {
    const grades = [4.5, 5, 5, 5];
    const weights = [25, 25, 30, 20];
    const expected = 4.9;

    const course = createTestCourse(grades, weights);
    const result = calculatorFacade.courseFinalGrade(course.components);
    // we can use toBe() because we are rounding to 1 decimal place
    expect(result).toBe(expected);
  });
  it("semesterFinalGrade", () => {
    const [grades, weights, expected] = [
      [0.8, 2.5, 1.9, 2.5, 2.4, 1.4],
      [2, 3, 3, 3, 3, 3],
      1.98,
    ];
    const academicSemester = createTestAcademicSemester(grades, weights);
    const result = calculatorFacade.semesterFinalGrade(academicSemester.courses);
    expect(result).toBe(expected);
  });
  it("pgaFinalGrade", () => {
    const [currentPGA, creditsSoFar, currentSemesterAverage, currentCredits, newPGA] = [
      4.84, 96, 4.5, 17, 4.78,
    ];
    const academicInfo = {
      creditsSoFar,
      currentCredits,
      currentPGA,
    };

    const result = calculatorFacade.pgaFinalGrade(currentSemesterAverage, academicInfo);
    // we can use toBe() because we are rounding to 2 decimal place
    expect(result).toBe(newPGA);
  });
  it("courseHowMuch", () => {
    const [desiredGrade, grades, weights, isLocked, expected] = [
      4,
      [5, 4, 0],
      [30, 50, 20],
      [true, true, false],
      2.5,
    ];

    const course = createTestCourse(grades, weights, isLocked);
    const { neededGrade, newComponents } = calculatorFacade.courseHowMuch(
      course.components,
      desiredGrade
    );
    const finalGrade = calculatorFacade.courseFinalGrade(newComponents);

    expect(neededGrade).toBe(expected);
    expect(finalGrade).toBeGreaterThanOrEqual(desiredGrade);
    expect(Math.abs(finalGrade - desiredGrade)).toBeLessThanOrEqual(0.1);
  });
  it("semesterHowMuch", () => {
    const [desiredGrade, grades, credits, isLocked, expected] = [
      3,
      [3, 2.5, 0],
      [5, 3, 2],
      [true, true, false],
      3.8,
    ];
    const semester = createTestAcademicSemester(grades, credits, isLocked);
    const { neededGrade, newCourses } = calculatorFacade.semesterHowMuch(
      semester.courses,
      desiredGrade
    );
    const finalGrade = calculatorFacade.semesterFinalGrade(newCourses);

    expect(neededGrade).toBe(expected);
    expect(finalGrade).toBeGreaterThanOrEqual(desiredGrade);
    expect(Math.abs(finalGrade - desiredGrade)).toBeLessThanOrEqual(0.1);
  });
  it("pgaHowMuch", () => {
    const [
      currentPGA,
      creditsSoFar,
      desiredPGA,
      currentCredits,
      neededSemesterAverage,
    ] = [4.56, 45, 4.62, 17, 4.78];

    const academicInfo = {
      creditsSoFar,
      currentCredits,
      currentPGA,
    };

    const result = calculatorFacade.pgaHowMuch(academicInfo, desiredPGA);
    const finalPGA = calculatorFacade.pgaFinalGrade(result, academicInfo);

    expect(result).toBe(neededSemesterAverage);
    expect(finalPGA).toBeGreaterThanOrEqual(desiredPGA);
    expect(Math.abs(finalPGA - desiredPGA)).toBeLessThanOrEqual(0.1);
  });
});
