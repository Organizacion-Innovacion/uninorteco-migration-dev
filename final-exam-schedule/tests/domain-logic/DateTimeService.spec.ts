// __tests__/DateTimeService.test.ts
import { DateTimeService } from '../../src/core/domain-logic/final-exam-domain';

describe('DateTimeService', () => {
  test('getCurrentDate returns the current date in "dd/mm/yyyy" format', () => {
    const currentDate = DateTimeService.getCurrentDate();
    const [day, month, year] = currentDate.split('/').map(Number);
    const currentDateObject = new Date();

    expect(day).toBe(currentDateObject.getDate());
    expect(month).toBe(currentDateObject.getMonth() + 1);
    expect(year).toBe(currentDateObject.getFullYear());
  });

  test('dateCompare compares two dates correctly', () => {
    const dateOne = '01/01/2023';
    const dateTwo = '02/01/2023';

    const result = DateTimeService.dateCompare(dateOne, dateTwo);

    expect(result).toBe(-1); // dateOne < dateTwo
  });
});