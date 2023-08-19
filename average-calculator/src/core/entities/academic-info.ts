export interface AcademicInfo {
  /** current 'promedio acaumulado general' without consider the current semester  */
  currentPGA: number;
  /** credits approved so far without consider the current semester */
  creditsSoFar: number;
  /** total credits of the current semester */
  currentCredits: number;
}
