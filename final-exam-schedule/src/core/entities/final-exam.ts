/**
These interfaces define the data structure to represent information related to students' final exams.

The FinalExamEnrollmentResponse interface is used to represent the response from a web service that provides

information about final exams, while the FinalExam interface defines the structure of each individual final exam.

*/
export interface FinalExam {
  CODIGO_ESTUDIANTE: string;
  NOMBRE_ESTUDIANTE: string;
  MAT: string;
  CURSO: string;
  SESION: string;
  NRC: string;
  DESCRIPCION: string;
  PROFESOR: string;
  FECHA: string;
  DIA: string;
  HORA: string;
  LUGAR: string;
}

export interface FinalExamResponse {
  codigo: string;
  descripcion: string;
  resultado: FinalExam[];
}

export interface ObjectFinalExams {
  [date: string]: FinalExam[];
}