import React from "react";
import { Icon } from "@ellucian/ds-icons/lib";
import { IconButton, Tooltip, makeStyles } from "@ellucian/react-design-system/core";

export interface FabProps {
  toolTipTitle: string;
  iconName: string;
  onClick: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    position: "absolute",
    bottom: "6.5rem",
    [theme.breakpoints.up("md")]: {
      right: "2rem",
    },
    right: "1rem",
  },
}));

export function Fab({ onClick, toolTipTitle, iconName }: FabProps) {
  const classes = useStyles();

  return (
    <Tooltip title={toolTipTitle}>
      <IconButton aria-label={toolTipTitle} onClick={onClick} className={classes.root}>
        <Icon name={iconName} large style={{ height: "28px", width: "28px" }} />
      </IconButton>
    </Tooltip>
  );
}
