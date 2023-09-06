import { withStyles } from "@ellucian/react-design-system/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { TabRouter } from "./sections/TabRouter";
import { usePageToolbar } from "../../hooks/usePageToolbar";
import { defaultFinalGradeHowMuchTabs } from "../common/utils";
import { useTabLayout } from "../../components/TabLayout/useTabLayout";
import { TabLayout } from "../../components/TabLayout";

const styles = () => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
});

const PGASemesterPage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout({
    tabs: defaultFinalGradeHowMuchTabs,
  });

  setPageTitle("Promedio General Acumulado");
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

PGASemesterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PGASemesterPage);
