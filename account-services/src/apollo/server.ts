import { ApolloServer } from 'apollo-server';
import typeDefs from '../graphql/schema/schema';
import resolvers from '../graphql/resolvers/resolvers';
import AWSCognitoRemoteAuthProvider from '../authentication/RemoteAuthProvider/AWSCognitoRemoteAuthProvider';

function createServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { authProvider: new AWSCognitoRemoteAuthProvider() },
    introspection: true,
    playground: true
  });

  return server;
}

export default createServer;
