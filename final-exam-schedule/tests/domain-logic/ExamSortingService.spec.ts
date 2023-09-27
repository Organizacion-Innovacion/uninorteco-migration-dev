import { ExamSortingService } from "../../src/core/domain-logic/final-exam-domain";
import { ObjectFinalExams,FinalExam } from "../../src/core/entities/final-exam";
import { sampleExams,expectedSampleExams,sampleExamsByDate ,expectedSampleExamsByDate} from "./test-data";

describe("ExamSortingService", () => {
  test("sortExamsByDate sorts exams by date", () => {
    const exams: FinalExam[] = sampleExams;

    const sortedExams:FinalExam[] = ExamSortingService.sortExamsByDate(exams);

    expect(sortedExams).toEqual(expectedSampleExams);
  });

  test("sortExamsByHour sorts exams by hour within each date", () => {
    const examsByDate:ObjectFinalExams = sampleExamsByDate;

    const sortedExams:ObjectFinalExams = ExamSortingService.sortExamsByHour(examsByDate);

    expect(sortedExams["01/01/2023"]).toEqual(expectedSampleExamsByDate);
  });
});
