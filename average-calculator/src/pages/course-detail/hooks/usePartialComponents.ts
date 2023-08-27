import { useEffect, useState } from "react";
import { AppLogger } from "../../../core/config/logger";
import { Course, PartialComponent } from "../../../core/entities/course";

const myLogger = AppLogger.getAppLogger().createContextLogger(
  "partial-components-hook"
);

export interface PartialComponentHook {
  course: Course;
}

export function usePartialComponents({ course }: PartialComponentHook) {
  const [components, setComponents] = useState<PartialComponent[]>([]);

  const onGradeChange = (id: string, grade: number) => {
    myLogger.debug("grade changed", { id, grade });
    const newComponents = components.map((component) => {
      if (component.id === id) {
        return { ...component, grade };
      }
      return component;
    });
    setComponents(newComponents);
  };

  const evaluatedPercentage = components.reduce(
    (acc, component) => acc + +component.wasEvaluated * component.weight,
    0
  );

  useEffect(() => {
    setComponents(course.components);
  }, [course]);

  return {
    components,
    onGradeChange,
    setComponents,
    evaluatedPercentage,
  };
}
