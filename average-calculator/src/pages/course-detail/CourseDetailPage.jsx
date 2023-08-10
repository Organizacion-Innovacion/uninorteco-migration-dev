import { withStyles } from "@ellucian/react-design-system/core/styles";
import React from "react";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useParams } from "react-router-dom";
// set up a context to help to identify the log messages

const styles = () => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
});

const CourseDetailPage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();

  const { courseId } = useParams();

  setPageTitle(`Asignatura id: ${courseId}`);

  return (
    <div className={classes.page}>
      <p>hola asignatura</p>
    </div>
  );
};

CourseDetailPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseDetailPage);
