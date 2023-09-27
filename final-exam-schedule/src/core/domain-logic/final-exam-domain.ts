import { MyRepository } from "../repositories/repo-rest";
import { FinalExam, ObjectFinalExams, FinalExamResponse } from "../entities/final-exam";

// Class for handling dates and times
export class DateTimeService {
  /**
   * Get the current date in "dd/mm/yyyy" format.
   * @returns The current date as a formatted string.
   */
  static getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  /**
   * Compare two dates in "dd/mm/yyyy" format.
   * @param dateOne First date to compare.
   * @param dateTwo Second date to compare.
   * @returns A number indicating the comparison between the dates.
   */
  static dateCompare(dateOne: string, dateTwo: string): number {
    const [dayOne, monthOne, yearOne] = dateOne.split("/").map(Number);
    const [dayTwo, monthTwo, yearTwo] = dateTwo.split("/").map(Number);

    if (yearOne !== yearTwo) {
      return yearOne - yearTwo;
    }
    if (monthOne !== monthTwo) {
      return monthOne - monthTwo;
    }
    return dayOne - dayTwo;
  }
}

// Class for sorting exams
export class ExamSortingService {
  /**
   * Sort exams by date.
   * @param exams Array of exams to be sorted.
   * @returns An array of exams sorted by date.
   */
  static sortExamsByDate(exams: FinalExam[]): FinalExam[] {
    exams.sort((examA, examB) => DateTimeService.dateCompare(examA.FECHA, examB.FECHA));
    return exams;
  }

  /**
   * Sort exams by hour within each date.
   * @param examsByDate Object containing exams grouped by date.
   * @returns An object with exams sorted by date and time.
   */
  static sortExamsByHour(examsByDate: ObjectFinalExams): ObjectFinalExams {
    const sortedExamsObj: ObjectFinalExams = {};

    // Use Object.keys to iterate over object properties
    Object.keys(examsByDate).forEach((fecha) => {
      const exams = examsByDate[fecha];

      // Sort exams by hour
      exams.sort(
        (examA, examB) =>
          parseInt(examA.HORA.replace(":", ""), 10) -
          parseInt(examB.HORA.replace(":", ""), 10)
      );
      sortedExamsObj[fecha] = exams;
    });

    return sortedExamsObj;
  }
}

// Class for managing final exams
export class FinalExamService {
  private repository: MyRepository;

  private finalExamResponse: FinalExamResponse | null = null;

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
      this.finalExamResponse = await this.repository.getAllFinalExams();
    } catch (error) {
      console.error("Error initializing finalExamResponse:", error);
    }
  }

  /**
   * Get exams grouped by date and sorted by time.
   * @returns An object with exams grouped by date and sorted by time or null if there is no data.
   */
  async getGroupExamByDate(): Promise<ObjectFinalExams | null> {
      await this.initializeFinalExamResponse();

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

}
