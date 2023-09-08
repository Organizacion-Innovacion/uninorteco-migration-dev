import { withStyles } from "@ellucian/react-design-system/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { setupLogger } from "../util/setup-logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { MainCardContent } from "./components/MainCardContent";

// setup logger for card
setupLogger();

const styles = () => ({
  card: {
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    flexDirection: "column",
  },
});

function MainCard(props) {
  const { classes } = props;

  return (
    <div className={classes.card}>
      <MainCardContent />
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
