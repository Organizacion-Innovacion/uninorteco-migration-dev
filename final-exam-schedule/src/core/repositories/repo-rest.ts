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
      this.FinalExamResponse = data;
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
