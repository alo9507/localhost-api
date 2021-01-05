import AuthSession from '../AuthSession/AuthSession';

interface RemoteAuthProvider {
  // Basic
  signIn(emailOrPhoneNumber: string, password: string): Promise<AuthSession>;
  signOut(): Promise<boolean>;

  // Should send email
  signUp(username: string,emailOrPhoneNumber: string, password: string): Promise<AuthSession>;
  confirmSignUp(username: string, code: string): Promise<boolean>

  // Updates
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>
  forgotPassword(username: string): Promise<boolean>
  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean>

  // Admin Account Management
  deleteAccount(email: string): Promise<boolean>
  disableAccount(email: string): Promise<boolean>
  enableAccount(email: string): Promise<boolean>
}

export default RemoteAuthProvider;

THE TASK
------------
  My team is looking for an AWS Cognito + AWS Amplify expert to implement an authentication provider for our authentication microservice.

THE REQUIREMENTS
------------
  The exhaustive requirements of this contract are:
1. Provisioning and Configuring a User Pool and Identity Pool in AWS Cognito to persist users and allow for sign up with EITHER an email OR a phone number.

2. Implementing the following 11 authentication capabilities in TypeScript:
signIn
signOut
signUp(email)
signUp(phone number)
confirmSignUp
changePassword
forgotPassword
submitForgotPassword
deleteAccount
enableAccount
disableAccount

3. Creating and passing tests for each of the above 11 features

OUR PRETTY ARCHITECTURE
-------------------------
  Our architecture is such that the entirety of you work will be contained to the account services microservice without any annoying dependencies on outside parts of our codebase.

AWSAmplifyRemoteAuthProvider is the one file where you will be implementing these features.You'll notice the skeleton is already provided. Only the implementations must be added by an AWS Cognito + AWS Amplify expert:
https://github.com/alo9507/localhost-api/blob/master/account-services/src/authentication/RemoteAuthProvider/AWSAmplifyRemoteAuthProvider.ts

Here is the test suite that must pass for this contract to be considered successful.There are helpful Arrange / Act / Assert blocks with some pseudocode setup:
https://github.com/alo9507/localhost-api/blob/master/account-services/src/__tests__/auth.test.ts

I began this myself and got it working for signIn, signUp, and signOut, but quickly got confused by the grey areas between Cognito and Amplify and thought it best to contract out to someone who knows better.

THE PAY STRUCTURE
-------------------------
  The contract will be fully funded in escrow prior to hire.

    MILESTONE 1: Code Delivery
After your code is working locally and the test suite passes for all 11 features on your machine, you can PR your feature branch.You will receive 50 % of the full engagement price.

  MILESTONE 2: Code Review and Acceptance
We will test your PR on our side to ensure everything works as expected.Once this is confirmed, you will receive the remaining 50 % of the funds from escrow.

If you think you can complete these 11 authentication features successfully, please apply! And feel free to use this authentication microservice you create in future projects you work on!