/* eslint-disable import/no-duplicates */
import { withStyles } from "@ellucian/react-design-system/core/styles";
import { Typography, Divider } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React from "react";
import { Icon, IconSprite, icons } from "@ellucian/ds-icons/lib";

import { NotificationBadge } from "@ellucian/react-design-system/core";

import { useIntl } from "react-intl";
import { setupLogger } from "../util/setup-logger";
import { AppLogger } from "../core/config/logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
// setup logger for card
setupLogger();

const myLogger = AppLogger.getAppLogger().createContextLogger("main card");

const styles = () => ({
  card: {
    marginTop: 0,
    marginRight: "40px",
    marginLeft: "40px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
    alignItems: "center",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "3rem",
    alignItems: "center",
    width: "50%",
  },
  notifications: {
    width: "100%",
    marginTop: "40px",
  },
});

function MainCard(props) {
  const { classes } = props;
  const intl = useIntl();
  myLogger.debug("card template 1");

  return (
    <div className={classes.card}>
      <IconSprite />
      {/* <div className={classes.grid}>
        <div className={classes.item}>
          <NotificationBadge variant="dot">
            <Icon name="notification" style={{ width: 28, height: 28 }} />
          </NotificationBadge>
          <Typography style={{ marginTop: "1rem" }}>Notificaciones</Typography>
        </div>
        <div className={classes.item}>
          <NotificationBadge variant="dot">
            <Icon name="paperclip" style={{ width: 28, height: 28 }} />
          </NotificationBadge>

          <Typography style={{ marginTop: "1rem" }}>Contenido</Typography>
        </div>
      </div> */}
      <div className={classes.grid}>
        <div className={classes.item}>
          <NotificationBadge badgeContent={5} maxvalue={999}>
            <Icon name="file-text" style={{ width: 28, height: 28 }} />
          </NotificationBadge>

          <Typography style={{ marginTop: "1rem" }}>Examenes</Typography>
        </div>
        <div className={classes.item}>
          <NotificationBadge badgeContent={3} maxvalue={999}>
            <Icon name="comments" style={{ width: 28, height: 28 }} />
          </NotificationBadge>

          <Typography style={{ marginTop: "1rem" }}>Mensajes</Typography>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          // alignItems: "center",
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
          padding: "1rem",
          // marginTop: "0.2rem",
          width: "310px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Icon name="file-text" style={{ width: 60, height: 60, marginRight: "1rem" }} />
        <div>
          <Typography variant="h4" style={{ marginBottom: "0.2rem" }}>
            Evaluación publicada
          </Typography>
          <Typography
            variant="body2"
            style={{ color: "#ccc", fontSize: "12px", fontWeight: "700" }}
          >
            Hace 2 horas
          </Typography>
          <Typography>
            Nueva evaluación disponible en el curso{" "}
            <strong>Ingeniería de Software I</strong>
          </Typography>
        </div>
      </div>
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);
export default withIntl(MainCardWithStyles);
