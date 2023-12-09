import { getCourseCharacteristics } from "../src/domain-logic/course-utils";
import { Course } from "../src/entities/course";
import { PartialComponent } from "../src/entities/partial-component";
import { ILogger, AppLogger } from "../src/repositories/logger";

const simpleLogger: ILogger = {
  error: (message, meta) => {
    console.log(`ERROR: ${message}`, meta);
  },
  warn: (message, meta) => {
    console.log(`WARN: ${message}`, meta);
  },
  info: (message, meta) => {
    console.log(`INFO: ${message}`, meta);
  },
  debug: (message, meta) => {
    console.log(`DEBUG: ${message}`, meta);
  },
};
AppLogger.getAppLogger().setLogger(simpleLogger);

export type AcademicSemester = {
  name: string;
  courses: Course[];
};

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
      gradeAsString: componentGrade.toString(),
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
    credits: 3,
    characteristics: new Set(),
    grade: 0,
    wasEvaluated: false,
    isLocked: false,
    // we just care about the components, all other fields are placeholders
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
  const courses: Course[] = [];

  // Iterate through each course and create a Course object
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCourses; i++) {
    const courseName = `Course ${i + 1}`;
    const courseGrade = grades[i];
    const courseCredits = credits[i];
    const dummyCourse = createTestCourse([3, 0], [90, 10]);

    const baseCourse: Course = {
      id: `c-${i + 1}`,
      name: courseName,
      grade: courseGrade,
      credits: courseCredits,
      wasEvaluated: courseGrade >= 0,
      isLocked: isLocked ? isLocked[i] : true,
      characteristics: new Set(),
      components: dummyCourse.components,
    };
    // to avoid having the characteristic 'no-components' and 'one-component'
    const characteristics = getCourseCharacteristics(baseCourse);
    const course: Course = {
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
