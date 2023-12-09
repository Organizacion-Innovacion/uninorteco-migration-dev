import axios from "axios";
import { ILogger, AppLogger } from "../src/repositories/logger";
import { EnrollmentRepository } from "../src/repositories/enrollment-repository/enrollment-api";
import { EnrollmentRawDataClient } from "../src/repositories/enrollment-repository/enrollment-api.definition";
import { AcademicEnrollmentResponse } from "../src/repositories/enrollment-repository/entities/academic-enrollment";
import { RestCourseRepository } from "../src/repositories/course-repository/rest/courses.repo.rest";
import { AcademicInfoRepository } from "../src/repositories/academic-info-repository/rest/academic-info.repo.rest";
import { PartialGradeResponse } from "../src/repositories/enrollment-repository/entities/partial-grades";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const simpleLogger: ILogger = {
  error: (message, meta) => {
    console.log(`ERROR: ${message}`, meta);
  },
  warn: (message, meta) => {
    console.log(`WARN: ${message}`, meta);
  },
  info: (message, meta) => {
    console.log(`INFO: ${message}`, meta);
  },
  debug: (message, meta) => {
    console.log(`DEBUG: ${message}`, meta);
  },
};
AppLogger.getAppLogger().setLogger(simpleLogger);

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 5000,
});

const testEnrollmentRawDataClient: EnrollmentRawDataClient = {
  async getCourses(period) {
    const username = "dpuchej";
    const url = `/matricula/user/${username}/periodo/${period}`;
    const { data } = await axiosClient.get<AcademicEnrollmentResponse>(url);
    return data;
  },
  async getPartialGrades(nrc, period) {
    const body = {
      user: "dpuchej",
      periodo: period,
      nrc,
    };
    const url = "/notas-parciales";
    const { data } = await axiosClient.post<PartialGradeResponse>(url, body);
    return data;
  },
};
const testEnrollmentRepository = new EnrollmentRepository(testEnrollmentRawDataClient);
export const testCourseRepository = new RestCourseRepository(testEnrollmentRepository);
export const testAcademicInfoRepository = new AcademicInfoRepository(
  testEnrollmentRepository,
  testCourseRepository
);
