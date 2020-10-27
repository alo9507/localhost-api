const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const neo4j = require('neo4j-driver')
const dotenv = require('dotenv')
dotenv.configure()

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(
    process.env.NEO4J_USER,
    process.env.NEO4J_PASSWORD
  ),
  {
    encrypted: 'ENCRYPTION_OFF'
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