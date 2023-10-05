import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { usePageControl } from "@ellucian/experience-extension-utils";
import { useIntl } from "react-intl";

import { withStyles } from "@ellucian/react-design-system/core/styles";
import {
  Typography,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  DropdownItem,
  Dropdown,
} from "@ellucian/react-design-system/core";
import { debouncedSearch, mapUrlToTitle } from "../core/domain-logic/search-service";
import { styles } from "../styles/homeStyles";
import Header from "../components/header/Header";
import ResultsList from "../components/results-list/ResultsList";
import { SearchResult } from "../core/entities/SearchResult";
import { AppLogger } from "../core/config/logger";

import { CardMessage } from "./components/CardMessage";
// Logger personalizado para esta sección del código.
const myLogger = AppLogger.getAppLogger().createContextLogger("home.tsx");

// Tipos para las props del componente.
type HomePageProps = {
  classes: {
    card: string;
    chip: string;
    inputs: string;
    container: string;
  };
};

/**
 * Componente HomePage
 * Representa la página principal del sistema.
 *
 * @param props - Las propiedades del componente.
 * @returns JSX.Element - El componente renderizado.
 */
const HomePage: React.FC<HomePageProps> = (props) => {
  // Estado para controlar si se están cargando los resultados.
  const [loading, setLoading] = useState(false);
  // Estado para almacenar los resultados de la búsqueda.
  const [results, setResults] = useState<SearchResult[]>([]);

  // Estado para registrar y mostrar cualquier error.
  const [error, setError] = useState<null | Error>(null);
  // Estado para almacenar la consulta actual del usuario.
  const [searchQuery, setSearchQuery] = useState("");

  // Usando useEffect para realizar una búsqueda debounced cada vez que cambia searchQuery.
  useEffect(() => {
    debouncedSearch(searchQuery, setResults, setLoading, setError);
  }, [searchQuery]);

  const { classes } = props;
  const { setPageTitle } = usePageControl();
  const intl = useIntl();
  const customId = "VisuallyAccentedCard";

  // Establecer el título de la página.
  setPageTitle("Centro de Ayuda");

  // Estado para rastrear la categoría seleccionada.
  const [selectedCategory, setSelectedCategory] = useState("General");

  // Extraer categorías únicas de los resultados.
  const uniqueCategories = [
    ...new Set(results.map((result: SearchResult) => mapUrlToTitle(result.url))),
  ];

  // Manejador para el cambio de categoría.
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  // Filtrar los resultados basados en la categoría seleccionada.
  const filteredResults = results.filter(
    (result: SearchResult) =>
      mapUrlToTitle(result.url) === selectedCategory || selectedCategory === "General"
  );

  return (
    <div className={classes.card}>
      {/* Header con inputs de búsqueda */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        uniqueCategories={uniqueCategories}
        classes={{ inputs: classes.inputs }}
      />

      {/* Manejo de estados: carga, error y resultados. */}
      {loading && <CircularProgress aria-valuetext="Retrieving data" />}
      {error && (
        <div className="error">Error: Hubo un error al cargar el contenido.</div>
      )}
      {!loading && !error && results.length === 0 && (
        <div>No se encontraron resultados para su búsqueda.</div>
      )}
      {!results && (
        <CardMessage
          message={intl.formatMessage({
            id: "home.cardMessage",
            defaultMessage: "Bienvenido al Centro de Ayuda",
          })}
        />
      )}
      {/* Lista de resultados */}
      {results && <ResultsList results={filteredResults} classes={{ ...classes }} />}
    </div>  
  );
};

export default withStyles(styles)(HomePage);
