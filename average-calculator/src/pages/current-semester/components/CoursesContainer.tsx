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
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
    },
  },
});

function CoursesContainerStyles({ children, sxProps, classes }: CoursesContainerProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        ...sxProps,
      }}
      className={classes.root}
    >
      {children}
    </Box>
  );
}

type CoursesContainerType = typeof CoursesContainerStyles;

const CoursesContainer = withStyles(styles)(
  CoursesContainerStyles
) as CoursesContainerType;

export { CoursesContainer };
