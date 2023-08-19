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

  // If we use onChange, we perform the average calculation on every keystroke
  // if the user leaves the input empty, we get the last valid value
  const handleChange = (data: number | null) => {
    if (data !== null) {
      onGradeChange(data);
    }
  };

  // If we use onBlur, we perform the average calculation only when the user leaves the input
  // if the user leaves the input empty, we get the value before focusing the input
  // but if the user press enter, we get the last valid value

  /* const onInputOut = (e: React.FocusEvent<HTMLInputElement>) => {
    const data = e.target.value;
    const parsedData = parseFloat(data);

    if (!Number.isNaN(parsedData)) {
      onGradeChange(parsedData);
    }
  }; */

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
      // onBlur={onInputOut}
      value={value}
      className={classes.root}
      {...props}
    />
  );
}
