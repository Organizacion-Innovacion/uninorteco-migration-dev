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
}

export interface AcademicSemester {
  /** the name of the semester. ex 'Semestre 2021-30' */
  name: string;
  /** the courses of the semester */
  courses: SemesterCourse[];
}
