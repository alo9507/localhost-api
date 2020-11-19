import { ApolloServer } from 'apollo-server';
import typeDefs from '../graphql/schema/schema';
import resolvers from '../graphql/resolvers/resolvers';

function createServer(databaseUri) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        playground: true
    });

    return server;
}

export default createServer;