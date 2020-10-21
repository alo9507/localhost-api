const { ApolloServer } = require('apollo-server-lambda')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const neo4j = require('neo4j-driver')
const keys = require('./keys')

const driver = neo4j.driver(
    keys.neo4jUri || 'bolt://localhost:7687',
    neo4j.auth.basic(
      keys.neo4jUser || 'neo4j',
      keys.neo4jPassword || 'neo4j'
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

module.exports.handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  })