import React from "react";
import { Paper } from "@ellucian/react-design-system/core";

export function Box({ children, sx, ...props }: any) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "inherit",
        transition: "none",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}
