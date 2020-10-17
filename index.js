const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const neo4j = require('neo4j-driver')
const { ApolloLogExtension } = require('apollo-log');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config({path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)})

const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(
      process.env.NEO4J_USER,
      process.env.NEO4J_PASSWORD
    ),
    {
      encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
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