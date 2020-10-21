"use strict";

var _require = require('apollo-server-lambda'),
    ApolloServer = _require.ApolloServer;

var typeDefs = require('./schema');

var resolvers = require('./resolvers');

var neo4j = require('neo4j-driver');

var keys = require('./keys');

var driver = neo4j.driver(keys.neo4jUri || 'bolt://localhost:7687', neo4j.auth.basic(keys.neo4jUser || 'neo4j', keys.neo4jPassword || 'neo4j'), {
  encrypted: keys.neo4jEncrypted ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF'
});
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: {
    driver: driver
  },
  introspection: true,
  playground: true
});
module.exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true
  }
});