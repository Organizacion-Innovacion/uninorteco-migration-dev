import { PartialComponent } from "../entities/course";
import { SemesterCourse } from "../entities/semester";
import { AcademicInfo } from "../entities/academic-info";
import {
  computeFinalGradeOfCourse,
  computeNeededGradeForCourse,
  replaceGradeOfUnLockedComponents,
} from "./course-algorithms";
import {
  computeFinalGradeOfSemester,
  computeNeededGradeForSemester,
  replaceGradeOfUnLockedCourses,
} from "./semester-algorithms";
import { computeNewPGA, computeNeededSemesterAverage } from "./pga";

export type SimplifiedAcademicInfo = Pick<
  AcademicInfo,
  "creditsSoFar" | "currentCredits" | "currentPGA"
>;

/*  
A convenient facade to access the the algorithms of the average calculator

Almost all the algorithms don't need any especial attribute from the 
course/semester object. So we can put 'id' and 'name' as empty strings and use the 
partial components/semester courses to compute the average.

If in the future, we need to use the course/semester object, we can just create another
facade to handle that.
*/
export const calculatorFacade = {
  courseFinalGrade(partialComponents: PartialComponent[]) {
    return computeFinalGradeOfCourse({
      components: partialComponents,
      id: "",
      name: "",
    });
  },

  semesterFinalGrade(semesterCourses: SemesterCourse[]) {
    return computeFinalGradeOfSemester({
      courses: semesterCourses,
      name: "",
    });
  },

  pgaFinalGrade(semesterAverage: number, academicInfo: SimplifiedAcademicInfo) {
    const newPga = computeNewPGA(
      academicInfo.currentPGA,
      academicInfo.creditsSoFar,
      semesterAverage,
      academicInfo.currentCredits
    );
    return newPga;
  },

  courseHowMuch(partialComponents: PartialComponent[], desiredGrade: number) {
    const neededGrade = computeNeededGradeForCourse(
      { id: "", name: "", components: partialComponents },
      desiredGrade
    );
    const newComponents = replaceGradeOfUnLockedComponents(
      partialComponents,
      neededGrade
    );
    return {
      neededGrade,
      newComponents,
    };
  },

  semesterHowMuch(semesterCourses: SemesterCourse[], desiredGrade: number) {
    const neededGrade = computeNeededGradeForSemester(
      { name: "", courses: semesterCourses },
      desiredGrade
    );
    const newCourses = replaceGradeOfUnLockedCourses(semesterCourses, neededGrade);
    return {
      neededGrade,
      newCourses,
    };
  },

  pgaHowMuch(academicInfo: SimplifiedAcademicInfo, desiredPGA: number) {
    const neededSemesterAverage = computeNeededSemesterAverage(
      academicInfo.currentPGA,
      academicInfo.creditsSoFar,
      desiredPGA,
      academicInfo.currentCredits
    );
    return neededSemesterAverage;
  },
};
