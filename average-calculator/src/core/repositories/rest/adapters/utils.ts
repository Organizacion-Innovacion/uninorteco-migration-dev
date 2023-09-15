import { PartialComponent } from "../../../entities/course";
import { SemesterCourse, SemesterCourseType } from "../../../entities/semester";

export function wasSemesterCourseEvaluated(components: PartialComponent[]): boolean {
  return components.every((component) => component.grade > 0);
}

export function getSemesterCourseType(
  semesterCourse: SemesterCourse,
  components: PartialComponent[]
): SemesterCourseType {
  const { credits } = semesterCourse;
  const hasComponents = components.length > 0;

  if (credits === 0) {
    return "zero-credits";
  }

  if (!hasComponents) {
    return "no-components";
  }

  return "normal";
}
