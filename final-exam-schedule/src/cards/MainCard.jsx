import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import { Typography } from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React,{useEffect} from "react";
// import { useIntl } from "react-intl";
import { setupLogger } from "../util/setup-logger";
import { AppLogger } from "../core/config/logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { FinalExamService } from "../core/domain-logic/final-exam-domain";

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

function MainCard(props) {
  const { classes } = props;
  // const intl = useIntl();
  const finalExamService = new FinalExamService();

  myLogger.debug("card examenes finales");

  useEffect(() => {
    async function fetchData() {
      try {
        const exam = await finalExamService.getNextExam();
        console.log(exam);
      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.card}>
      <Typography>Horario de Examenes finales</Typography>
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
