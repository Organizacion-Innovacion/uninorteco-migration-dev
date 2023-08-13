import React from "react";
import { TextField, makeStyles } from "@ellucian/react-design-system/core";

export interface GradeTextFieldProps {
  onGradeChange: (data: number) => void;
  value: number;
  [key: string]: any;
}

const useStyles = makeStyles(() => ({
  root: {
    "& .hedtech-number-input": {
      width: "100%",
    },
  },
}));

export function GradeTextField({
  onGradeChange,
  value,
  ...props
}: GradeTextFieldProps) {
  const classes = useStyles();

  const handleChange = (data: number | null) => {
    console.log(data);

    if (data === null) {
      onGradeChange(0);
    } else {
      onGradeChange(data);
    }
  };

  return (
    <TextField
      label="Nota"
      name="grade"
      fullWidth
      type="number"
      precision={2}
      max={5}
      min={0}
      size="small"
      InputLabelProps={{ shrink: true }}
      onChange={handleChange}
      value={value}
      defaultValue={0}
      className={classes.root}
      {...props}
    />
  );
}
