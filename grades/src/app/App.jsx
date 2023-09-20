import React from "react";
import { setupLogger } from "../util/setup-logger";
import { AppRouter } from "./Routes";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";

// setup logger for all pages
setupLogger("grades");

function App(props) {
  return <AppRouter {...props} />;
}

export default withIntl(App);
