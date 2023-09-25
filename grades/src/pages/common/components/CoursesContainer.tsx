import React from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { Box } from "../../../components/Box";

// we cannot use SxProps type because ellucian path desing does not re export
// any component from mui library
export interface CoursesContainerProps {
  children: React.ReactNode;
  sxProps?: any;
  classes?: any;
}

const styles = (theme: any) => ({
  root: {
    columns: 1,
    columnGap: "0.5rem",
    [theme.breakpoints.up("md")]: {
      columns: 2,
    },
  },
});

function CoursesContainerStyles({ children, sxProps, classes }: CoursesContainerProps) {
  return (
    <Box sx={sxProps} className={classes.root}>
      {children}
    </Box>
  );
}

type CoursesContainerType = typeof CoursesContainerStyles;

const CoursesContainer = withStyles(styles)(
  CoursesContainerStyles
) as CoursesContainerType;

export { CoursesContainer };
