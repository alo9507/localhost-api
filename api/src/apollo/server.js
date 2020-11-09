const { ApolloServer } = require('apollo-server');
const typeDefs = require('../graphql/schema/schema');
const resolvers = require('../graphql/resolvers/resolvers');
const createDriver = require('../neo4j/driver');

function createServer(databaseUri) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: { driver: createDriver(databaseUri) },
        introspection: true,
        playground: true
    });

    return server;
}

module.exports = createServer;