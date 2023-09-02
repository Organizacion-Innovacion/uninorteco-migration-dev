import React from "react";
import { useFinalGradeCourse } from "./useFinalGrade";
import { CoursesContainer } from "../../../../components/CoursesContainer";
import { PartialComponentCard } from "../../components/PartialComponentCard";
import { Course } from "../../../../core/entities/course";
import { FinalGradeResultCard } from "../../components/FinalGradeResultCard";

export interface FinalGradeCourseProps {
  course: Course;
}

export function FinalGradeCourse({ course }: FinalGradeCourseProps) {
  const { components, finalCourseGrade, evaluatedPercentage, onGradeChange } =
    useFinalGradeCourse({
      course,
    });

  return (
    <>
      <CoursesContainer>
        {components.map((component) => (
          <PartialComponentCard
            key={component.id}
            partialComponent={component}
            onGradeChange={onGradeChange}
          />
        ))}
      </CoursesContainer>
      <CoursesContainer sxProps={{ mt: 16 }}>
        <FinalGradeResultCard
          title="Nota final"
          subtitle={`Porcentaje evaluado: ${evaluatedPercentage}%`}
          result={finalCourseGrade}
          helpMessage="¿Cómo se calcula la nota final?"
        />
      </CoursesContainer>
    </>
  );
}
