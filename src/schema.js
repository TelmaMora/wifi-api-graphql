const { gql } = require('apollo-server');

const typeDefs = gql`
  type WifiPoint {
    id: ID!
    programa: String
    fecha_instalacion: String
    latitud: Float
    longitud: Float
    colonia: String
    alcaldia: String
  }

  type Query {
    wifiPoints(limit: Int, offset: Int): [WifiPoint]
    wifiPointById(id: ID!): WifiPoint
    wifiPointsByColonia(colonia: String!, limit: Int, offset: Int): [WifiPoint]
    wifiPointsNearby(lat: Float!, long: Float!, limit: Int, offset: Int): [WifiPoint]
  }
`;

module.exports = typeDefs;
