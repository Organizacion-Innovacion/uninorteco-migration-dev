/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { v4 as uuidv4 } from "uuid";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography, Button, Link } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useIntl } from "react-intl";
import { useGetCourse } from "../hooks/useGetCourse";
import { calculateDistance } from "../core/common/utils";
import { APP_ENV_VARS } from "../core/config/app-env-vars";
import { useNotifications } from "../hooks/useNotifications";
import { AppLogger } from "../core/config/logger";
import FileCard from "./components/FileCard";
import ExamCard from "./components/ExamCard";
import NotificationCard from "./components/NotificationCard";

const myLogger = AppLogger.getAppLogger().createContextLogger("home.jsx");
const styles = () => ({
  card: {
    margin: `0 ${spacing20}`,
    border: "1px solid #e0e0e0",
    padding: "20px",
    borderRadius: "5px",
    marginBottom: "20px",
  },
});

const HomePage = (props) => {
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const intl = useIntl();

  setPageTitle("Nombre de la funcionalidad");

  const distance = calculateDistance(11.1, -74.11, 11.2, -73.11);
  const { notifications, loading, error } = useNotifications();
  const { course } = useGetCourse();
  myLogger.debug(`notifications: ${notifications}`);
  myLogger.debug(`the distance is ${distance}`);
  myLogger.debug(`loading: ${loading}`);
  myLogger.debug(`error: ${error}`);
  console.log("notifications from hook: ", notifications);
  console.log("course from hook: ", course);
  useEffect(() => {
    myLogger.debug("useEffect");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {notifications.map((notification) => (
        <NotificationCard
          key={uuidv4()}
          Title={notification.Title}
          Message={notification.Message}
          AlertDateTime={notification.AlertDateTime}
          IconURL={notification.IconURL}
          Course={notification.Course}
        />
      ))}
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
