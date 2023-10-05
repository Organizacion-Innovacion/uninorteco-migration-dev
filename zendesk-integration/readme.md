# Zendesk integration - Universidad del Norte

Este proyecto integra varios centros de ayuda creados con Zendesk dentro de la aplicación de la Universidad del Norte.

## Descripción

El sistema permite a los usuarios buscar información en diferentes categorías y centros de ayuda. La búsqueda es realizada a través de llamadas a la API de Zendesk y los resultados son presentados en una interfaz amigable.

## Características

- Búsqueda debounced: Optimización para evitar múltiples llamadas a la API durante la escritura del usuario.
- Categorías: Los resultados se pueden filtrar por diferentes categorías basadas en las URLs de Zendesk.
- Manejo de errores: Se informa al usuario si ocurre algún error durante la búsqueda.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

```
npm install
```

3. Ejecuta el proyecto:

```
npm run dev:server
```

## Estructura del Proyecto

- **HomePage**: Es el componente principal que representa la página del centro de ayuda.
- **search-service**: Contiene la lógica para realizar búsquedas debounced y mapear URLs a títulos de categorías.
- **Header**: Componente que muestra la barra de búsqueda y selección de categoría.
- **ResultsList**: Componente que muestra la lista de resultados de la búsqueda.

---

# Servidor Proxy para Zendesk

Este servidor actúa como un proxy para obtener datos de diferentes URLs de Zendesk basándose en una consulta.

## Configuración e Inicio

### 1. Dependencias:

- **axios**: Utilizado para realizar solicitudes HTTP.
- **dotenv**: Carga variables de entorno desde un archivo `.env`.
- **express**: Marco de servidor web.
- **node-cache**: Módulo de almacenamiento en caché en memoria.
- **nodemon**: Utilidad que monitorea cambios en el código fuente y reinicia el servidor automáticamente.

### 2. Ejecución del Servidor:

`cd server`

- Instala las dependencias usando `npm install`.
- Inicia el servidor con `npm start`.

### 3. Variables de Entorno:

- **PORT**: El puerto en el que se ejecutará el servidor. Por defecto es `5000` si no se especifica.
- **API_TOKEN**: El token de autorización necesario para hacer solicitudes a la API de Zendesk.

### 4. Endpoints:

- **Raíz (`/`)**: Responde con un mensaje indicando que el servidor está en funcionamiento.
- **Proxy (`/api/proxy`)**: Acepta un parámetro de consulta y obtiene datos de las URLs especificadas de Zendesk.

### 5. Caché:

El servidor utiliza `node-cache` para el almacenamiento en caché en memoria. Las respuestas se almacenan en caché durante 10 minutos para reducir el número de solicitudes a la API de Zendesk y mejorar los tiempos de respuesta.
