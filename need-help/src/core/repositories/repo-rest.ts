import { axiosClient } from "./axios-client";
import { userResponse } from "../entities/user";

export class MyRepository {
  private userName?: string;

  private UserResponse?: userResponse;

  private async fetchInfoUser() {
    const url = this.getUserName();
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axiosClient.get<userResponse>(url); // Reemplaza con la ruta correcta de tu API
      this.UserResponse = data;
    } catch (error) {
      throw error;
    }
  }

  async getInfoUser(): Promise<userResponse> {
    if (!this.UserResponse) {
      await this.fetchInfoUser();
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.UserResponse!;
  }

  private getUserName(): string {
    return "lgalviz";
  }

  setUserName(userName: string): void {
    this.userName = userName;
  }
}