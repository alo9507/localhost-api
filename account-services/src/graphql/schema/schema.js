const { gql } = require('apollo-server');

const typeDefs = gql`
type User {
    email: String
}

type Query {
    user: String
}

type Mutation {
    signUp(input: SignUpInput!): SignUpResponse
    signIn(input: SignInInput!): SignInResponse
    signOut: SignOutResponse
}

input SignUpInput {
    email: String!
    password: String!
}

type SignUpResponse {
    email: String
    password: String
    authToken: String
    userId: String
}

input SignInInput {
    email: String
    password: String
}

type SignInResponse {
    email: String
    password: String
    authToken: String
    userId: String
}

type SignOutResponse {
    success: Boolean
}
`;

module.exports = typeDefs;