import React from "react";
import { Typography, makeStyles } from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";
// import { usePageControl, usePageInfo } from "@ellucian/experience-extension-utils";
import { usePageInfo } from "@ellucian/experience-extension-utils";
import { SemesterCourse } from "../../../core/entities/semester";
import { Stack } from "../../../components/Stack";
import { CardLockButton } from "./lockIconButtons";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../../components/GradeTextField";

interface ParcelacionTypographyProps {
  isSpecialCourse: boolean;
  parcelacionUrl: string;
  classes: any;
}

function ParcelacionTypography({
  isSpecialCourse,
  parcelacionUrl,
  classes,
}: ParcelacionTypographyProps) {
  if (isSpecialCourse) {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ display: "flex", alignItems: "center", width: "fit-content" }}
      >
        Asignatura sin parcelación
      </Typography>
    );
  }

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      sx={{ display: "flex", alignItems: "center", width: "fit-content" }}
      component="a"
      href={parcelacionUrl}
      target="_self"
      style={{ textDecoration: "none" }}
    >
      Ver parcelación
      <Icon
        name="chevron-right"
        className={classes.iconStyles}
        style={{ width: 14, height: 14, marginLeft: "0.25rem" }}
      />
    </Typography>
  );
}

const useStyles = makeStyles((theme: any) => ({
  iconStyles: {
    color: theme.palette.grey["500"],
  },
}));

export interface SemesterCourseCardProps {
  semesterCourse: SemesterCourse;
  onGradeChange: (id: string, grade: number) => void;
  onLockIconPress?: (id: string) => void;
}

export function SemesterCourseCard({
  semesterCourse,
  onGradeChange,
  onLockIconPress,
}: SemesterCourseCardProps) {
  const classes = useStyles();

  const { basePath } = usePageInfo();
  // const { navigateToPage } = usePageControl();
  // onClick={() => navigateToPage({ route: `/courses/${semesterCourse.id}` })}
  const disableTextField = onLockIconPress !== undefined && semesterCourse.isLocked;
  const bgProps = disableTextField ? { backgroundColor: "#f8f8f8" } : {};

  const isSpecialCourse = semesterCourse.credits === 0;

  const parcelacionUrl = `${basePath}courses/${semesterCourse.id}`;

  return (
    <BaseCard sx={bgProps}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{semesterCourse.name}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Creditos: {semesterCourse.credits}
        </Typography>
        <ParcelacionTypography
          isSpecialCourse={isSpecialCourse}
          parcelacionUrl={parcelacionUrl}
          classes={classes}
        />
      </Stack>
      {!isSpecialCourse && (
        <Stack sx={{ flexDirection: "row" }}>
          <div style={{ width: 70 }}>
            <GradeTextField
              value={semesterCourse.grade}
              onGradeChange={(grade) => onGradeChange(semesterCourse.id, grade)}
              disabled={disableTextField}
            />
          </div>
          {onLockIconPress && (
            <CardLockButton
              onClick={() => onLockIconPress(semesterCourse.id)}
              isLocked={semesterCourse.isLocked}
            />
          )}
        </Stack>
      )}
    </BaseCard>
  );
}
