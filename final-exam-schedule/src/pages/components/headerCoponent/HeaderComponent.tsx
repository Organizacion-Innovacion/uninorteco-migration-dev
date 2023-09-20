import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { Typography, Divider } from "@ellucian/react-design-system/core";
import { stylesComponent } from "./HeaderComponentStyles";

export type ClassesType = {
  fecha: string;
  numeroDia: string;
  mesAno: string;
  dayName: string;
  dia: string;
  dividerMarginTop:string;
};
const HeaderComponent: React.FC<{
  classes: ClassesType;
  day: string;
  month: string;
  year: string;
  dayName: string;
}> = (props) => {
  const { classes, day, month, year, dayName } = props;

  return (
    <>
      <div className={classes.fecha}>
        <div className={classes.numeroDia}>{day}</div>
        <div className={classes.mesAno}>
          <div className={classes.dayName}>{dayName}</div>
          <div className={classes.dia}>
            <Typography>
              {month},{year}
            </Typography>
          </div>
        </div>
      </div>
      <Divider className={classes.dividerMarginTop} />
    </>
  );
};

HeaderComponent.propTypes = {
  classes: PropTypes.shape({
    fecha: PropTypes.string.isRequired,
    numeroDia: PropTypes.string.isRequired,
    mesAno: PropTypes.string.isRequired,
    dayName: PropTypes.string.isRequired,
    dia: PropTypes.string.isRequired,
    dividerMarginTop:PropTypes.string.isRequired,
  }).isRequired,
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  dayName: PropTypes.string.isRequired,
};

export default withStyles(stylesComponent)(HeaderComponent);
