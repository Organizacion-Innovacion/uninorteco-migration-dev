import React from "react";
import {
  List,
  ListItemText,
  ListItemButton,
  Button,
  useWidth,
  isWidthDown,
} from "@ellucian/react-design-system/core";
import { useCardControl } from "@ellucian/experience-extension-utils";
import { useAcademicSemester } from "../hooks/useAcademicSemester";
import { Stack } from "../../components/Stack";
import { sortSemesterCoursesByCredits } from "../../util/helpers";

export function MainCardContent() {
  const { academicSemester } = useAcademicSemester();
  const { navigateToPage } = useCardControl();

  const courses =
    academicSemester !== null
      ? sortSemesterCoursesByCredits(academicSemester.courses)
      : [];

  const isMobile: boolean = isWidthDown("md", useWidth());

  return (
    <>
      <List dense sx={{ mb: 3 }}>
        {courses.map((course) => (
          <ListItemButton
            onClick={() => navigateToPage({ route: `/courses/${course.id}` })}
          >
            <ListItemText
              primary={course.name}
              secondary={`Créditos: ${course.credits}`}
            />
          </ListItemButton>
        ))}
      </List>
      {!isMobile && (
        <Stack sx={{ pt: 2, pb: 4, gap: 2, px: 4 }}>
          <Button color="primary" onClick={() => navigateToPage({ route: "/" })}>
            Ir a la página principal
          </Button>
          <Button color="secondary" onClick={() => navigateToPage({ route: "/pga" })}>
            Ir al PGA
          </Button>
        </Stack>
      )}
    </>
  );
}
