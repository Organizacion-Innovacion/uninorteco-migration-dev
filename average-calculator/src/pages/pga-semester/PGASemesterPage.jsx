import { withStyles } from "@ellucian/react-design-system/core/styles";
import React from "react";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
// set up a context to help to identify the log messages

const styles = () => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
});

const PGASemesterPage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();

  setPageTitle("Promedio General Acumulado");

  return (
    <div className={classes.page}>
      <p>hola pga/semestre</p>
    </div>
  );
};

PGASemesterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PGASemesterPage);
