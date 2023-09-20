import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";

const styles = () => ({
  card: {
    margin: `0 ${spacing20}`,
  },
});

const HomePage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();

  setPageTitle("Calificaciones");

  return (
    <div className={classes.card}>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis voluptates
        exercitationem eius, optio cumque aut, pariatur laborum repellendus quasi eaque
        explicabo! Asperiores assumenda necessitatibus eveniet facere officiis sequi
        corrupti accusamus.
      </Typography>
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
