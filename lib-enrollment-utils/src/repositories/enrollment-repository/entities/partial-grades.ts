/**
 * data definitions for following api endpoint
 * /api/v1/notas-parciales
 *
 * if NOTA is 0, that means that the component has not been evaluated yet
 * if NOTAA is "---", that means that the component has not been evaluated yet
 */

export interface PGComponent {
  /** course's nrc  */
  SHRMRKS_CRN: string;
  /** partial component's sequence number. useful to sort components */
  SHRGCOM_SEQ_NO: number;
  /** partial component's upper case name */
  SHRGCOM_NAME: string;
  /** partial component's normal name */
  SHRGCOM_DESCRIPTION: string;
  /** partial component's weight as a percentage. ex: 20, 30 */
  SHRGCOM_WEIGHT: number;
  /** partial component's grade as a number. ex: 3.5, 4.0 */
  NOTA: number;
  /** partial component's grade as a string. ex: "3.5", "4.0" */
  NOTAA: string;
}

export interface PartialGradeResponse {
  codigo: string;
  descripcion: string;
  resultado: PGComponent[];
}
