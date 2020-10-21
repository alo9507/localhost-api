"use strict";

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer;

var typeDefs = require('./schema');

var resolvers = require('./resolvers');

var neo4j = require('neo4j-driver');

var _require2 = require('apollo-log'),
    ApolloLogExtension = _require2.ApolloLogExtension;

var keys = require('./keys');

var driver = neo4j.driver(keys.neo4jUri, neo4j.auth.basic(keys.neo4jUser, keys.neo4jPassword), {
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
}); // The `listen` method launches a web server.

server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});