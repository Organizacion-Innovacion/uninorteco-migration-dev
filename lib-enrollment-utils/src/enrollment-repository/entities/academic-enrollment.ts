/**
 * data definitions for following api endpoint
 * /matricula/user/:user/periodo/:periodo
 *
 * PUNTOS and CREDITOS are used to compute the PGA using the following formula:
 *
 * Math.floor((PUNTOS / CREDITOS) * 100) / 100
 */

export interface AECourse {
  /** course's nrc  */
  SFRSTCR_CRN: string;
  /** course's title */
  SSBSECT_CRSE_TITLE: string;
  /** course's credits */
  SFRSTCR_CREDIT_HR: number;
  /** total points accumulated up to the consultation period  */
  PUNTOS: number;
  /** total credits accumulated up to the consultation period */
  CREDITOS: number;
}

export interface AcademicEnrollmentResponse {
  codigo: string;
  descripcion: string;
  resultado: AECourse[];
}
