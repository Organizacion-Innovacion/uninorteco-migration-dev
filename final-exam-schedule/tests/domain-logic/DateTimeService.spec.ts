import { DateTimeService } from "../../src/core/domain-logic/final-exam-domain";

describe("DateTimeService", () => {
  describe("getCurrentDate", () => {
    test('getCurrentDate returns the current date in "dd/mm/yyyy" format', () => {
      const currentDate = DateTimeService.getCurrentDate();
      const [day, month, year] = currentDate.split("/").map(Number);
      const currentDateObject = new Date();

      expect(day).toBe(currentDateObject.getDate());
      expect(month).toBe(currentDateObject.getMonth() + 1);
      expect(year).toBe(currentDateObject.getFullYear());
    });
  });

  describe("dateCompare", () => {
    test("dateCompare compares two dates correctly", () => {
      const dateOne = "01/01/2023";
      const dateTwo = "02/01/2023";

      const result = DateTimeService.dateCompare(dateOne, dateTwo);

      expect(result).toBe(-1); // dateOne < dateTwo
    });
  });

  describe("compareTimes", () => {
    test("compareTimes should return 0 for equal times", () => {
      const result = DateTimeService.compareTimes("09:30", "09:30");
      expect(result).toBe(0);
    });

    test("compareTimes should return a negative number for timeA earlier than timeB", () => {
      const result = DateTimeService.compareTimes("08:45", "09:30");
      expect(result).toBeLessThan(0);
    });

    test("compareTimes should return a positive number for timeA later than timeB", () => {
      const result = DateTimeService.compareTimes("10:15", "09:30");
      expect(result).toBeGreaterThan(0);
    });
  });

  describe("compareTimes", () => {
    test("formatDate should format a date string correctly", () => {
      const result = DateTimeService.formatDate("25/05/2023");
      expect(result).toEqual({
        dia: 25,
        month: "mayo",
        año: 2023,
        dayName: "jueves",
      });
    });
  });
});
