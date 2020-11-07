const { gql } = require('apollo-server');

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
  inbound(filter: InboundFilterInput): [User]
  mutual: [User]
  email: String
  createdAt: Int
  updatedAt: Int
  showMeCriteria: ShowMeCriteria
}

input InboundFilterInput {
  seen: Boolean
}

type Query {
  user(id: ID!): User
  users(filter: ModelUserFilterInput): [User]
  getDistanceBetween(user1: ID!, user2: ID!): Float
  showMeCriteria(id: ID!): ShowMeCriteria
  getViableUsers(id: ID!): [User]
}

input SendNodInput {
  from: ID!
  to: ID!
  message: String
  location: String
}

type Mutation {
  sendNod(input: SendNodInput!): SendNodResponse
  returnNod(input: SendNodInput!): SendNodResponse
  createUser(input: CreateUserInput!): User
  updateUser(input: UpdateUserInput!): User
  deleteUser(id: ID!): ID
  deleteAllUsers: String
  updateShowMeCriteria(input: UpdateShowMeCriteriaInput): ShowMeCriteria
  nodSeen(recipient: ID!, sender: ID!): NodSeenResponse
  report(from: ID!, to: ID!, reason: String, message: String): ReportedResponse
}

type ReportedResponse {
  from: ID!
  to: ID!
  reason: String
  message: String
}

type ShowMeCriteria {
  sex: [String]
}

input UpdateShowMeCriteriaInput {
  id: ID!
  sex: [String]
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
  message: String
  location: String
}

type NodSeenResponse {
  recipient: String
  sender: String
}

enum ModelSortDirection {
  ASC
  DESC
}

input ModelStringInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  contains: String
  notContains: String
  between: [String]
  beginsWith: String
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
  size: ModelSizeInput
}

enum ModelAttributeTypes {
  binary
  binarySet
  bool
  list
  map
  number
  numberSet
  string
  stringSet
  _null
}

input ModelIDInput {
  ne: ID
  eq: ID
  le: ID
  lt: ID
  ge: ID
  gt: ID
  contains: ID
  notContains: ID
  between: [ID]
  beginsWith: ID
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
  size: ModelSizeInput
}

input ModelIntInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  between: [Int]
  between_inclusive: [Int]
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelFloatInput {
  ne: Float
  eq: Float
  le: Float
  lt: Float
  ge: Float
  gt: Float
  between: [Float]
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelBooleanInput {
  ne: Boolean
  eq: Boolean
  attributeExists: Boolean
  attributeType: ModelAttributeTypes
}

input ModelSizeInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  between: [Int]
}

input ModelUserFilterInput {
  id: ModelIDInput
  name: ModelStringInput
  bio: ModelStringInput
  whatAmIDoing: ModelStringInput
  location: ModelStringInput
  isVisible: ModelBooleanInput
  age: ModelIntInput
  sex: ModelStringInput
  and: [ModelUserFilterInput]
  or: [ModelUserFilterInput]
  not: ModelUserFilterInput
}
`;

module.exports = typeDefs;