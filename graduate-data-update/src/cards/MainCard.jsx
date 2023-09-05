import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography, Divider, Grid } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React from "react";
// import { useIntl } from "react-intl";
import { Icon, IconSprite } from "@ellucian/ds-icons/lib";
import { setupLogger } from "../util/setup-logger";
import { AppLogger } from "../core/config/logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";

// setup logger for card
setupLogger();

const myLogger = AppLogger.getAppLogger().createContextLogger("main card");

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  card: {
    marginTop: 0,
    marginRight: spacing40,
    marginBottom: 0,
    marginLeft: spacing40,
  },
  icon: {
    textAlign: 'end',
  },
  paragraph:{
    marginLeft: 0,
    marginTop: 0,
    marginRight: spacing40,
    marginBottom: 0,
  },
  divider:{
  }
});

function MainCard(props) {
  const { classes } = props;
  // const intl = useIntl();

  myLogger.debug("card template 1");

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.card}>
          <Typography>
            Porque te queremos cerca siempre, ayúdanos a validar, completar y actualizar
            tus datos
          </Typography>
        </Grid>
        <IconSprite />
        <Grid item xs={2} className={classes.icon}>
          <Icon name="check" />
        </Grid>
        <Grid item xs={9} className={classes.paragraph}>
          <Typography>
            Tus datos se encuentran actualizados/Tus datos pueden estar desactualizados
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.divider}>
          <Divider variant="middle" />
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
