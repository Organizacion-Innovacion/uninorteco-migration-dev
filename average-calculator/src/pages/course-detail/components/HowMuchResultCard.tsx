import React, { useState } from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../common/components/GradeTextField";
import { CourseInfoModal } from "./CourseInfoModal";
import { ClickableTypography } from "../../../components/ClickableTypography";

export interface HowMuchResultCardProps {
  title: string;
  subtitle: string;
  value: number;
  onGradeChange: (data: number) => void;
  helpMessage: string;
}

export function HowMuchResultCard({
  title,
  subtitle,
  value,
  onGradeChange,
  helpMessage,
}: HowMuchResultCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <ClickableTypography message={helpMessage} onClick={() => setOpen(true)} />
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <div style={{ width: 70 }}>
          <GradeTextField value={value} onGradeChange={onGradeChange} presicion={1} />
        </div>
      </Stack>
      <CourseInfoModal open={open} setOpen={setOpen} />
    </BaseCard>
  );
}
