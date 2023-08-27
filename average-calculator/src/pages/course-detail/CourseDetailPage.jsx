import { withStyles } from "@ellucian/react-design-system/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useParams } from "react-router-dom";
import { TabRouter } from "./sections/TabRouter";
import { useTabLayout } from "../../components/HowMuchFinalTabLayout/useTabLayout";
import { HowMuchFinalTabLayout } from "../../components/HowMuchFinalTabLayout";

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

  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout();

  return (
    <div className={classes.page}>
      <HowMuchFinalTabLayout
        index={tabLayoutValue.index}
        tabs={tabLabels}
        onIndexChange={onIndexChange}
      >
        <TabRouter index={tabLayoutValue.index} />
      </HowMuchFinalTabLayout>
    </div>
  );
};

CourseDetailPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseDetailPage);
