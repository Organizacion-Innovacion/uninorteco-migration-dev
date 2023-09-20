import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoursesPage from "../pages/courses/CoursesPage";

export function AppRouter(props) {
  const { pageInfo } = props;

  return (
    <Router basename={pageInfo.basePath}>
      <Switch>
        <Route path="/">
          <CoursesPage {...props} />
        </Route>
      </Switch>
    </Router>
  );
}

AppRouter.propTypes = {
  pageInfo: PropTypes.object,
};
