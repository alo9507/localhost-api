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
    confirmSignUp(input: ConfirmSignUpInput): ConfirmSignUpResponse
    changePassword(input: ChangePasswordInput): ChangePasswordResponse
    forgotPassword(input: ForgotPasswordInput): ForgotPasswordResponse
    forgotPasswordSubmit(input: ForgotPasswordSubmitInput): ForgotPasswordSubmitResponse
  }

  input ConfirmSignUpInput {
    username: String!
    code: String!
  }

  input ChangePasswordInput {
    oldPassword: String
    newPassword: String
  }

  input ForgotPasswordInput {
    username: String
  }

  input ForgotPasswordSubmitInput {
    username: String
    code: String
    newPassword: String
}

  type ChangePasswordResponse {
    success: Boolean
  }

  type ForgotPasswordResponse {
    success: Boolean
  }

  type ForgotPasswordSubmitResponse {
    success: Boolean
  }

  type ConfirmSignUpResponse {
    success: Boolean
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

export default typeDefs;
