import { ApolloServer } from 'apollo-server';
import typeDefs from '../graphql/schema/schema';
import resolvers from '../graphql/resolvers/resolvers';
import AWSCognitoRemoteAuthProvider from '../authentication/RemoteAuthProvider/AWSCognitoRemoteAuthProvider';
import dotenv from 'dotenv';
import path from 'path';
import AnalyticsExtension from "../graphql/extensions/AnalyticsExtension"

dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

function createServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { authProvider: new AWSCognitoRemoteAuthProvider(process.env.USER_POOL_ID, process.env.APP_CLIENT_ID) },
    introspection: true,
    playground: true,
    extensions: [() => new AnalyticsExtension()]
  });

  return server;
}

export default createServer;
