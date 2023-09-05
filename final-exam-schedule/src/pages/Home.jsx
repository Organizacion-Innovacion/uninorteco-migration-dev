import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
// import { useIntl } from "react-intl";
import { calculateDistance } from "../core/common/utils";
// import { APP_ENV_VARS } from "../core/config/app-env-vars";
import { AppLogger } from "../core/config/logger";
// import { CardMessage } from "./components/CardMessage";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";

// set up a context to help to identify the log messages
const myLogger = AppLogger.getAppLogger().createContextLogger("home.jsx");

const styles = () => ({
  card: {
    margin: `0 ${spacing20}`,
  },
});

const Home = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  // const intl = useIntl();

  setPageTitle("Nombre de la funcionalidad");

  const distance = calculateDistance(11.1, -74.11, 11.2, -73.11);
  // this will print "home.jsx: the distance is <number>"
  myLogger.debug(`the distance is ${distance}`);

  return (
    <div className={classes.card}>
      <Typography>hola</Typography>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const HomeWithStyles = withStyles(styles)(Home);

export default withIntl(HomeWithStyles);