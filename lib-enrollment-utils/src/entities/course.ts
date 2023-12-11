import { PartialComponent } from "./partial-component";

/**
 * Course characteristics allows to classify courses and perform differents
 * actions based on them.
 * no-components: the course has no components, exmaple: error fetching partial components
 * zero-credits: the course has zero credits, example: mandatory english courses, extra-academic courses
 * contain-invalid-grade: the course has a component with an invalid grade, example: seminario de vida, which contains PA, NA, etc
 * one-component: the course has only one component, example: seminario de vida, practica profesional
 */
export type CourseCharacteristic =
  | "no-components"
  | "zero-credits"
  | "contain-invalid-grade"
  | "one-component";

export interface Course {
  /** the id of the course, also known as the nrc */
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
