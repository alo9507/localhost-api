import { ApolloServer } from 'apollo-server';
import typeDefs from '../graphql/schema/schema';
import resolvers from '../graphql/resolvers/resolvers';
import createDriver from '../neo4j/driver';
import AnalyticsExtension from '../graphql/extensions/AnalyticsExtensions';
import PushNotificationService from "../services/PushNotificationServices"

function createServer(databaseUri) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { driver: createDriver(databaseUri), pushNotificationService: new PushNotificationService() },
    introspection: true,
    playground: true,
    extensions: [() => new AnalyticsExtension()]
  });

  return server;
}

export default createServer;
