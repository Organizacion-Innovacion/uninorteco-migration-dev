import { withStyles } from "@ellucian/react-design-system/core/styles";
import { Typography, Divider, Grid } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React from "react";
// import { useIntl } from "react-intl";
import { Icon } from "@ellucian/ds-icons/lib";
import { setupLogger } from "../util/setup-logger";
// import { AppLogger } from "../core/config/logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { styles } from "./MainCardStyles";

// setup logger for card
setupLogger();

// const myLogger = AppLogger.getAppLogger().createContextLogger("main card");

function MainCard(props) {
  const { classes } = props;
  // const intl = useIntl();

  // myLogger.debug("card template 1");

  return (
    <div className={classes.card}>
      <Grid container spacing={1}>
        <Grid item xs={12} className={classes.gridItemMarginBottom}>
          <Typography>
            Porque te queremos cerca siempre, ayúdanos a validar, completar y actualizar
            tus datos
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.Icon}>
          <Icon name="check" className={classes.iconColor}/>
        </Grid>
        <Grid item xs={10} >
          <Typography>
            Tus datos se encuentran actualizados
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.divider}>
          <Divider variant="middle" className={classes.dividerColor}/>
        </Grid>
      </Grid>
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
