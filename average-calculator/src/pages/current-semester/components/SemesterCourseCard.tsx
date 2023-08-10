import React from "react";
import {
  Paper,
  Typography,
  TextField,
  makeStyles,
} from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";
import { SemesterCourse } from "../../../core/entities/semester";
import { Stack } from "../../../components/Stack";

const useStyles = makeStyles((theme: any) => ({
  textField: {
    ".hedtech-number .input": {
      backgroundColor: "red",
    },
  },
  iconStyles: {
    color: theme.palette.grey["500"],
  },
}));

export interface SemesterCourseCardProps {
  semesterCourse: SemesterCourse;
  onGradeChange: (id: string, grade: number) => void;
}

export function SemesterCourseCard({
  semesterCourse,
  onGradeChange,
}: SemesterCourseCardProps) {
  const classes = useStyles();

  const handleChange = (data: number | null) => {
    console.log(data);

    if (data === null) {
      onGradeChange(semesterCourse.id, 0);
    } else {
      onGradeChange(semesterCourse.id, data);
    }
  };

  return (
    <Paper sx={{ display: "flex", flexDirection: "row", p: 4, alignItems: "center" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="h4">{semesterCourse.name}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
          Creditos: {semesterCourse.credits}
        </Typography>
        <Stack
          sx={{
            alignItems: "center",
            flexDirection: "row",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
            Ver parcelación
          </Typography>
          <Icon
            name="chevron-right"
            className={classes.iconStyles}
            style={{ width: 14, height: 14 }}
          />
        </Stack>
      </Stack>
      <div style={{ width: 100 }}>
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
          value={semesterCourse.grade}
          defaultValue={0}
          className={classes.textField}
        />
      </div>
    </Paper>
  );
}
