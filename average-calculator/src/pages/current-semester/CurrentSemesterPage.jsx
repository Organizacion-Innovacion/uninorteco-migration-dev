import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  TabLayout,
  Tab,
  Tabs,
  TabLayoutContent,
} from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { TabRouter } from "./TabRouter";

// set up a context to help to identify the log messages

const styles = () => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
  tabLayout: {
    maxWidth: "1000px",
    width: "100%",
    marginBottom: "1rem",
  },
});

const CurrentSemesterPage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const [tabValue, setTabValue] = useState({
    index: 0,
    text: "Mi nota final es",
  });

  setPageTitle("Mis asignaturas");

  return (
    <div className={classes.page}>
      <TabLayout className={classes.tabLayout} style={{ padding: 0 }}>
        <Tabs
          onChange={(e, val) =>
            setTabValue({
              index: val,
              text: e.currentTarget.dataset.text,
            })
          }
          value={tabValue.index}
        >
          <Tab label="Mi nota final es" />
          <Tab label="Cuanto necesito" />
        </Tabs>
        <TabLayoutContent>
          <TabRouter index={tabValue.index} />
        </TabLayoutContent>
      </TabLayout>
    </div>
  );
};

CurrentSemesterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentSemesterPage);
