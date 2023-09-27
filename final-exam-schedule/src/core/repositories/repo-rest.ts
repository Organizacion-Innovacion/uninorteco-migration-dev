import { axiosClient } from "./axios-client";
import { FinalExamResponse } from "../entities/final-exam";

export class MyRepository {
  private userName?: string;

  private FinalExamResponse?: FinalExamResponse;

  private async fetchFinalExams() {
    const url = this.getUserName();
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosClient.get<FinalExamResponse>(url); // Reemplaza con la ruta correcta de tu API
      this.FinalExamResponse = {
        "codigo": "200",
        "descripcion": "Se ejecutó correctamente el servicio de horario-final",
        "resultado": [
            {
                "CODIGO_ESTUDIANTE": "200148949",
                "NOMBRE_ESTUDIANTE": "Puche Guevara Diego Jose",
                "MAT": "IST",
                "CURSO": "7121",
                "SESION": "01",
                "NRC": "2930",
                "DESCRIPCION": "DISEÑO DE SOFTWARE I",
                "PROFESOR": "Wilson  Nieto Bernal",
                "FECHA": "25/05/2023",
                "DIA": "JUEVES",
                "HORA": "10:30 - 12:30",
                "LUGAR": "BLOQJ1 - 35J"
            },
            {
                "CODIGO_ESTUDIANTE": "200148949",
                "NOMBRE_ESTUDIANTE": "Puche Guevara Diego Jose",
                "MAT": "IST",
                "CURSO": "7420",
                "SESION": "01",
                "NRC": "2938",
                "DESCRIPCION": "OPTIMIZACION",
                "PROFESOR": "Felipe Jose Acevedo Garci",
                "FECHA": "27/05/2023",
                "DIA": "VIERNES",
                "HORA": "08:30 - 10:30",
                "LUGAR": "BLOQG - SDU6"
            },
            {
                "CODIGO_ESTUDIANTE": "200148949",
                "NOMBRE_ESTUDIANTE": "Puche Guevara Diego Jose",
                "MAT": "IST",
                "CURSO": "7081",
                "SESION": "02",
                "NRC": "2926",
                "DESCRIPCION": "SISTEMAS OPERACIONALES",
                "PROFESOR": "Jose Duvan Marquez Diaz",
                "FECHA": "27/09/2023",
                "DIA": "MARTES",
                "HORA": "16:30 - 18:30",
                "LUGAR": "BLOQE - 12E"
            }
        ]
    };
    } catch (error) {
      throw error;
    }
  }

  async getAllFinalExams(): Promise<FinalExamResponse> {
    if (!this.FinalExamResponse) {
      await this.fetchFinalExams();
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.FinalExamResponse!;
  }

  private getUserName(): string {
    return "dpuchej";
  }

  setUserName(userName: string): void {
    this.userName = userName;
  }
}
