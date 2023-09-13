import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  TextField,
  Grid,
  DropdownTypeahead,
  DropdownItem,
  Card,
  CardHeader,
  CardContent,
} from "@ellucian/react-design-system/core";
import { stylesComponent } from "./AdressFormStyles";

type ClassesType = {
  card: string;
  endText: string;
  centerButton: string;
};
const SimpleCard: React.FC<{ classes: ClassesType; titleCard: string }> = (props) => {
  const { classes, titleCard } = props;

  const stringOptions = ["Peru", "otros"];

  return (
    <Card className={classes.card}>
      <CardHeader title={titleCard} />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField label="Dirección Completa" name="textFieldValue1" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Apto/Torre/etc." name="textFieldValue2" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Barrio" name="textFieldValue3" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <DropdownTypeahead
              fullWidth
              id="dropdown1"
              label="País"
              // onChange={this.handleChange}
              // value={this.state.degrees}
            >
              <DropdownItem label="Colombia" value="Colombia" />
              {stringOptions.map((option) => (
                <DropdownItem key={option} label={option} value={option} />
              ))}
            </DropdownTypeahead>
          </Grid>{" "}
          <Grid item xs={12}>
            <DropdownTypeahead
              fullWidth
              id="dropdown2"
              label="Estado/Departamento"
              // onChange={this.handleChange}
              // value={this.state.degrees}
            >
              <DropdownItem label="Colombia" value="Colombia" />
              {stringOptions.map((option) => (
                <DropdownItem key={option} label={option} value={option} />
              ))}
            </DropdownTypeahead>
          </Grid>{" "}
          <Grid item xs={12}>
            <DropdownTypeahead
              fullWidth
              id="dropdown3"
              label="Ciudad/Municipio"
              // onChange={this.handleChange}
              // value={this.state.degrees}
            >
              <DropdownItem label="Colombia" value="Colombia" />
              {stringOptions.map((option) => (
                <DropdownItem key={option} label={option} value={option} />
              ))}
            </DropdownTypeahead>
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
    card: PropTypes.string.isRequired,
  }).isRequired,
  titleCard: PropTypes.string.isRequired,
};

export default withStyles(stylesComponent)(SimpleCard);