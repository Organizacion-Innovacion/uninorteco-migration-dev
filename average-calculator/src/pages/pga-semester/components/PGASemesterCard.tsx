import React from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../common/components/GradeTextField";

export interface PGASemesterCardProps {
  title: string;
  subtitle: string;
  explanation: string;
  value: number;
  onGradeChange?: (data: number) => void;
}

export function PGASemesterCard({
  title,
  subtitle,
  explanation,
  value,
  onGradeChange,
}: PGASemesterCardProps) {
  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {explanation}
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        {onGradeChange ? (
          <div style={{ width: 70 }}>
            <GradeTextField value={value} onGradeChange={onGradeChange} />
          </div>
        ) : (
          <Typography variant="body1" sx={{ mr: 2 }}>
            {value}
          </Typography>
        )}
      </Stack>
    </BaseCard>
  );
}
