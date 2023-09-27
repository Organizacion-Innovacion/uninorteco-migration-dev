import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@ellucian/react-design-system/core";
import { useThemeInfo } from "@ellucian/experience-extension-utils";
import { stylesComponent } from "./CardComponentStyles";

type ClassesType = {
  card: string;
  cardContent:string;
  endText: string;
  centerButton: string;
};

export const CardComponent: React.FC<{
  classes: ClassesType;
  title: string;
  hour: string;
  teacher: string;
  classRoom: string;
}> = (props) => {
  const theme = useThemeInfo();
  const { classes, title, hour, teacher, classRoom } = props;

  console.log(theme);

  return (
    <Card className={classes.card}>
      <CardHeader title={title} />
      <CardContent className={classes.cardContent}>
        <Typography>
          <strong>Hora:</strong> {hour}
        </Typography>
        <Typography>
          <strong>Profesor:</strong> {teacher}
        </Typography>
        <Typography>
          <strong>Lugar:</strong> {classRoom}
        </Typography>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  classes: PropTypes.shape({
    centerButton: PropTypes.string.isRequired,
    endText: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    cardContent:PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  classRoom: PropTypes.string.isRequired,
};

export default withStyles(stylesComponent)(CardComponent);
