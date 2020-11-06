const { ApolloServer } = require('apollo-server');
const typeDefs = require('../graphql/schema/schema');
const resolvers = require('../graphql/resolvers/resolvers');
const driver = require('../neo4j/driver');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { driver },
    introspection: true,
    playground: true
});

module.exports = server;