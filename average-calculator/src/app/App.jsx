import React from "react";
import PropTypes from "prop-types";
import { setupLogger } from "../util/setup-logger";
import { AppRouter } from "./Routes";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { JwtStore } from "../core/repositories/rest/jwtStore";
import { setupRepository } from "../util/setup-repository";

// setup logger for all pages
setupLogger();
setupRepository();

function App(props) {
  // eslint-disable-next-line react/destructuring-assignment
  JwtStore.getJwtStore().setJwtFunc(props.data.getExtensionJwt);

  return <AppRouter {...props} />;
}

App.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withIntl(App);
