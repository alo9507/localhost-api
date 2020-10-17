"use strict";

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer;

var typeDefs = require('./schema');

var resolvers = require('./resolvers');

var neo4j = require('neo4j-driver');

var _require2 = require('apollo-log'),
    ApolloLogExtension = _require2.ApolloLogExtension;

var path = require('path');

var dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, ".env.".concat(process.env.NODE_ENV))
});
var driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD), {
  encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF'
});
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: {
    driver: driver
  },
  introspection: true,
  playground: true
}); // The `listen` method launches a web server.

server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});