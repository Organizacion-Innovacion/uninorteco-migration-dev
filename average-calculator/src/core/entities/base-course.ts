export type CourseCharacteristic =
  | "no-components"
  | "zero-credits"
  | "contain-invalid-grade"
  | "one-component";

export interface BaseCourse {
  /** the id of the course */
  id: string;
  /** the name of the course */
  name: string;
  /** course's characteristics */
  characteristics: Set<CourseCharacteristic>;
}
