import React from "react";
import PropTypes from "prop-types";
import { setupLogger } from "../util/setup-logger";
import { AppRouter } from "./Routes";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { setupRepository } from "../util/setup-repository";
import { JwtStore } from "../core/repositories/rest/jwtStore";

// setup logger for all pages
setupLogger("grades");
setupRepository();

function App(props) {
  const {
    data: { getExtensionJwt },
  } = props;

  JwtStore.getJwtStore().setJwtFunc(getExtensionJwt);

  return <AppRouter {...props} />;
}

App.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withIntl(App);
