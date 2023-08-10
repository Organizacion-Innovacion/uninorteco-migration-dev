import React from "react";
import { Paper } from "@ellucian/react-design-system/core";

export function Stack({ children, sx, ...props }: any) {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "inherit",
        transition: "none",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}
