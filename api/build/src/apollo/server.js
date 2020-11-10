"use strict";

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer;

var typeDefs = require('../graphql/schema/schema');

var resolvers = require('../graphql/resolvers/resolvers');

var createDriver = require('../neo4j/driver');

function createServer(databaseUri) {
  var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: {
      driver: createDriver(databaseUri)
    },
    introspection: true,
    playground: true
  });
  return server;
}

module.exports = createServer;