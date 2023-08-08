import React, { useState } from "react";
import { Card, Typography } from "@ellucian/react-design-system/core";
import { useThemeInfo } from "@ellucian/experience-extension-utils";

export interface CardMessageProps {
  message: string;
}

export function CardMessage({ message }: CardMessageProps) {
  const theme = useThemeInfo();
  const [state, setState] = useState(0);

  console.log(theme);

  return (
    <Card>
      <Typography>{state}</Typography>
      <Typography>{message}</Typography>
      <Typography>estas</Typography>
    </Card>
  );
}
