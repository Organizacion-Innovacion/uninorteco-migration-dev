import { withStyles } from "@ellucian/react-design-system/core/styles";
import { Typography } from "@ellucian/react-design-system/core";
import { spacing40 } from "@ellucian/react-design-system/core/styles/tokens";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import { useIntl } from "react-intl";
import { setupLogger } from "../util/setup-logger";
import { AppLogger } from "../core/config/logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { FinalExamService } from "../core/domain-logic/final-exam-domain";
import NextExam from "../components/nextExam/NextExam";
import { DividerSectionCard } from "../components/dividerSectionCard/DividerSectionCard";

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
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  myLogger.debug("card examenes finales");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await finalExamService.getNextExam();
        setExam(data);
        setLoading(false);
      } catch (errorRepository) {
        setError(errorRepository);
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Hubo un error: {error.message}</p>;
  }

  return (
    <div className={classes.card}>
      {exam ? (
        <>
          <DividerSectionCard title="Próximo examen" />
          <NextExam
            title={exam.DESCRIPCION}
            fecha={exam.FECHA}
            hour={exam.HORA}
            teacher={exam.PROFESOR}
            classRoom={exam.LUGAR}
          />
        </>
      ) : (
        <Typography>No hay exámenes finales disponibles.</Typography>
      )}
    </div>
  );
}

MainCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MainCardWithStyles = withStyles(styles)(MainCard);

export default withIntl(MainCardWithStyles);
