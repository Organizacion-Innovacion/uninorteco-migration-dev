import { spacing20 } from "@ellucian/react-design-system/core/styles/tokens";

/**
 * Estilos para el componente HomePage.
 *
 * Utiliza tokens de diseño proporcionados por "@ellucian/react-design-system" para mantener la coherencia.
 *
 * @returns objeto de estilos
 */
export const styles = () => ({
  /**
   * Estilo para el contenedor principal del componente.
   */
  card: {
    margin: `10px 20px`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: spacing20,
  },

  /**
   * Estilo para las etiquetas que representan las categorías.
   */
  chip: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    color: "gray",
    fontSize: "14px",
    fontWeight: "bold",
  },

  /**
   * Estilo para el contenedor que alberga los campos de entrada (por ejemplo, la búsqueda y la selección de categoría).
   */
  inputs: {
    display: "flex",
    gap: spacing20,
  },

  /**
   * Estilo para el contenedor de los resultados de búsqueda.
   */
  container: {},
});
