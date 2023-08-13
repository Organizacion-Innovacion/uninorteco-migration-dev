import React from "react";
import { Paper, Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { GradeTextField } from "./GradeTextField";

export interface HowMuchResultCardProps {
  title: string;
  subtitle: string;
  value: number;
  onGradeChange: (data: number) => void;
}

export function HowMuchResultCard({
  title,
  subtitle,
  value,
  onGradeChange,
}: HowMuchResultCardProps) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 4,
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ¿Qué significa esto?
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <GradeTextField value={value} onGradeChange={onGradeChange} />
      </Stack>
    </Paper>
  );
}
