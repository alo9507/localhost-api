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
  // Assume
  // Arrange
  // Act
  // Assert
  let authManager: RemoteAuthProvider

  beforeEach(() => {
    authManager = new AWSAmplifyRemoteAuthProvider()
  })

  afterAll(() => {
    // delete all accounts
  })

  // Basics
  it('should create a new account with email and password', async () => {
    // Assume - account does not exist
    // Arrange
    let email = `heerrrro@g.com`
    let password = "abc1233!!"

    // Act
    let authSession = await authManager.signUp(email, password)

    // Assert - you can sign into the account
    expect(authSession.userId).not.toBeUndefined()
    expect(authSession.emailVerified).toBe(false)

    cleanUp(email)
  });

  it('should create a new account with phone number and password', () => {
    // Assume - account does not exist
    // Arrange
    // Act
    // Assert - you can sign into the account with phone number and password
    expect(false).toBe(true)
  });

  it('should delete an account', () => {
    // Arrange
    //  - create a new account
    //  - show you can sign into that account and get a user back
    // Act - delete the account
    // Assert - you can no longer sign into the account
    expect(false).toBe(true)
  });

  it('should let a user sign in', () => {
    // Arrange - create random account
    // Act - sign in with the new account
    // Assert - you had a user returned
    expect(false).toBe(true)
  });

  it('should allow for sign out', () => {
    // Arrange 
    // - create random account
    // - sign in
    // Act - sign out
    // Assert - a success message was returned
    expect(false).toBe(true)
  });


  // Confirm Account - not sure how to test this, maybe just manually
  it('should send a confirmation email if email is used', () => {
    expect(false).toBe(true)
  });

  it('should send a confirmation text if phone is used', () => {
    expect(false).toBe(true)
  })

  it('should confirm the new account when the correct confirmation is received (email)', () => {
    expect(false).toBe(true)
  })

  it('should confirm the new account when the correct confirmation is received (password)', () => {
    expect(false).toBe(true)
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
    expect(false).toBe(true)
  })

  it('should update password', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account
    // ACT - change the password
    // ASSERT 
    // - you cannot sign in with the old password
    // - you can sign in with the new password
    expect(false).toBe(true)
  })

  it('should send a forgot password email', () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account
    // ACT - send a forgot password email
    // ASSERT
    // - you received an email
    expect(false).toBe(true)
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
    expect(false).toBe(true)
  });
});
