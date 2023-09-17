import { computeMaximumGrade } from "../src/core/domain-logic/utils";

describe("maximum grade algorithms", () => {
  test.each([
    [[4, 3], [0.4, 0.3], [0.3], 4],
    [[], [], [0.2, 0.5, 0.3], 5],
    [[3, 3, 5], [0.2, 0.5, 0.3], [], 3.6],
    [[3.2], [4], [3, 3], 4.28],
  ])(
    "should compute the maximum grade wiht locked grades %p; locked weights %p and unlocked weights %p to be %p",
    (lockedGrades, lockedWeights, unlockedWeights, expected) => {
      const result = computeMaximumGrade(lockedGrades, lockedWeights, unlockedWeights);
      expect(result).toBeCloseTo(expected);
    }
  );
});
