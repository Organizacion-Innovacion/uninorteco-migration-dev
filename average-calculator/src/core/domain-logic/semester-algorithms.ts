import { InvalidInputError } from "../common/errors";
import { AcademicSemester, SemesterCourse } from "../entities/semester";
import {
  computeNeededGrade,
  computeWeightedAverage,
  computeWeightedAverageGivenTotalWeight,
} from "./utils";

export function computeFinalGradeOfSemester(semester: AcademicSemester) {
  // filter out courses with 0 credits, they don't count towards the average
  // besides, they may have a different structure that can cause problems ahead
  const coursesCreditsGreaterThanZero = semester.courses.filter(
    (course) => course.credits > 0
  );

  const grades = coursesCreditsGreaterThanZero.map((course) => course.grade);
  const weights = coursesCreditsGreaterThanZero.map((course) => course.credits);

  if (grades.length === 0 && weights.length === 0) {
    return 0;
  }

  const average = computeWeightedAverage(grades, weights);
  // floor to 2 decimal places
  const financeSemesterGrade = Math.floor(average * 100) / 100;
  return financeSemesterGrade;
}

export function computeNeededGradeForSemester(
  semester: AcademicSemester,
  desiredGrade: number
): number {
  // filter out courses with 0 credits, they don't count towards the average
  // besides, they may have a different structure that can cause problems ahead
  const coursesCreditsGreaterThanZero = semester.courses.filter(
    (course) => course.credits > 0
  );

  // compute average for locked courses
  const lockedComponents = coursesCreditsGreaterThanZero.filter(
    (component) => component.isLocked
  );

  if (lockedComponents.length === coursesCreditsGreaterThanZero.length) {
    throw new InvalidInputError(
      "Lo sentimos, debes tener al menos un curso desbloqueado para realizar el cálculo"
    );
  }

  const lockedGrades = lockedComponents.map((component) => component.grade);
  const lockedCredits = lockedComponents.map((component) => component.credits);
  const totalCredits = coursesCreditsGreaterThanZero.reduce((a, b) => a + b.credits, 0);

  // this is the current grade
  const currentGrade = computeWeightedAverageGivenTotalWeight(
    lockedGrades,
    lockedCredits,
    totalCredits
  );

  // Compute the remaining weight
  const remainingWeightAsCredits =
    totalCredits - lockedCredits.reduce((a, b) => a + b, 0);
  const remainingWeight = remainingWeightAsCredits / totalCredits;

  // compute the needed grade
  const neededGrade = computeNeededGrade(
    desiredGrade,
    currentGrade,
    remainingWeight,
    // offset of 0. Computing the needed grade at semester level does not have
    // the same issue as courses have.
    // Here computing a needed grade greater than 5 means that the grade is unreachable
    0
  );

  const roundedNeededGrade = Math.ceil(neededGrade * 10) / 10;
  return roundedNeededGrade;
}

export function replaceGradeOfUnLockedCourses(
  courses: SemesterCourse[],
  grade: number
) {
  const newCourses = courses.map((course) => {
    if (!course.isLocked) {
      return { ...course, grade };
    }
    return course;
  });
  return newCourses;
}
