import { helloWorld } from '../src/index';

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
      const message = "helloWorld";
      const result = helloWorld();
      expect(result).toBe(message);
    });
  });
});

