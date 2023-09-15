import React from "react";

import { Typography } from "@ellucian/react-design-system/core";

export interface ClickableTypographyProps {
  message: string;
  onClick: () => void;
  sxProps?: any;
  typogrphyProps?: any;
}

export function ClickableTypography({
  message,
  onClick,
  sxProps,
  typogrphyProps,
}: ClickableTypographyProps) {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      onClick={onClick}
      sx={{
        cursor: "pointer",
        color: "#026BC8",
        "&:hover": {
          color: "#151618",
        },
        ...sxProps,
      }}
      {...typogrphyProps}
    >
      {message}
    </Typography>
  );
}
