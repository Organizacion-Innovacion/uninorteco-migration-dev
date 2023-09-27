import { MyRepository } from "../repositories/repo-rest";
import { FinalExam, ObjectFinalExams, FinalExamResponse } from "../entities/final-exam";
import { DateTimeService } from "./date-services";
import { ExamSortingService } from "./sort-services";

// Class for managing final exams
export class FinalExamService {
  private repository: MyRepository;

  private finalExamResponse: FinalExamResponse | null = null;

  private examsLoaded = false;

  /**
   * Constructor for the service.
   * Initializes the repository.
   */
  constructor() {
    this.repository = new MyRepository();
  }

  /**
   * Initializes finalExamResponse by fetching data from the repository.
   */
  private async initializeFinalExamResponse() {
    try {
      if (!this.examsLoaded) {
        this.finalExamResponse = await this.repository.getAllFinalExams();
        this.examsLoaded = true; // Mark exams as loaded
      }
    } catch (error) {
      console.error("Error initializing finalExamResponse:", error);
    }
  }

  /**
   * Ensure that final exams are loaded, fetching them from the repository if necessary.
   */
  private async ensureFinalExamsLoaded(): Promise<void> {
    if (!this.examsLoaded) {
      await this.initializeFinalExamResponse();
    }
  }

  /**
   * Get exams grouped by date and sorted by time.
   * @returns An object with exams grouped by date and sorted by time or null if there is no data.
   */
  async getGroupExamByDate(): Promise<ObjectFinalExams | null> {
    await this.ensureFinalExamsLoaded();

    try {
      if (!this.finalExamResponse) {
        return null;
      }

      const allExams = this.finalExamResponse.resultado;

      if (allExams.length === 0) {
        return null;
      }

      // Sort exams by date
      const sortedExams = ExamSortingService.sortExamsByDate(allExams);

      const examsByDate: ObjectFinalExams = {};

      // Group exams by date
      sortedExams.forEach((item: FinalExam) => {
        const date: string = item.FECHA;
        if (!examsByDate[date]) {
          examsByDate[date] = [];
        }
        examsByDate[date].push(item);
      });

      // Sort exams by hour within each date
      return ExamSortingService.sortExamsByHour(examsByDate);
    } catch (error) {
      console.error("Error fetching exams:", error);
      return null;
    }
  }

  /**
   * Get the next upcoming exam.
   * @returns The closest upcoming exam or null if there are no upcoming exams.
   */
  async getNextExam(): Promise<FinalExam | null> {
    await this.ensureFinalExamsLoaded(); // Ensure exams are loaded before proceeding
    const groupedExams = await this.getGroupExamByDate();
    if (!groupedExams) {
      return null;
    }

    const currentDate = DateTimeService.getCurrentDate();
    const currentTime = DateTimeService.getCurrentTime();

    // eslint-disable-next-line no-restricted-syntax
    for (const date in groupedExams) {
      if (Object.prototype.hasOwnProperty.call(groupedExams, date)) {
        const exams = groupedExams[date];
        // Iterate through exams for the current date
        // eslint-disable-next-line no-restricted-syntax
        for (const exam of exams) {
          if (DateTimeService.dateCompare(exam.FECHA, currentDate) === 0) {
            // This exam is on the same date
            if (DateTimeService.compareTimes(exam.HORA, currentTime) > 0) {
              // This exam is in the future
              return exam;
            }
          } else if (DateTimeService.dateCompare(exam.FECHA, currentDate) > 0) {
            // This exam is in the future
            return exam;
          }
        }
      }
    }

    // No upcoming exams found
    return null;
  }
}
export { DateTimeService, ExamSortingService };

