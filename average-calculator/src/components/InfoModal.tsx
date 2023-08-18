import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  useWidth,
} from "@ellucian/react-design-system/core";

export interface InfoModalProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  title: string;
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  dialogTitle: {
    marginRight: "1.3rem",
  },
}));

export function InfoModal({ setOpen, open, title, children }: InfoModalProps) {
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const width = useWidth();

  const fullScreen = width === "xs" || width === "sm";

  return (
    <Dialog fullScreen={fullScreen} maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
