import AWSAmplifyRemoteAuthProvider from "../authentication/RemoteAuthProvider/AWSAmplifyRemoteAuthProvider";
import config from "../aws-exports"
import Amplfiy from 'aws-amplify';
import RemoteAuthProvider from "../authentication/RemoteAuthProvider/RemoteAuthProvider";

Amplfiy.configure(config);

const cleanUp = (async (email) => {
  const authManager = new AWSAmplifyRemoteAuthProvider()
  await authManager.deleteAccount(email)
})

describe('Authentication Manager', () => {
  let authManager: RemoteAuthProvider

  beforeEach(() => {
    authManager = new AWSAmplifyRemoteAuthProvider()
  })

  // Basics
  it('should create a new account with email and password', async () => {
    // Assume - account does not exist

    // Arrange
    let email = `${Date.now()}@g.com`
    let password = "abc1233!!"

    // Act
    let authSession = await authManager.signUp(email, password)

    // Assert - you can sign into the account
    expect(authSession.userId).not.toBeUndefined()
    expect(authSession.emailVerified).toBe(false)
  });

  it('should create a new account with phone number and password', async () => {
    let phoneNumber = `+19782341232`
    let password = "abc1233!!"

    let authSession = await authManager.signUp(phoneNumber, password)

    expect(authSession.userId).not.toBeUndefined()
    expect(authSession.emailVerified).toBe(false)
  });

  it('should delete an account', () => {
    // Arrange
    //  - create a new account
    //  - show you can sign into that account and get an AuthSession back

    // Act - delete the account

    // Assert - you can no longer sign into the account
  });

  it('should let a user sign in', () => {
    // Arrange - create random account

    // Act - sign in with the new account

    // Assert - you had an AuthSession returned
  });

  it('should allow for sign out', () => {
    // Arrange 
    // - create random account
    // - sign in

    // Act - sign out

    // Assert - a success message was returned and the user is 
  });


  // Confirm Account - not sure how to test this, maybe just manually
  it('should send a confirmation email if email is used for sign up', () => {
  });

  it('should send a confirmation text if phone is used for sign up', () => {
  })

  it('should confirm the new account when the correct confirmation is received (email)', () => {
  })

  it('should confirm the new account when the correct confirmation is received (password)', () => {
  })

  // Account Services (update email/phone number, change password, forgot password)
  it('should update email', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account

    // ACT - change the email

    // ASSERT 
    // - you cannot sign in with the old email
    // - you can sign in with the new email
  })

  // this is not the same as forgot password. 
  // this is for people who are already logged in and just want to change their password
  it('should change password', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account

    // ACT - change the password

    // ASSERT 
    // - you cannot sign in with the old password
    // - you can sign in with the new password
  })

  it('should send a forgot password email', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account

    // ACT - send a forgot password email

    // ASSERT
    // - you received an email
  })

  it('should send change password after a submitForgotPassword is received', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account

    // ACT
    // - send a forgot password email
    // - submit the confirmation code to forgotPasswordSubmit

    // ASSERT
    // - you cannot sign in with the old password
    // - you can sign in with the new password
  });
});
