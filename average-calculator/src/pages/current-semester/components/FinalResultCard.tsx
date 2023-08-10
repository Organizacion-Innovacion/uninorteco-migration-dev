import React from "react";
import { Paper, Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";

export interface FinalResultCardProps {
  title: string;
  subtitle: string;
  result: number;
  precision?: number;
}

function numberToString(n: number, precision = 2) {
  const roundNumber = Math.round(n * 10 ** precision) / 10 ** precision;
  return roundNumber.toFixed(precision);
}

export function FinalResultCard({
  title,
  subtitle,
  result,
  precision = 2,
}: FinalResultCardProps) {
  return (
    <Paper sx={{ display: "flex", flexDirection: "row", p: 4, alignItems: "center" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ¿Qué significa esto?
        </Typography>
      </Stack>
      <Typography variant="body1" sx={{ mr: 2 }}>
        {numberToString(result, precision)}
      </Typography>
    </Paper>
  );
}
