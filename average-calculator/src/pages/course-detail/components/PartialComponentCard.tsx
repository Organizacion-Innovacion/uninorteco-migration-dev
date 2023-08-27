import React from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { CardLockButton } from "./lockIconButtons";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../../components/GradeTextField";
import { PartialComponent } from "../../../core/entities/course";

export interface PartialComponentCardProps {
  partialComponent: PartialComponent;
  onGradeChange: (id: string, grade: number) => void;
  onLockIconPress?: (id: string) => void;
}

export function PartialComponentCard({
  partialComponent,
  onGradeChange,
  onLockIconPress,
}: PartialComponentCardProps) {
  const disableTextField = onLockIconPress !== undefined && partialComponent.isLocked;
  const bgProps = disableTextField ? { backgroundColor: "#f8f8f8" } : {};

  return (
    <BaseCard sx={bgProps}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{partialComponent.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Peso: {partialComponent.weight}%
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <div style={{ width: 70 }}>
          <GradeTextField
            value={partialComponent.grade}
            onGradeChange={(grade) => onGradeChange(partialComponent.id, grade)}
            disabled={disableTextField}
          />
        </div>
        {onLockIconPress && (
          <CardLockButton
            onClick={() => onLockIconPress(partialComponent.id)}
            isLocked={partialComponent.isLocked}
          />
        )}
      </Stack>
    </BaseCard>
  );
}
