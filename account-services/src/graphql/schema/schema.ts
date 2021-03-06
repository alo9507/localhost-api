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
    signOut(input: SignOutInput!): SignOutResponse
    confirmSignUp(input: ConfirmSignUpInput!): ConfirmSignUpResponse
    changePassword(input: ChangePasswordInput!): ChangePasswordResponse
    forgotPassword(input: ForgotPasswordInput!): ForgotPasswordResponse
    forgotPasswordSubmit(input: ForgotPasswordSubmitInput!): ForgotPasswordSubmitResponse
    deleteAccount(input: DeleteAccountInput!): DeleteAccountResponse
    enableAccount(input: EnableAccountInput!): EnableAccountResponse
    disableAccount(input: DisableAccountInput!): DisableAccountResponse
    resendConfirmationCode(input: ResendConfirmationCodeInput!): ResendConfirmationCodeResponse
    respondToAuthChallenge(input: RespondToAuthChallengeInput!): RespondToAuthChallengeResponse
  }

  input RespondToAuthChallengeInput {
    username: String
    code: String
    session: String
  }

  type RespondToAuthChallengeResponse {
    userId: String
    accessToken: String
    userVerified: Boolean
  }

  input ResendConfirmationCodeInput {
    username: String
  }

  type ResendConfirmationCodeResponse {
    success: Boolean
  }

  input SignOutInput {
    accessToken: String!
  }

  input EnableAccountInput {
    username: String!
  }

  type EnableAccountResponse {
    success: Boolean
  }

  input DisableAccountInput {
    username: String!
  }

  type DisableAccountResponse {
    success: Boolean
  }
  
  input DeleteAccountInput {
    username: String!
  }

  type DeleteAccountResponse {
    success: Boolean
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
    email: String
    phoneNumber: String
    password: String
  }

  type SignUpResponse {
    email: String
    phoneNumber: String
    userId: String
  }

  input SignInInput {
    username: String
    password: String
  }

  type SignInResponse {
    success: Boolean
    session: String
  }

  type SignOutResponse {
    success: Boolean
  }
`;

export default typeDefs;
