import {
  testCourseRepository,
  testAcademicInfoRepository,
} from "./repository-test-utils";

/*
Basic tests for all repositories. These tests are not meant to be exhaustive, but
to ensure that the repositories are working without errors.
*/

describe("all repository", () => {
  describe("courses repository", () => {
    it("should find 6 courses", async () => {
      const courses = await testCourseRepository.getCourses("202310");
      const nrcs = courses.map((c) => c.id);
      const expectedNrcs = ["2209", "2217", "2926", "2928", "2930", "2938"];
      expect(courses.length).toBe(6);
      expect(nrcs.sort()).toEqual(expectedNrcs.sort());
    });
  });
  describe("academic info repository", () => {
    it("should find a pga greater than 4.8", async () => {
      const academicInfo = await testAcademicInfoRepository.getAcademicInfo("202310");
      expect(academicInfo.currentPGA).toBeGreaterThan(4.8);
    });
  });
});
