import React from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { BaseCard } from "../../../components/BaseCard";

export interface FinalGradeResultCardProps {
  title: string;
  subtitle: string;
  result: number;
}

export function FinalGradeResultCard({
  title,
  subtitle,
  result,
}: FinalGradeResultCardProps) {
  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ cursor: "pointer" }}>
          ¿Qué significa esto?
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {result}
        </Typography>
      </Stack>
    </BaseCard>
  );
}
