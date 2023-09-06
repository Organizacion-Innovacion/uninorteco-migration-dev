import React, { useState } from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { SemestreInfoModal } from "./SemestreInfoModal";
import { BaseCard } from "../../../components/BaseCard";
import { GradeTextField } from "../../common/components/GradeTextField";

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

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          onClick={handleOpen}
          sx={{ cursor: "pointer", color: "#026BC8" }}
        >
          {helpMessage}
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <div style={{ width: 70 }}>
          <GradeTextField value={value} onGradeChange={onGradeChange} />
        </div>
      </Stack>
      <SemestreInfoModal open={open} setOpen={setOpen} />
    </BaseCard>
  );
}
