import React from "react";
import { Paper, Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";

export interface FinalGradeResultCard {
  title: string;
  subtitle: string;
  result: number;
  precision?: number;
}

function numberToString(n: number, precision = 2) {
  const roundNumber = Math.round(n * 10 ** precision) / 10 ** precision;
  return roundNumber.toFixed(precision);
}

export function FinalGradeResultCard({
  title,
  subtitle,
  result,
  precision = 2,
}: FinalGradeResultCard) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 4,
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ¿Qué significa esto?
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {numberToString(result, precision)}
        </Typography>
      </Stack>
    </Paper>
  );
}
