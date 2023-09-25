import React from "react";
import { Typography, Divider } from "@ellucian/react-design-system/core";
// TODO: if posible do not use @mui/material
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/system";

export interface DividerSectionCardProps {
  title: string;
  stackProps?: SxProps;
}

export function DividerSectionCard({ title, stackProps }: DividerSectionCardProps) {
  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: "center", ...stackProps }}>
      <Divider sx={{ width: "5%" }} />
      <Typography variant="body2" color="textSecondary">
        {title}
      </Typography>
      <Divider sx={{ flexGrow: 1 }} />
    </Stack>
  );
}
