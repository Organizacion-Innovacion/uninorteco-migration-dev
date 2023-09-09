import { withStyles } from "@ellucian/react-design-system/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { setupLogger } from "../util/setup-logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { MainCardContent } from "./components/MainCardContent";
import { JwtStore } from "../core/repositories/rest/jwtStore";
import { setupRepository } from "../util/setup-repository";

// setup logger for card
setupLogger();
setupRepository();

const styles = () => ({
  card: {
    marginTop: 0,
    marginBottom: 0,
    display: "flex",
    flexDirection: "column",
  },
});

function MainCard(props) {
  const { classes, data } = props;

  JwtStore.getJwtStore().setJwtFunc(data.getExtensionJwt);

  return (
    <div className={classes.card}>
      <MainCardContent />
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
