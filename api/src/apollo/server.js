import { ApolloServer } from 'apollo-server';
import typeDefs from '../graphql/schema/schema';
import resolvers from '../graphql/resolvers/resolvers';
import createDriver from '../neo4j/driver';

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

export default createServer;