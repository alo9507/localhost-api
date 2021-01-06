import AWSAmplifyRemoteAuthProvider from "../authentication/RemoteAuthProvider/AWSAmplifyRemoteAuthProvider";
import config from "../aws-exports"
import Amplfiy from 'aws-amplify';
import RemoteAuthProvider from "../authentication/RemoteAuthProvider/RemoteAuthProvider";

Amplfiy.configure(config);

const cleanUp = (async (email) => {
  const authManager = new AWSAmplifyRemoteAuthProvider()
  //await authManager.deleteAccount(email)
})

describe('Authentication Manager', () => {
  let authManager: RemoteAuthProvider

  beforeEach(() => {
    authManager = new AWSAmplifyRemoteAuthProvider()
  })

  // //Basics
  it('should create a new account with email and password', async () => {
    //Assume - account does not exist
    // Arrange
    let email = `azheraleem6@gmail.com`
    let password = "abc1233!!"

    // Act
    let authSession = await authManager.signUp(email, '', password, )

    // Assert - you receive a userId and an indication that the email must be verified
    expect(authSession.userId).not.toBeUndefined()
    expect(authSession.emailVerified).toBe(false)
  });

  it('should create a new account with phone number and password', async () => {
    //Arrange
    let phoneNumber = `+923004843643`
    let username = 'azheraleem6@gmail.com'
    let password = "abc1233!!"

    // Act
    let authSession = await authManager.signUp(username,phoneNumber, password,)

    // Assert - you receive a userId and an indication that the phone number must be verified
    expect(authSession.userId).not.toBeUndefined()
    expect(authSession.emailVerified).toBe(false)
  });

  it('should delete an account', async () => {
    // Arrange
    //  - create a new account
    //  - show you can sign into that account and get an AuthSession back

    // Act - delete the account

    // Assert - you can no longer sign into the account
    //let email = "edf4f7e5-61b7-4097-9f49-f40e5b993f3c";
    //let password = "12345678";

    // Act
    //let authSession = await authManager.disableAccount(email);
    //console.log(authSession)
    // Assert - you receive a userId and an indication that the phone number must be verified
    // expect(authSession.userId).not.toBeUndefined();
    // expect(authSession.emailVerified).toBe(false);
  });

  it('should let a user sign in', async () => {
    // Arrange
    let email = "azheraleem6@gmail.com";
    //let password = "abc1233!!";
    let password = "87654321";

    // Act
    let authSession = await authManager.signIn(email, password);
    //console.log(authSession.token);
    // Assert - you receive a userId and an indication that the phone number must be verified
    expect(authSession.userId).not.toBeUndefined();
    expect(authSession.token).not.toBeUndefined();
    expect(authSession.emailVerified).toBe(false);
  });

  it('should allow for sign out', async () => {
    // Arrange 
    // - create random account
    // - sign in
    //let email='azheraleem6@gmail.com';
    //let password = 'abc1233!!';    

    let authSession = await authManager.signOut();
    console.log(authSession);
    
    // Act - sign out

  //   // Assert - a success message was returned and the user is 
  //   //expect(authSession).toBe(false);
   });

  //Confirm Account - not sure how to test this, maybe just manually
  it('should send a confirmation email if email is used for sign up', async () => {

    let email = "azheraleem6@gmail.com";
    let authSession =  await authManager.confirmSignUp(email, "227184");
    console.log(authSession);
    
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
  it('should change password', async () => {
    // ARRANGE 
    // - create a random account
    // - confirm you can sign into the account
    let authSession = await authManager.changePassword("abc1233!!", "123");
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
