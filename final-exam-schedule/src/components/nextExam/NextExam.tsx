import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { Typography,Paper } from "@ellucian/react-design-system/core";
import { useThemeInfo } from "@ellucian/experience-extension-utils";
import { stylesComponent } from "./NextExamStyles";

type ClassesType = {
  endText: string;
  centerButton: string;
  paper:string
};

export const NextExam: React.FC<{
  classes: ClassesType;
  title: string;
  fecha:string;
  hour: string;
  teacher: string;
  classRoom: string;
}> = (props) => {
  const theme = useThemeInfo();
  const { classes, title, fecha, hour, teacher, classRoom } = props;

  console.log(theme);

  return (
    <Paper className={classes.paper}>
      <Typography variant="body2">
        <strong>Asignatura:</strong> {title}
      </Typography>
      <Typography variant="body2">
        <strong>Fecha:</strong> {fecha}
      </Typography>
      <Typography variant="body2">
        <strong>Hora:</strong> {hour}
      </Typography>
      <Typography variant="body2">
        <strong>Profesor:</strong> {teacher}
      </Typography>
      <Typography variant="body2">
        <strong>Lugar:</strong> {classRoom}
      </Typography>
    </Paper>
  );
};

NextExam.propTypes = {
  classes: PropTypes.shape({
    centerButton: PropTypes.string.isRequired,
    endText: PropTypes.string.isRequired,
    paper: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  classRoom: PropTypes.string.isRequired,
};

export default withStyles(stylesComponent)(NextExam);
