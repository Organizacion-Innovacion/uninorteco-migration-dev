import React from "react";
import { Paper } from "@ellucian/react-design-system/core";

export function BaseCard({ children, sx, ...props }: any) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "row",
        p: 4,
        alignItems: "center",
        gap: "1rem",
        borderRadius: "0.5rem",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}
