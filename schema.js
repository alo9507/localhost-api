const { gql } = require('apollo-server')

const typeDefs = gql`
type User {
  id: ID!
  name: String
  bio: String
  whatAmIDoing: String
  isVisible: Boolean
  sex: String
  age: Int
  latitude: Float
  longitude: Float
  outbound: [User]
  outboundCount: Int
  inbound: [User]
  inboundCount: Int
  email: String
}

type Query {
  user(id: ID!): User
  users: [User]
  getDistanceBetween(user1: ID!, user2: ID!): Float
}

type Mutation {
  message(message: String!): MessageResponse
  sendNod(from: ID!, to: ID!): SendNodResponse
  createUser(input: CreateUserInput): User
  updateUser(input: UpdateUserInput!): User
  deleteUser(id: ID!): ID
  deleteAllUsers: String
}

input UpdateUserInput {
  id: ID!
  email: String
  name: String
  bio: String
  whatAmIDoing: String
  isVisible: Boolean
  sex: String
  age: Int
  latitude: Float
  longitude: Float
}

input CreateUserInput {
  id: ID!
  email: String!
  name: String
  bio: String
  whatAmIDoing: String
  latitude: Float
  longitude: Float
  isVisible: Boolean
  sex: String
  age: Int
}

type SendNodResponse {
  from: String
  to: String
}

type MessageResponse {
  success: Boolean!
  message: String
}
`

module.exports = typeDefs