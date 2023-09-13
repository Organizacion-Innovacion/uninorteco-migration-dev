import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Card,
  CardHeader,
  CardContent,
} from "@ellucian/react-design-system/core";
import { stylesComponent } from "./CardComponentStyles";

type ClassesType = {
  card: string;
  endText: string;
  centerButton: string;
};
const SimpleCard: React.FC<{ classes: ClassesType; titleCard: string; labelTextfield: string }> = (
  props
) => {
  const { classes, titleCard, labelTextfield } = props;

  return (
    <Card  className={classes.card}>
      <CardHeader title={titleCard} />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={9} sm={9} md={10} lg={11} xl={11}>
            <TextField label={labelTextfield} name="textFieldValue" fullWidth />
          </Grid>
          <Grid
            item
            xs={3}
            sm={3}
            md={2}
            lg={1}
            xl={1}
            className={classes.centerButton}
          >
            <Button>-</Button>
          </Grid>
          <Grid
            item
            xs={9}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            className={classes.centerButton}
          >
            <Typography className={classes.endText}>Añadir nuevo {titleCard}</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            className={classes.centerButton}
          >
            <Button>+</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SimpleCard.propTypes = {
  classes: PropTypes.shape({
    centerButton: PropTypes.string.isRequired,
    endText: PropTypes.string.isRequired,
    card:PropTypes.string.isRequired
  }).isRequired,
  titleCard: PropTypes.string.isRequired,
  labelTextfield: PropTypes.string.isRequired,
};

export default withStyles(stylesComponent)(SimpleCard);
