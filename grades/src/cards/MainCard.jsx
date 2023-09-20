import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React from "react";
import { useIntl } from "react-intl";
import { setupLogger } from "../util/setup-logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";

// setup logger for card
setupLogger("grades-card");

const styles = () => ({
  card: {
    marginTop: 0,
    marginRight: spacing40,
    marginBottom: 0,
    marginLeft: spacing40,
  },
});

function MainCard(props) {
  const { classes } = props;
  const intl = useIntl();

  return (
    <div className={classes.card}>
      <Typography>This is template card</Typography>
      <Typography>{intl.formatMessage({ id: "card.hellowMessage" })}</Typography>
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
