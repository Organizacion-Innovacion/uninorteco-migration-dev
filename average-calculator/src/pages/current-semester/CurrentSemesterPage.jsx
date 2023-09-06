import { withStyles } from "@ellucian/react-design-system/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { TabRouter } from "./sections/TabRouter";
import { usePageToolbar } from "../../hooks/usePageToolbar";
import { TabLayout } from "../../components/TabLayout";
import { defaultFinalGradeHowMuchTabs } from "../common/utils";
import { useTabLayout } from "../../components/TabLayout/useTabLayout";

// set up a context to help to identify the log messages

const styles = () => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
});

const CurrentSemesterPage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout({
    tabs: defaultFinalGradeHowMuchTabs,
  });

  setPageTitle("Mis asignaturas");
  usePageToolbar();

  return (
    <div className={classes.page}>
      <TabLayout
        index={tabLayoutValue.index}
        tabs={tabLabels}
        onIndexChange={onIndexChange}
      >
        <TabRouter index={tabLayoutValue.index} />
      </TabLayout>
    </div>
  );
};

CurrentSemesterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentSemesterPage);
