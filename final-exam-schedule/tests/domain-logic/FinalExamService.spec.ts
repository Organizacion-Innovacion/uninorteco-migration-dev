import { FinalExamService } from "../../src/core/domain-logic/final-exam-domain";
import { MyRepository } from "../../src/core/repositories/repo-rest";
import { DateTimeService } from "../../src/core/domain-logic/date-services";
import { ExamSortingService } from "../../src/core/domain-logic/sort-services";
import { sampleExams, expectedSampleExams } from "./test-data";

// Mock de MyRepository
jest.mock("../../src/core/repositories/repo-rest");
const MockedMyRepository = MyRepository as jest.MockedClass<typeof MyRepository>;

// Mock de DateTimeService
jest.mock("../../src/core/domain-logic/date-services");
const MockedDateTimeService = DateTimeService as jest.Mocked<typeof DateTimeService>;

// Mock de ExamSortingService
jest.mock("../../src/core/domain-logic/sort-services");
const MockedExamSortingService = ExamSortingService as jest.Mocked<
  typeof ExamSortingService
>;

describe("FinalExamService", () => {
  let finalExamService: FinalExamService;

  beforeEach(() => {
    finalExamService = new FinalExamService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getGroupExamByDate", () => {
    /* it("should return null if finalExamResponse is null", async () => {
      MockedMyRepository.prototype.getAllFinalExams.mockResolvedValue(null);

      const result = await finalExamService.getGroupExamByDate();

      expect(result).toBeNull();
    }); */

    it("should return null if allExams is empty", async () => {
      MockedMyRepository.prototype.getAllFinalExams.mockResolvedValue({
        codigo: "200",
        descripcion: "Éxito",
        resultado: [],
      });

      const result = await finalExamService.getGroupExamByDate();

      expect(result).toBeNull();
    });

    it("should return grouped and sorted exams", async () => {
      const getAllFinalExamsResult = {
        codigo: "200",
        descripcion: "Éxito",
        resultado: sampleExams,
      };

      MockedMyRepository.prototype.getAllFinalExams.mockResolvedValue(
        getAllFinalExamsResult
      );

      // Mock para ExamSortingService.sortExamsByDate
      const sortedExamsMock = sampleExams;
      MockedExamSortingService.sortExamsByDate.mockReturnValue(sortedExamsMock);

      // Mock para ExamSortingService.sortExamsByHour
      const examsByHourMock = {
        // ... Exámenes agrupados por hora ...
      };
      MockedExamSortingService.sortExamsByHour.mockReturnValue(examsByHourMock);

      const result = await finalExamService.getGroupExamByDate();

      expect(result).toEqual(examsByHourMock);
    });
  });

  describe("getNextExam", () => {
    it("should return null if getGroupExamByDate returns null", async () => {
      const getGroupExamByDateMock = jest.spyOn(finalExamService, "getGroupExamByDate");
      getGroupExamByDateMock.mockResolvedValue(null);

      const result = await finalExamService.getNextExam();

      expect(result).toBeNull();
    });
    /*
    it("should return the closest upcoming exam", async () => {
      const currentDateMock = "25/05/2023";
      const currentTimeMock = "10:00";

      // Mock para DateTimeService.getCurrentDate
      MockedDateTimeService.getCurrentDate.mockReturnValue(currentDateMock);

      // Mock para DateTimeService.getCurrentTime
      MockedDateTimeService.getCurrentTime.mockReturnValue(currentTimeMock);

      const groupedExamsMock = {
        "25/05/2023": [
          // ... Exámenes para la fecha actual ...
        ],
        "26/05/2023": [
          // ... Exámenes para futuras fechas ...
        ],
      };

      const getGroupExamByDateMock = jest.spyOn(finalExamService, "getGroupExamByDate");
      getGroupExamByDateMock.mockResolvedValue(groupedExamsMock);

      const result = await finalExamService.getNextExam();

      // Asegúrate de que result sea el examen correcto según tus datos de prueba
      expect(result).toEqual(expectedSampleExams);
    }); */
  });
});
