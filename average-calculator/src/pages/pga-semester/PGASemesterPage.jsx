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
import { TabRouter } from "./sections/TabRouter";

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
  tabContent: {
    display: "flex",
    flexDirection: "column",
  },
});

const PGASemesterPage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const [tabValue, setTabValue] = useState({
    index: 0,
    text: "Mi nota final es",
  });

  setPageTitle("Promedio General Acumulado");

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
        <TabLayoutContent className={classes.tabContent}>
          <TabRouter index={tabValue.index} />
        </TabLayoutContent>
      </TabLayout>
    </div>
  );
};

PGASemesterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PGASemesterPage);
