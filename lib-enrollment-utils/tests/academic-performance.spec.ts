import { Course, CourseCharacteristic } from "../src/entities/course";
import { PartialComponent } from "../src/entities/partial-component";
import {
  getEvaluatedWeight,
  getCourseStatus,
  getCourseStatusFromGradeAsPercentage,
  getPartialComponentStatus,
} from "../src/domain-logic/academic-performance";

function createTestPartialComponent(
  id: number,
  grade: number,
  weight: number,
  wasEvaluated: boolean
): PartialComponent {
  return {
    id: `cp-${id}`,
    name: `Component ${id}`,
    grade,
    gradeAsString: grade.toString(),
    weight: weight,
    wasEvaluated: wasEvaluated,
    isLocked: wasEvaluated,
  };
}

function createTestCourse(
  grades: number[],
  weights: number[],
  wasEvaluated: boolean[],
  characteristics: Set<CourseCharacteristic>
): Course {
  const numComponents = grades.length;
  const components: PartialComponent[] = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numComponents; i++) {
    const component = createTestPartialComponent(
      i,
      grades[i],
      weights[i],
      wasEvaluated[i]
    );
    components.push(component);
  }

  return {
    id: "dummy",
    name: "Introduction to Typescript",
    credits: 3,
    characteristics: characteristics,
    // grade does not matter for this tests
    grade: 0,
    wasEvaluated: components.every((component) => component.wasEvaluated),
    // isLocked does not matter for this tests
    isLocked: false,
    components: components,
  };
}

describe("academic performance algorithms", () => {
  describe("getEvaluatedWeight", () => {
    it("should get a 60% evaluated weight", () => {
      const course = createTestCourse(
        [2, 5, 4, 0],
        [20, 40, 20, 20],
        [true, false, true, true],
        new Set()
      );
      const evaluatedWeight = getEvaluatedWeight(course);
      expect(evaluatedWeight).toBe(60);
    });
    it("should get a 0% evaluated weight", () => {
      const course = createTestCourse(
        [2, 5, 4],
        [33, 33, 34],
        [false, false, false],
        new Set()
      );
      const evaluatedWeight = getEvaluatedWeight(course);
      expect(evaluatedWeight).toBe(0);
    });
    it("should get a 0% evaluated weight because of having no components", () => {
      const course = createTestCourse([], [], [], new Set(["no-components"]));
      const evaluatedWeight = getEvaluatedWeight(course);
      expect(evaluatedWeight).toBe(0);
    });
  });
  describe("getStatusFromGradeAsPercentage", () => {
    it("should get level 1", () => {
      const courseStatus = getCourseStatusFromGradeAsPercentage(50);
      expect(courseStatus).toBe("level-1");
    });
    it("should get level 2", () => {
      const courseStatus = getCourseStatusFromGradeAsPercentage(65);
      expect(courseStatus).toBe("level-2");
    });
    it("should get level 3", () => {
      const courseStatus = getCourseStatusFromGradeAsPercentage(80);
      expect(courseStatus).toBe("level-3");
    });
  });
  describe("getCourseStatus", () => {
    it("should get level 1 with course with bad grades", () => {
      const course = createTestCourse(
        [2.2, 1.1, 2.6, 0],
        [20, 40, 20, 20],
        [true, true, true, false],
        new Set()
      );
      const status = getCourseStatus(course);
      expect(status).toBe("level-1");
    });
    it("should get level 2 with course with medium grades", () => {
      const course = createTestCourse(
        [3.2, 0, 0],
        [20, 60, 20],
        [true, false, false],
        new Set()
      );
      const status = getCourseStatus(course);
      expect(status).toBe("level-2");
    });
    it("should get level 3 with course with great grades", () => {
      const course = createTestCourse(
        [4.5, 5, 0],
        [20, 60, 20],
        [true, true, false],
        new Set()
      );
      const status = getCourseStatus(course);
      expect(status).toBe("level-3");
    });
    it("should get none with course with no components", () => {
      const course = createTestCourse([], [], [], new Set(["no-components"]));
      const status = getCourseStatus(course);
      expect(status).toBe("none");
    });
    it("should get none with course with invalid grade", () => {
      const course = createTestCourse(
        [2, -1],
        [50, 50],
        [true, true],
        new Set(["contain-invalid-grade"])
      );
      const status = getCourseStatus(course);
      expect(status).toBe("none");
    });
    it("should get none with course with one component", () => {
      const course = createTestCourse([5], [100], [true], new Set(["one-component"]));
      const status = getCourseStatus(course);
      expect(status).toBe("none");
    });
  });
  describe("getPartialComponentStatus", () => {
    it("should get level 1 with partial component with bad grades", () => {
      const partialComponent = createTestPartialComponent(1, 2.2, 20, true);
      const status = getPartialComponentStatus(partialComponent);
      expect(status).toBe("level-1");
    });
    it("should get level 2 with partial component with medium grades", () => {
      const partialComponent = createTestPartialComponent(1, 3.2, 20, true);
      const status = getPartialComponentStatus(partialComponent);
      expect(status).toBe("level-2");
    });
    it("should get level 3 with partial component with great grades", () => {
      const partialComponent = createTestPartialComponent(1, 4.5, 20, true);
      const status = getPartialComponentStatus(partialComponent);
      expect(status).toBe("level-3");
    });
    it("should get none with partial component that has not been evaluated", () => {
      const partialComponent = createTestPartialComponent(1, 0, 20, false);
      const status = getPartialComponentStatus(partialComponent);
      expect(status).toBe("none");
    });
  });
});
