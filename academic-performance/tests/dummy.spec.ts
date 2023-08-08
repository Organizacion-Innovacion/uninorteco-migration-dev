import { calculateDistance } from "../src/core/common/utils";

describe("dummy tests", () => {
  beforeAll(async () => {
    console.log("beforeAll");
  });

  describe("Create", () => {
    beforeEach(async () => {
      console.log("beforeEach");
    });

    // Positive cases
    it("should func works", async () => {
      const distance = calculateDistance(11.1, -74.11, 11.2, -73.11);
      console.log(distance);
      expect(true).toBeTruthy();
    });
  });
});
