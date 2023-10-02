import { PartialComponent } from "./partial-component";

export type CourseCharacteristic =
  | "no-components"
  | "zero-credits"
  | "contain-invalid-grade"
  | "one-component";

export interface Course {
  /** the id of the course */
  id: string;
  /** the name of the course */
  name: string;
  /**
   * the current grade of the course. The grade you have accumulated up to now. if grade is equal to -1 it means that the grade could not be computed
   * */
  grade: number;
  /** course credits */
  credits: number;
  /** whether the component has been evaluated, which means that the grade is final */
  wasEvaluated: boolean;
  /** If the course is locked it will not be considered by the algorithm of
   * 'how much I need'. By default all courses are unlocked */
  isLocked: boolean;
  /** course's characteristics */
  characteristics: Set<CourseCharacteristic>;
  /** the partial components of the course */
  components: PartialComponent[];
}
