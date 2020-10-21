const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const neo4j = require('neo4j-driver')
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

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});