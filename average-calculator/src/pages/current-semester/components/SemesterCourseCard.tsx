import React from "react";
import { Typography, TextLink } from "@ellucian/react-design-system/core";
import { Link } from "react-router-dom";
import { SemesterCourse } from "../../../core/entities/semester";
import { Stack } from "../../../components/Stack";
import { CardLockButton } from "./lockIconButtons";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../../components/GradeTextField";

interface ParcelacionTypographyProps {
  isSpecialCourse: boolean;
  parcelacionUrl: string;
}

function ParcelacionTypography({
  isSpecialCourse,
  parcelacionUrl,
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
    <TextLink
      variant="body2"
      color="textSecondary"
      component={Link}
      to={parcelacionUrl}
      style={{ textDecoration: "none" }}
    >
      Ver parcelación
    </TextLink>
  );
}

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
  const disableTextField = onLockIconPress !== undefined && semesterCourse.isLocked;
  const bgProps = disableTextField ? { backgroundColor: "#f8f8f8" } : {};

  const isSpecialCourse = semesterCourse.credits === 0;

  // const parcelacionUrl = `${basePath}courses/${semesterCourse.id}`;
  const parcelacionUrl = `/courses/${semesterCourse.id}`;

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
