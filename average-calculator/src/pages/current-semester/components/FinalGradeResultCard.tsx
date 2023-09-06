import React, { useState } from "react";
import { Typography } from "@ellucian/react-design-system/core";
import { Stack } from "../../../components/Stack";
import { SemestreInfoModal } from "./SemestreInfoModal";
import { BaseCard } from "../../../components/BaseCard";
import { ClickableTypography } from "../../common/components/ClickableTypography";

export interface FinalGradeResultCardProps {
  title: string;
  subtitle: string;
  result: number;
  helpMessage: string;
}

export function FinalGradeResultCard({
  title,
  subtitle,
  result,
  helpMessage,
}: FinalGradeResultCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <BaseCard>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <ClickableTypography message={helpMessage} onClick={() => setOpen(true)} />
      </Stack>
      <Stack sx={{ flexDirection: "row" }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          {result}
        </Typography>
      </Stack>
      <SemestreInfoModal open={open} setOpen={setOpen} />
    </BaseCard>
  );
}
