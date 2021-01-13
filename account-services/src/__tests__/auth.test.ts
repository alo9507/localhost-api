import AWSCognitoRemoteAuthProvider from "../authentication/RemoteAuthProvider/AWSAmplifyRemoteAuthProvider";
import config from "../aws-exports"
import Amplfiy from 'aws-amplify';
import RemoteAuthProvider from "../authentication/RemoteAuthProvider/RemoteAuthProvider";

Amplfiy.configure(config);

const userPoolId = "";         //UserPoolId goes here
const ClientId = "";    //ClientAppId goes here

const cleanUp = (async (email) => {
  const authManager = new AWSCognitoRemoteAuthProvider(userPoolId, ClientId)
  //await authManager.deleteAccount(email)
})

describe('Authentication Manager', () => {
  let authManager: RemoteAuthProvider

  beforeEach(async () => {
    authManager = new AWSCognitoRemoteAuthProvider(userPoolId, ClientId)
    //await authManager.deleteAccount('azheraleem6@gmail.com')
  })

  it('should create a new account with email and password', async () => {
    let email = `azheraleem6@gmail.com`
    let password = "123abcdeA!"

    let authSession = await authManager.signUp(email, '', password, )
    
    expect(authSession.userId).not.toBeUndefined()
    expect(authSession.emailVerified).toBe(false)
  });

  it('should create a new account with phone number and password', async () => {
    let phoneNumber = `+923004843643`
    let username = '+923004843643'
    let password = "123abcdeA!"

    let authSession = await authManager.signUp(username,phoneNumber, password);

    expect(authSession.userId).not.toBeUndefined()
    expect(authSession.emailVerified).toBe(false)
  });

  //Confirm Account - not sure how to test this, maybe just manually
  it('should confirm a user', async () => {
    let email = "azheraleem6@gmail.com";
    let authSession =  await authManager.confirmSignUp(email, "142588");
    expect(authSession).toBe(true); 
  });
 
  var accessToken='';
  it('should let a user sign in', async () => {
    let emailOrPhoneNumber = "azheraleem6@gmail.com";
    let password = "123abcdeA!";
    let authSession = await authManager.signIn(emailOrPhoneNumber, password);
    accessToken =authSession.token;
    expect(authSession.token).not.toBeUndefined();
    expect(authSession.emailVerified).toBe(false);
  });
   
  it('should disable an account', async () => {
    let emailOrPhoneNumber = "+923004843643";
    let authSession = await authManager.disableAccount(emailOrPhoneNumber);
    expect(authSession).toBe(true); 
  });

  it('should enable an account', async () => {
    let emailOrPhoneNumber = "azheraleem6@gmail.com";
    let authSession = await authManager.enableAccount(emailOrPhoneNumber);
    expect(authSession).toBe(true); 
  });

  it('should allow for sign out', async () => {
    let authSession = await authManager.signOut(accessToken);
    expect(authSession).toBe(true);
   });

  it('should delete an account', async () => {
    let emailOrPhoneNumber = "azheraleem6@gmail.com";
    let authSession = await authManager.deleteAccount(emailOrPhoneNumber);
    expect(authSession).toBe(true); 
  });


  //Change Password 
  //this is for people who are already logged in and just want to change their password
  it('should change password', async () => {
    
    let authSession = await authManager.changePassword(accessToken, "AASDASDASA1!a", "123abcdaA!");
   
    expect(authSession).toBe(true); 
  })


  it('should send a forgot password email', async () => {
    let emailOrPhoneNumber = "azheraleem6@gmail.com";
    
    let authSession = await authManager.forgotPassword(emailOrPhoneNumber);
    expect(authSession).toBe(true); 
  })

  it('should send change password after a submitForgotPassword is received', async () => {
    let emailOrPhoneNumber = "azheraleem6@gmail.com";
    let code = "276657";
    let newPassword = "AASDASDASA1!a";
    let authSession = await authManager.forgotPasswordSubmit(emailOrPhoneNumber, code, newPassword);
    expect(authSession).toBe(true); 
  });
});
