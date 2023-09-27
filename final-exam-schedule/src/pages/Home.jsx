import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import { MyRepository } from "../core/repositories/repo-rest";
import { FinalExamService } from "../core/domain-logic/final-exam-domain";
import HeaderComponent from "./components/headerCoponent/HeaderComponent";
import CardComponent from "./components/cardComponent/CardComponent";

const styles = () => ({
  card: {
    margin: `0 ${spacing20}`,
  },
});

const Home = ({ classes }) => {
  const { setPageTitle } = usePageControl();
  const myRepository = new MyRepository();
  const finalExamService = new FinalExamService(myRepository);

  setPageTitle("Horario examenes finales");

  const [dato, setDato] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await myRepository.fetchFinalExams();
        const finalExamResponse = await myRepository.getAllFinalExams();
        const groupedExams = await finalExamService.getGroupExamByDate(
          finalExamResponse
        );
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
        const [dia, mes, año] = fecha.split("/").map(Number);
        const fechaObj = new Date(año, mes - 1, dia);
        const options = { weekday: "long" };
        const nombreDia = new Intl.DateTimeFormat("es-ES", options).format(fechaObj);

        return (
          <div key={fecha}>
            <HeaderComponent day={dia} month={mes} year={año} dayName={nombreDia} />
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