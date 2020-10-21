const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const neo4j = require('neo4j-driver')
const { ApolloLogExtension } = require('apollo-log');
const keys = require('./keys')

const driver = neo4j.driver(
    keys.neo4jUri,
    neo4j.auth.basic(
      keys.neo4jUser,
      keys.neo4jPassword
    ),
    {
      encrypted: keys.neo4jEncrypted ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
    }
  )

  const server = new ApolloServer({ 
      typeDefs, 
      resolvers,
      context: { driver },
      introspection: true,
      playground: true
    });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});