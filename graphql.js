const { ApolloServer } = require('apollo-server-lambda')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const neo4j = require('neo4j-driver')

const dotenv = require('dotenv')
dotenv.config()

const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
      process.env.NEO4J_USER || 'neo4j',
      process.env.NEO4J_PASSWORD || 'neo4j'
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

module.exports.handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  })