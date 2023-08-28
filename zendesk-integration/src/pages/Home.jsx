import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import {
  Typography,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
} from "@ellucian/react-design-system/core";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { usePageControl } from "@ellucian/experience-extension-utils";
import axios from "axios";
import { useIntl } from "react-intl";
import { calculateDistance } from "../core/common/utils";
import { APP_ENV_VARS } from "../core/config/app-env-vars";
import { AppLogger } from "../core/config/logger";
import { CardMessage } from "./components/CardMessage";

// set up a context to help to identify the log messages
const myLogger = AppLogger.getAppLogger().createContextLogger("home.jsx");

const styles = () => ({
  card: {
    margin: `10px 20px`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacing20,
  },
});

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    
    axios
      .get(`http://localhost:3000/api/proxy?query=${encodeURIComponent(searchQuery)}`)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setResults(response.data.results);
        setLoading(false);
        console.log("results: ", response.data.results);
      })
      .catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(err);
        setLoading(false);
      });
  }, [searchQuery]);
  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const intl = useIntl();

  setPageTitle("Nombre de la funcionalidad");

  const distance = calculateDistance(11.1, -74.11, 11.2, -73.11);
  // this will print "home.jsx: the distance is <number>"
  myLogger.debug(`the distance is ${distance}`);
  const customId = "VisuallyAccentedCard";
  return (
    <div className={classes.card}>
      <TextField
        label="Buscar"
        variant="outlined"
        style={{ marginBottom: "2rem" }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {loading && <CircularProgress aria-valuetext="Retreiving data" />}
      {error && (
        <div className="error">Error: there was an error loading the content</div>
      )}
      {!results && (
        <CardMessage
          title="¿Tienes preguntas?"
          description="Visita el Centro de Ayuda para obtener respuestas a las preguntas más frecuentes o escribe tu pregunta"
          illustrationName="no-messages"
        />
      )}
      {results && (
        <div className="results">
          {results.map((result) => (
            <div className={classes.container} id={`${customId}_GridContainer`}>
              <Card
                className={classes.card}
                id={`${customId}_Card0`}
                accent="secondary"
              >
                <CardHeader title={result.title} />
                <CardContent id={`${customId}_CardContent0`}>
                  {React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: result.body },
                  })}
                </CardContent>
              </Card>
            </div>

            // <div
            //   key={result.id}
            //   style={{
            //     backgroundColor: "#f2f2f2",
            //     borderRadius: "5px",
            //     padding: "10px",
            //     margin: " 10px",
            //     width: "300px",
            //   }}
            // >
            //   <p>
            //     <strong>Título: </strong>
            //     {result.title}
            //   </p>
            //   <p>
            //     <strong>contenido: </strong>
            //     {React.createElement("div", {
            //       dangerouslySetInnerHTML: { __html: result.body },
            //     })}
            //   </p>
            // </div>
          ))}
        </div>
      )}
    </div>
  );
};

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
