export interface PartialComponent {
  /** the id of the component */
  id: string;
  /** the grade of the component */
  grade: number;
  /** the name of the component */
  name: string;
  /** the weight of the component, weight is a percentage from 0 to 100 */
  weight: number;
  /** whether the component has been evaluated, which means that the grade is definitive */
  wasEvaluated: boolean;
  /** If the PartialComponent is locked it will not be considered by the algorithm of 'how much I need'. By default all partial components are locked */
  isLocked: boolean;
}

export interface Course {
  /** the id of the course */
  id: string;
  /** the name of the course */
  name: string;
  /** the components of the course */
  components: PartialComponent[];
}
