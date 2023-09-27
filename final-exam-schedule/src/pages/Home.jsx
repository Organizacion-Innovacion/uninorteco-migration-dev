import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { FinalExamService } from "../core/domain-logic/final-exam-domain";
import { DateTimeService } from "../core/domain-logic/date-services";
import HeaderComponent from "./components/headerCoponent/HeaderComponent";
import CardComponent from "./components/cardComponent/CardComponent";

const styles = () => ({
  card: {
    margin: `0 ${spacing20}`,
  },
});

const Home = ({ classes }) => {
  const { setPageTitle } = usePageControl();
  const finalExamService = new FinalExamService();

  setPageTitle("Horario exámenes finales");

  const [dato, setDato] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const groupedExams = await finalExamService.getGroupExamByDate();
        setDato(groupedExams);
        setLoading(false);
      } catch (errorApi) {
        setError(errorApi);
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
      {Object.keys(dato).map((fecha) => {
        const { dia, month, año, dayName } = DateTimeService.formatDate(fecha);
        return (
          <div key={fecha}>
            <HeaderComponent day={dia} month={month} year={año} dayName={dayName} />
            {dato[fecha].map((item) => (
              <CardComponent
                key={item.CODIGO_ESTUDIANTE}
                title={item.DESCRIPCION}
                hour={item.HORA}
                teacher={item.PROFESOR}
                classRoom={item.LUGAR}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const HomeWithStyles = withStyles(styles)(Home);

export default withIntl(HomeWithStyles);
