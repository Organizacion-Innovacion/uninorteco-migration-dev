import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React, { ChangeEvent, useState } from "react";
import { useIntl } from "react-intl";
import { setupLogger } from "../util/setup-logger";
import { AppLogger } from "../core/config/logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import RequireTextField from "./components/RequiredTextField";
import DropdownComponent from "./components/DropdownComponent";
import ButtonComponent from "./components/ButtonComponent";

// setup logger for card
setupLogger();

const myLogger = AppLogger.getAppLogger().createContextLogger("main card");

const styles = () => ({
  card: {
    marginTop: 0,
    marginRight: spacing40,
    marginBottom: 0,
    marginLeft: spacing40,
  },
});

interface HomeProps {
  classes: any;
}

const Home: React.FC<HomeProps> = (props) => {
  const { classes } = props;
  const intl = useIntl();

  myLogger.debug("card template 1");

  const [state, updateState] = useState({
    degrees: "",
    initialValue: "",
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const valueIsNone = event.target.value === "None";
    if (valueIsNone) {
      updateState({
        ...state,
        degrees: state.initialValue,
      });
    } else {
      updateState({
        ...state,
        degrees: event.target.value,
      });
    }
  };

  return (
    <div className={classes.card}>
      <DropdownComponent
        placeholder={intl.formatMessage({ id: "card.dropdown" })}
        handleChange={handleChange}
        degrees={state.degrees}
      />
      <Typography>{intl.formatMessage({ id: "card.label1" })}</Typography>
      <RequireTextField
        customId="TextFieldMultiline"
        placeholder={intl.formatMessage({ id: "card.inputText" })}
      />
      <Typography>{intl.formatMessage({ id: "card.label2" })}</Typography>
      <RequireTextField
        customId="TextFieldFullWidth"
        placeholder={intl.formatMessage({ id: "card.inputText2" })}
        multiline
      />
      <RequireTextField
        customId="TextFieldExt"
        placeholder={intl.formatMessage({ id: "card.inputText3" })}
      />
      <ButtonComponent textButton={intl.formatMessage({ id: "card.button" })} />
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const HomeWithStyles = withStyles(styles)(Home);

export default withIntl(HomeWithStyles);
