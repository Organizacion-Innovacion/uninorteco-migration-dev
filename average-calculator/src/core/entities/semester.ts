export type SemesterCourseType = "normal" | "zero-credits" | "no-components";

export interface SemesterCourse {
  /** the id of the course */
  id: string;
  /** the name of the course */
  name: string;
  /** the current grade of course. The grade you have accumulated up to now */
  grade: number;
  /** course credits */
  credits: number;
  /** whether the component has been evaluated, which means that the grade is final */
  wasEvaluated: boolean;
  /** If the semester course is locked it will not be considered by the algorithm of 'how much I need'. By default all semester courses are unlocked */
  isLocked: boolean;
  /** the type of the course.
   *
   * _normal:_ a course with standard 'parcelación'
   *
   * _zero-credits:_ a course with zero credits and no components,
   * such as 'proyecto de vida'
   *
   * _no-components_: a course with no components due to unexpected errors
   */
  courseType: SemesterCourseType;
}

export interface AcademicSemester {
  /** the name of the semester. ex 'Semestre 2021-30' */
  name: string;
  /** the courses of the semester */
  courses: SemesterCourse[];
}
