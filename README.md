
# WiFi Access Points API - Ciudad de México

## Introducción

 API GraphQL diseñada para consultar puntos de acceso WiFi públicos en la Ciudad de México. Utilizando datos abiertos del gobierno, la API permite a los usuarios realizar búsquedas de puntos de acceso por ubicación, colonia y proximidad a una coordenada específica. La API está construida con Node.js y utiliza MongoDB para almacenar los datos, mientras que Apollo Server facilita el servicio de consultas GraphQL.

## Dependencias y Versiones

- **Node.js**: 18.18.0
- **MongoDB**: 6.0 (local o MongoDB Atlas)
- **Apollo Server**: 3.0
- **Mongoose**: 6.0
- **csv-parser**: 3.0.0
- **dotenv**: 10.0.0

## Instrucciones de Despliegue

### Configuración del Entorno

1. Clona este repositorio y navega al directorio del proyecto:
   ```bash
   git clone <URL del repositorio>
   cd wifi-api-graphql
   ```

### Instalación de Dependencias

Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

### Carga de Datos desde el CSV

1. Para realizar la carga de datos se utilizó el script:
   ```bash
   node src/loadCSV.js
   ```
No es necesario volver a realizar este proceso.

### Despliegue con Docker

1. **Construye e inicia** los contenedores con Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. La API estará disponible en `http://localhost:4000`.

## Diagrama General de la Solución

                   +-----------------------------+
                   |       Cliente GraphQL       |
                   |  (Apollo Sandbox/Postman)   |
                   +-------------+---------------+
                                 |
                                 |
                                 v
                      +----------+------------+
                      |                       |
                      |     WiFi API          |
                      |   (Apollo Server)     |
                      |                       |
                      +----------+------------+
                                 |
                                 |
                                 v
                   +-------------+--------------+
                   |                            |
                   |         MongoDB            |
                   |    (Local/Atlas)           |
                   | Almacena los puntos WiFi   |
                   | con índice geoespacial     |
                   +----------------------------+

Este diagrama ilustra la arquitectura básica de la solución:

- **API de Apollo Server**: Facilita las consultas GraphQL para acceder a los puntos de acceso WiFi.
- **MongoDB**: Almacena los datos de puntos de acceso WiFi en una base de datos NoSQL optimizada para búsquedas geoespaciales.
- **Cliente GraphQL**: Puede ser una interfaz o herramienta de prueba que realiza consultas a la API para obtener información de los puntos de acceso.

## Desarrollo de la Solución

1. **Estructura del Proyecto**

   La estructura de archivos del proyecto es la siguiente:
   ```
   wifi-api-graphql/
   ├── src/
   │   ├── models/
   │   │   └── WifiPoint.js      # Modelo de MongoDB para los puntos WiFi
   │   ├── schema.js             # Definiciones de tipo y esquema de GraphQL
   │   ├── resolvers.js          # Resolvers de las consultas y mutaciones
   │   ├── loadCSV.js            # Script para cargar datos CSV a MongoDB
   │   └── index.js              # Punto de entrada del servidor Apollo
   ├── .env                      # Variables de entorno
   ├── Dockerfile                # Configuración de Docker para contenedores
   ├── docker-compose.yml        # Configuración de Docker Compose para el proyecto
   └── README.md                 # Documentación del proyecto
   ```

2. **Definición del Esquema de GraphQL**

   En `src/schema.js`, se define el esquema de GraphQL con las siguientes consultas:
   - `wifiPoints`: Devuelve una lista paginada de puntos de acceso WiFi.
   - `wifiPointById`: Devuelve la información de un punto de acceso por su ID.
   - `wifiPointsByColonia`: Devuelve una lista de puntos de acceso en una colonia específica.
   - `wifiPointsNearby`: Devuelve una lista de puntos de acceso cercanos a una coordenada dada.

3. **Resolvers de GraphQL**

   Los resolvers en `src/resolvers.js` manejan la lógica para cada consulta:
   - Consultas paginadas usando `limit` y `offset`.
   - Filtrado geoespacial para obtener puntos cercanos a una ubicación específica.

4. **Carga de Datos desde CSV**

   El script `loadCSV.js` lee el archivo CSV con puntos de acceso WiFi, valida y transforma los datos, y los almacena en MongoDB. Este script es ideal para una primera carga de datos.

## Uso

1. **Acceso a la API**: Una vez desplegada, la API está disponible en `http://localhost:4000` y se puede probar usando un cliente GraphQL como Apollo Sandbox o Postman.
2. **Ejemplos de Consultas**:

   - **Obtener una lista de puntos WiFi**:
     ```graphql
     query {
       wifiPoints(limit: 10, offset: 0) {
         id
         programa
         colonia
         alcaldia
       }
     }
     ```

   - **Consultar un punto WiFi por ID**:
     ```graphql
     query {
       wifiPointById(id: "123") {
         id
         programa
         colonia
         alcaldia
       }
     }
     ```

   - **Buscar puntos WiFi cercanos a una coordenada**:
     ```graphql
     query {
       wifiPointsNearby(lat: 19.4326, long: -99.1332, limit: 5) {
         id
         programa
         latitud
         longitud
       }
     }
     ```
