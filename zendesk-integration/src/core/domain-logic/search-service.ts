import axios from "axios";
import { APP_ENV_VARS } from "../config/app-env-vars";
/**
 * Función debouncedSearch
 * Realiza una búsqueda debounced (retrasada) utilizando Axios para obtener resultados.
 *
 * @param query - El término de búsqueda proporcionado por el usuario.
 * @param setSearchResults - Función para establecer los resultados de la búsqueda en el estado del componente.
 * @param setLoading - Función para establecer el estado de carga en el componente.
 * @param setError - Función para establecer cualquier error que pueda surgir durante la búsqueda.
 */
export const debouncedSearch = (
  query: string,
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<null | Error>>
) => {
  // Si la consulta está vacía, restablecemos los resultados y salimos de la función.
  if (query.trim() === "") {
    setSearchResults([]);
    return;
  }

  // Establecemos el estado de carga en verdadero al iniciar la búsqueda.
  setLoading(true);
  // Resetamos cualquier error previo.
  setError(null);

  // Realizamos la solicitud HTTP para obtener los resultados de la búsqueda.
  axios
    .get(`${APP_ENV_VARS.apiBaseUrl}${encodeURIComponent(query)}`)
    .then((response) => {
      // Procesamos la respuesta y aplanamos los resultados.
      const flatResults = response.data.map((result: any) => result.results).flat();
      // Establecemos el estado de carga en falso después de obtener los resultados.
      setLoading(false);
      // Actualizamos el estado con los nuevos resultados.
      setSearchResults(flatResults);
    })
    .catch((err: Error) => {
      console.error("Error in debounce search: ", err);
      // Establecemos el estado de carga en falso
      setLoading(false);
      // En caso de error, lo registramos en el estado.
      setError(new Error("API Error"));
    });
};

/**
 * Función mapUrlToTitle
 * Mapea una URL a un título basado en ciertas coincidencias.
 *
 * @param url - La URL proporcionada para el mapeo.
 * @returns string - El título correspondiente para la URL.
 */
export const mapUrlToTitle = (url: string): string => {
  const FAQ_SOCIALS = "https://uninorteco.zendesk.com/";
  const FAQ_OFE = "https://ofeuninorteco.zendesk.com/";
  const FAQ_ADMISIONS = "https://admisionesuninorteco.zendesk.com/";
  const FAQ_ENGINEERS = "https://ingenieriauninorte.zendesk.com/";
  const MOQ = "https://moquninorteco.zendesk.com/";

  // Comparamos la URL proporcionada con las URL conocidas y devolvemos el título correspondiente.
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
  // Si no hay coincidencias, devolvemos "General".
  return "General";
};
