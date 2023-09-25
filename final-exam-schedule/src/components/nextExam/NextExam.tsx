import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { Typography } from "@ellucian/react-design-system/core";
import { useThemeInfo } from "@ellucian/experience-extension-utils";
import { stylesComponent } from "./NextExamStyles";

type ClassesType = {
  endText: string;
  centerButton: string;
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
    <>
      <Typography variant="body1">
        <strong>Asignatura:</strong> {title}
      </Typography>
      <Typography variant="body1">
        <strong>Fecha:</strong> {fecha}
      </Typography>
      <Typography variant="body1">
        <strong>Hora:</strong> {hour}
      </Typography>
      <Typography variant="body1">
        <strong>Profesor:</strong> {teacher}
      </Typography>
      <Typography variant="body1">
        <strong>Lugar:</strong> {classRoom}
      </Typography>
    </>
  );
};

NextExam.propTypes = {
  classes: PropTypes.shape({
    centerButton: PropTypes.string.isRequired,
    endText: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  classRoom: PropTypes.string.isRequired,
};

export default withStyles(stylesComponent)(NextExam);
