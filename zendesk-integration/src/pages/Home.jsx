import { withStyles } from "@ellucian/react-design-system/core/styles";
import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";
import debounce from "lodash.debounce";

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
  chip: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    color: "#000",
    fontSize: "14px",
    fontWeight: "bold",
  },
});

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = debounce((query) => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .get(
        `https://zendeks-server-bc3f690fa2db.herokuapp.com/api/proxy?query=${encodeURIComponent(
          searchQuery
        )}`
      )

      .then((response) => {
        const flatResults = response.data.map((result) => result.results).flat();
        setLoading(false);
        setResults(flatResults);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, 300);

  const mapUrlToTitle = (url) => {
    const FAQ_SOCIALS = "https://uninorteco.zendesk.com/";
    const FAQ_OFE = "https://ofeuninorteco.zendesk.com/";
    const FAQ_ADMISIONS = "https://admisionesuninorteco.zendesk.com/";
    const FAQ_ENGINEERS = "https://ingenieriauninorte.zendesk.com/";
    const MOQ = "https://moquninorteco.zendesk.com/";

    // the url has some other data, need to match only the first part
    if (url.includes(FAQ_SOCIALS)) {
      return "Derecho y ciencias políticas";
    }
    if (url.includes(FAQ_OFE)) {
      return "OFE";
    }
    if (url.includes(FAQ_ADMISIONS)) {
      return "Admisiones";
    }
    if (url.includes(FAQ_ENGINEERS)) {
      return "Ingenierías";
    }
    if (url.includes(MOQ)) {
      return "MOQ";
    }
    return "General";
  };

  useEffect(() => {
    debouncedSearch(searchQuery);
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
      {!loading && !error && results.length === 0 && (
        <div>No se encontraron resultados para su búsqueda.</div>
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
          {results?.map((result) => (
            <div className={classes.container} id={`${customId}_GridContainer`}>
              <Card
                className={classes.card}
                id={`${customId}_Card0`}
                accent="secondary"
              >
                <CardHeader
                  title={
                    <>
                      <Typography variant="h4" id={`${customId}_Typography0`}>
                        {result.title}
                      </Typography>
                      <p className={classes.chip}>{mapUrlToTitle(result.url)}</p>
                    </>
                  }
                />
                <CardContent id={`${customId}_CardContent0`}>
                  {React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: result.body },
                  })}
                </CardContent>
              </Card>
            </div>
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
