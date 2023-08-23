import React from "react";
import { withStyles } from "@ellucian/react-design-system/core/styles";
// import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import {
  Typography,
  TextLink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@ellucian/react-design-system/core";
import { Icon } from "@ellucian/ds-icons/lib";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { setupLogger } from "../util/setup-logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { DividerSectionCard } from "../components/DividerSectionCard";
// setup logger for card
setupLogger();

const styles = (theme) => ({
  card: {
    marginTop: 0,
    marginRight: "1.5rem",
    marginBottom: 0,
    marginLeft: "1.5rem",
    display: "flex",
    flexDirection: "column",
  },
  dbLink: {
    alignSelf: "flex-end",
    textDecoration: "none",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginRight: "0.5rem",
  },
  lisItemIcon: {
    minWidth: "30px",
  },
  iconColor: {
    color: theme.palette.grey["500"],
  },
});

const otherServices = [
  {
    name: "card.otherService.sibilaPlus",
    url: "https://primo-tc-na01.hosted.exlibrisgroup.com/primo-explore/search?search_scope=uninorte_completo&vid=UNINORTE&lang=es_CO",
    iconName: "globe",
  },
  {
    name: "card.otherService.atoz",
    url: "http://ezproxy.uninorte.edu.co:2048/login?url=http://sfxna11.hosted.exlibrisgroup.com/57UNINORTE/az?lang=spa",
    iconName: "globe",
  },
  {
    name: "card.otherService.digitalRepository",
    url: "http://manglar.uninorte.edu.co/",
    iconName: "globe",
  },
];

function MainCard(props) {
  const { classes } = props;
  const intl = useIntl();

  return (
    <div className={classes.card}>
      <DividerSectionCard title={intl.formatMessage({ id: "card.dbHeader" })} />
      <Typography variant="body1" sx={{ my: 2 }}>
        {intl.formatMessage({ id: "card.dbContent" })}
      </Typography>
      <TextLink href="https://uninorte.libguides.com/az.php" className={classes.dbLink}>
        {intl.formatMessage({ id: "card.dbButton" })}
      </TextLink>
      <DividerSectionCard
        title={intl.formatMessage({ id: "card.otherServicesHeader" })}
        stackProps={{ mb: 1 }}
      />
      <List dense sx={{ mb: 4 }}>
        {otherServices.map((service) => (
          <ListItemButton component="a" href={service.url} key={service.name}>
            <ListItemIcon className={classes.lisItemIcon}>
              <Icon name={service.iconName} className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary={intl.formatMessage({ id: service.name })} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
