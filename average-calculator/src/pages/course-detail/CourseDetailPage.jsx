import { withStyles } from "@ellucian/react-design-system/core/styles";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useParams } from "react-router-dom";
import { TabRouter } from "./sections/TabRouter";
import { useTabLayout } from "../../components/HowMuchFinalTabLayout/useTabLayout";
import { HowMuchFinalTabLayout } from "../../components/HowMuchFinalTabLayout";
import { useCourse } from "./hooks/useCourse";

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
  const { course } = useCourse({ courseId });
  const { onIndexChange, tabLabels, tabLayoutValue } = useTabLayout();

  useEffect(() => {
    if (course) {
      setPageTitle(course.name);
    } else {
      setPageTitle("Cargando Curso");
    }
  }, [course, setPageTitle]);

  return (
    <div className={classes.page}>
      {course && (
        <HowMuchFinalTabLayout
          index={tabLayoutValue.index}
          tabs={tabLabels}
          onIndexChange={onIndexChange}
        >
          <TabRouter index={tabLayoutValue.index} course={course} />
        </HowMuchFinalTabLayout>
      )}
    </div>
  );
};

CourseDetailPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseDetailPage);
