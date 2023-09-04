import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

export function AppRouter(props) {
  const { pageInfo } = props;

  return (
    <Router basename={pageInfo.basePath}>
      <Switch>
        <Route path="/">
          <Home {...props} />
        </Route>
        <Route path="/Home">
          <Home {...props} />
        </Route>
      </Switch>
    </Router>
  );
}

AppRouter.propTypes = {
  pageInfo: PropTypes.object,
};
