import { getSemesterCourseCharacteristics } from "../src/core/domain-logic/course-utils";
import { Course, PartialComponent } from "../src/core/entities/course";
import { AcademicSemester, SemesterCourse } from "../src/core/entities/semester";

export function createTestCourse(
  grades: number[],
  weights: number[],
  isLocked?: boolean[]
): Course {
  const numComponents = grades.length;
  const components: PartialComponent[] = [];

  // Iterate through each component and create a PartialComponent object
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numComponents; i++) {
    const componentName = `Component ${i + 1}`;
    const componentGrade = grades[i];
    const componentWeight = weights[i];
    const wasEvaluated = componentGrade >= 0;

    const component: PartialComponent = {
      id: `cp-${i + 1}`,
      name: componentName,
      grade: componentGrade,
      weight: componentWeight,
      wasEvaluated: wasEvaluated,
      isLocked: isLocked ? isLocked[i] : true,
    };

    components.push(component);
  }

  // Create the Course object
  const course: Course = {
    id: "c-1",
    name: "Introduction to Typescript",
    components: components,
  };

  return course;
}

export function createTestAcademicSemester(
  grades: number[],
  credits: number[],
  isLocked?: boolean[]
): AcademicSemester {
  const numCourses = grades.length;
  const courses: SemesterCourse[] = [];

  // Iterate through each course and create a SemesterCourse object
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCourses; i++) {
    const courseName = `Course ${i + 1}`;
    const courseGrade = grades[i];
    const courseCredits = credits[i];

    const baseCourse: SemesterCourse = {
      id: `c-${i + 1}`,
      name: courseName,
      grade: courseGrade,
      credits: courseCredits,
      wasEvaluated: courseGrade >= 0,
      isLocked: isLocked ? isLocked[i] : true,
      characteristics: new Set(),
    };
    // to avoid having the characteristic 'no-components' and 'one-component'
    const dummyCourse = createTestCourse([3, 0], [90, 10]);

    const characteristics = getSemesterCourseCharacteristics(
      baseCourse,
      dummyCourse.components
    );
    const course: SemesterCourse = {
      ...baseCourse,
      characteristics: characteristics,
    };

    courses.push(course);
  }

  // Create the AcademicSemester object
  const semester: AcademicSemester = {
    name: "Fall 2020",
    courses: courses,
  };

  return semester;
}
