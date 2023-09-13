import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  Checkbox,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@ellucian/react-design-system/core";
import { stylesComponent } from "./EmploymentStatusStyles";

type ClassesType = {
  centerText: string;
  centerCheckbox: string;
};
const SimpleCard: React.FC<{
  classes: ClassesType;
  titleCard: string;
  options: string[];
}> = (props) => {
  const { classes, titleCard, options } = props;

  return (
    <Card>
      <CardHeader title={titleCard} />
      <CardContent>
        <Grid container spacing={1}>
          {options.map((option) => (
            <>
              <Grid
                item
                xs={3}
                sm={3}
                md={2}
                lg={1}
                xl={1}
                className={classes.centerCheckbox}
              >
                <Checkbox />
              </Grid>
              <Grid
                item
                xs={9}
                sm={9}
                md={10}
                lg={11}
                xl={11}
                className={classes.centerText}
              >
                <option key={option} value={option}>
                  {option}
                </option>
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

SimpleCard.propTypes = {
  classes: PropTypes.shape({
    centerCheckbox: PropTypes.string.isRequired,
    centerText: PropTypes.string.isRequired,
  }).isRequired,
  titleCard: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default withStyles(stylesComponent)(SimpleCard);
