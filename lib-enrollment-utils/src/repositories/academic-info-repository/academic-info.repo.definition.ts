import { AcademicInfo } from "../../entities/academic-info";

export interface IAcademicInfoRepository {
  getAcademicInfo(period: string): Promise<AcademicInfo>;
}
