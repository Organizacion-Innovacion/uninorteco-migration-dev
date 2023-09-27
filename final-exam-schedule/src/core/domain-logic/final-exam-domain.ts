import { MyRepository } from "../repositories/repo-rest";
import { FinalExam, ObjectFinalExams } from "../entities/final-exam";

export class FinalExamService {
  constructor(private readonly repository: MyRepository) {}

  // Private method to get exams and sort them by date
  private async getExamsDateSort(): Promise<FinalExam[] | null> {
    try {
      const { resultado: allExams } = await this.repository.getAllFinalExams();

      if (allExams.length === 0) {
        return null;
      }

      // Sort exams by date using the dateCompare function
      allExams.sort((examA, examB) => this.dateCompare(examA.FECHA, examB.FECHA));

      return allExams;
    } catch (error) {
      // Handle errors appropriately
      console.error("Error fetching exams:", error);
      return null;
    }
  }

  // Private method to get the current date in "dd/mm/yyyy" format
  private getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Private method to compare two dates in "dd/mm/yyyy" format
  private dateCompare(dateOne: string, dateTwo: string): number {
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

  // Private method to sort exams within each date by hour
  private examsSortByHour(ExamsByDate: ObjectFinalExams) {
    // Convert the JSON object into an array of dates and exams
    const examsArray = Object.entries(ExamsByDate).map(([fecha, exams]) => ({
      fecha,
      exams,
    }));

    // Sort the array by exam time within each date
    examsArray.forEach(({ exams }) => {
      exams.sort((examA, examB) => {
        const timeA = examA.HORA;
        const timeB = examB.HORA;
        // Convert time to a format that can be compared (e.g., "10:30" -> 1030)
        const timeAInt = parseInt(timeA.replace(":", ""), 10);
        const timeBInt = parseInt(timeB.replace(":", ""), 10);
        return timeAInt - timeBInt;
      });
    });

    // Convert the sorted array back into a JSON object
    const sortedExamsObj = Object.fromEntries(
      examsArray.map(({ fecha, exams }) => [fecha, exams])
    );

    return sortedExamsObj;
  }

  // Public method to get exams grouped by date and sorted by time
  async getGroupExamByDate(): Promise<ObjectFinalExams | null> {
    try {
      const allExams: FinalExam[] | null = await this.getExamsDateSort();

      if (allExams === null) {
        return null;
      }
      const ExamsByDate: ObjectFinalExams = {};

      allExams.forEach((item: FinalExam) => {
        const date: string = item.FECHA;
        if (!ExamsByDate[date]) {
          ExamsByDate[date] = [];
        }
        ExamsByDate[date].push(item);
      });

      // Sort exams within each date by time
      return this.examsSortByHour(ExamsByDate);
    } catch (error) {
      // Handle errors appropriately
      console.error("Error fetching exams:", error);
      return null;
    }
  }

  // Public method to get the closest exam to the current date
  async getClosestExamToCurrentDate(): Promise<FinalExam | null> {
    try {
      const currentDate = this.getCurrentDate();
      const { resultado: allExams } = await this.repository.getAllFinalExams();

      if (allExams.length === 0) {
        return null;
      }

      let closestDate: FinalExam | null = null;

      // Iterate through exams to find the closest one to the current date
      allExams.forEach((exam) => {
        const examDate = exam.FECHA;
        if (this.dateCompare(examDate, currentDate) > 0) {
          if (!closestDate || this.dateCompare(examDate, closestDate.FECHA) < 0) {
            closestDate = exam;
          }
        }
      });

      return closestDate;
    } catch (error) {
      // Handle errors appropriately
      console.error("Error fetching exams:", error);
      return null;
    }
  }
}
