import { withStyles } from "@ellucian/react-design-system/core/styles";
import React from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { CoursesPageContent } from "./CoursesPageContent";

const styles = () => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
});

interface CurrentSemesterPageProps {
  classes: any;
  [key: string]: any;
}

const CurrentSemesterPage = (props: CurrentSemesterPageProps) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();

  setPageTitle("Mis calificaciones");

  return (
    <div className={classes.page}>
      <CoursesPageContent periods={["202310", "202230", "202210"]} />
    </div>
  );
};

export default withStyles(styles)(CurrentSemesterPage);
