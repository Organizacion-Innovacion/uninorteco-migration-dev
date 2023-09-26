import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
// import { useIntl } from "react-intl";
import { calculateDistance } from "../core/common/utils";
import { AppLogger } from "../core/config/logger";
import { withIntl } from "../i18n/ReactIntlProviderWrapper";
import HeaderComponent from "./components/headerCoponent/HeaderComponent";
import CardComponent from "./components/cardComponent/CardComponent";
import { MyRepository } from "../core/repositories/repo-rest";

// set up a context to help to identify the log messages
const myLogger = AppLogger.getAppLogger().createContextLogger("home.jsx");

const styles = () => ({
  card: {
    margin: `0 ${spacing20}`,
  },
});

const Home = (props) => {
  const { classes, data } = props;
  const { setPageTitle } = usePageControl();
  // const intl = useIntl();
  const myRepository = new MyRepository();

  setPageTitle("Horario examenes finales");

  const distance = calculateDistance(11.1, -74.11, 11.2, -73.11);
  // this will print "home.jsx: the distance is <number>"
  myLogger.debug(`the distance is ${distance}`);


  const [dato, setDato] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        await myRepository.fetchFinalExams();
        const finalExamResponse = await myRepository.getFinalExamResponse();
        // Resto de tu lógica para procesar los datos
        // ...

        console.log(finalExamResponse.resultado);
        // Objeto para almacenar los elementos agrupados por fecha
        const grupos = {};

        // Itera sobre los elementos y agrúpalos por fecha
        finalExamResponse.resultado.forEach((item) => {
          const fecha = item.FECHA;
          if (!grupos[fecha]) {
            grupos[fecha] = [];
          }
          grupos[fecha].push(item);
        });
        console.log(grupos);
        setDato(grupos);
        setLoading(false);
      } catch (errorApi) {
        setError(errorApi);
        setLoading(false);
      }
    }

    fetchData();
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

        // Crear un objeto Date
        const fechaObj = new Date(año, mes - 1, dia); // Meses en JavaScript van de 0 a 11, por eso restamos 1

        // Obtener el nombre del día de la semana
        const opciones = { weekday: "long" }; // "long" para obtener el nombre completo del día
        const nombreDia = new Intl.DateTimeFormat("es-ES", opciones).format(fechaObj);

        return (
          <div key={fecha}>
            <HeaderComponent day={dia} month={mes} year={año} dayName={nombreDia} />
            {dato[fecha].map((item) => (
              <CardComponent
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
  data: PropTypes.shape({
    getExtensionJwt: PropTypes.func.isRequired,
  }).isRequired,
};

const HomeWithStyles = withStyles(styles)(Home);

export default withIntl(HomeWithStyles);
