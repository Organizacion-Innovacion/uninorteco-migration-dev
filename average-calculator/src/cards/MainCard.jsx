import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography, Button } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React from "react";
import { setupLogger } from "../util/setup-logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";

// setup logger for card
setupLogger();

const styles = () => ({
  card: {
    marginTop: 0,
    marginRight: spacing40,
    marginBottom: 0,
    marginLeft: spacing40,
  },
});

function MainCard(props) {
  const {
    classes,
    cardControl: { navigateToPage },
  } = props;

  return (
    <div className={classes.card}>
      <Typography>Calculadora promedio</Typography>
      <Button onClick={() => navigateToPage({ route: "/pga" })}>PGA</Button>
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
  cardControl: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
