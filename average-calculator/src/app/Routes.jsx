import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CurrentSemesterPage from "../pages/current-semester/CurrentSemesterPage";
import CourseDetailPage from "../pages/course-detail/CourseDetailPage";
import PGASemesterPage from "../pages/pga-semester/PGASemesterPage";

export function AppRouter(props) {
  const { pageInfo } = props;

  return (
    <Router basename={pageInfo.basePath}>
      <Switch>
        <Route path="/pga">
          <PGASemesterPage {...props} />
        </Route>
        <Route path="/courses/:courseId">
          <CourseDetailPage {...props} />
        </Route>
        <Route path="/">
          <CurrentSemesterPage {...props} />
        </Route>
      </Switch>
    </Router>
  );
}

AppRouter.propTypes = {
  pageInfo: PropTypes.object,
};
