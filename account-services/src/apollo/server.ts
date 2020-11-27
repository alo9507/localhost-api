import { ApolloServer } from 'apollo-server';
import typeDefs from '../graphql/schema/schema';
import resolvers from '../graphql/resolvers/resolvers';
import config from '../aws-exports';
import Amplfiy from 'aws-amplify';
import AWSAmplifyRemoteAuthProvider from '../authentication/RemoteAuthProvider/AWSAmplifyRemoteAuthProvider';

Amplfiy.configure(config);

function createServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { authProvider: new AWSAmplifyRemoteAuthProvider() },
    introspection: true,
    playground: true
  });

  return server;
}

export default createServer;
