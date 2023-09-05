import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Divider
} from "@ellucian/react-design-system/core";
import { stylesComponent } from "./CardComponentStyles";

type ClassesType = {
  root: string | undefined;
  card: string;
  title: string;
  // Agrega otras propiedades según sea necesario
};
const SimpleCard: React.FC<{ classes: ClassesType; title: string }> = (props) => {
  const customId = "CustomSpacingCard";
  const { classes, title } = props;

  return (
    <div className={classes.root} id={`${customId}_Container`}>
      <Card
        className={classes.card}
        id={`${customId}_Card`}
        spacingOptions={{ spacing: "none" }}
      >
        <CardHeader className={classes.title} title={title} />
        <CardContent id={`${customId}_CardContent`}>
          <Divider id={`${customId}_Example`} />
          <TextField
            id={`${customId}_Field`}
            label="Full width TextField"
            name="textFieldValue"
            fullWidth
          />
          
        </CardContent>
      </Card>
    </div>
  );
};

SimpleCard.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(stylesComponent)(SimpleCard);
