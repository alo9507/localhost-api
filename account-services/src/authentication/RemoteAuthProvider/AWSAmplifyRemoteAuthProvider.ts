import { Auth, API } from 'aws-amplify';
import AuthError from '../AuthError/AuthError';
import AuthSession from '../AuthSession/AuthSession';
import RemoteAuthProvider from '../RemoteAuthProvider/RemoteAuthProvider';
import path, { resolve } from 'path';
import dotenv from 'dotenv';

const AWS = require('aws-sdk');
global.fetch = require('node-fetch');

dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

class AWSAmplifyRemoteAuthProvider implements RemoteAuthProvider {
  
  poolData: {};
  cognitoidentityserviceprovider: AWS.CognitoIdentityServiceProvider
  constructor(userPoolId: string, clientId: string)
  {
    this.poolData = {    
      UserPoolId : userPoolId, // Your user pool id here    
      ClientId : clientId // Your client id here
      };
    this.cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({'region': 'us-east-1'});  
  }
  
  signIn(emailOrPhoneNumber: string, password: string): Promise<AuthSession> 
  {
    const promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
        var params = {
          AuthFlow: 'USER_PASSWORD_AUTH', /* required */
          ClientId: this.poolData['ClientId'], /* required */
          AuthParameters: {
            'USERNAME': emailOrPhoneNumber,
            'PASSWORD': password
            /* '<StringType>': ... */
          }
        };
       
        this.cognitoidentityserviceprovider.initiateAuth(params, function(err, data) {
          if (err) 
          {
            switch (err.message) {
              case 'Username should be either an email or a phone number.':
                reject(`${AuthError.usernameInvalid}:  ${err.message}`);
                break;
              case 'Password did not conform with policy: Password not long enough':
                reject(`${AuthError.passwordTooShort}:  ${err.message}`);
                break;
              case 'User is not confirmed.':
                reject(`${AuthError.userIsNotConfirmed}:  ${err.message}`);
                break;
              case 'Incorrect username or password.':
                reject(`${AuthError.incorrectUsernameOrPassword}:  ${err.message}`);
                break;
              case 'User does not exist.':
                reject(`${AuthError.userDoesNotExist}:  ${err.message}`);
                break;
              case "User is disabled.":
                  reject(`${AuthError.userdisabled}:  ${err.message}`);
                  break;  
              default:
                reject(`${AuthError.unknownError}:  ${err.message}`);
                break;
            }
          } 
          else{
            resolve(new AuthSession('',data.AuthenticationResult.AccessToken,false));
          }
        });
    });
    return promise;
  }

  signOut(accessToken: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise(async (resolve, reject) => {
      var params = {
        AccessToken: accessToken  /* required */
      };
      this.cognitoidentityserviceprovider.globalSignOut(params, function(err, data) {
        if (err) 
        {
          switch(err.message)
          {
            case "Invalid Access Token":
              reject(`${AuthError.invalidAccessToken}:  ${err.message}`);
              break;
            case "Access Token has been revoked":
              reject(`${AuthError.accessTokenRevoked}:  ${err.message}`);
              break;
            case "User is disabled.":
              reject(`${AuthError.userdisabled}:  ${err.message}`);
              break;    
            default:
              reject(`${AuthError.unknownError}:  ${err.message}`);
              break;
          }          
        } 
        else
        {     
          resolve(true);
        }           
      });
    });
    return promise;
  }

  signUp(username: string, phone_number: string, password: string): Promise<AuthSession> {
    const promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {

    var params = {
      ClientId: this.poolData['ClientId'], /* required */
      Password: password, /* required */
      Username: username, /* required */
      UserAttributes: [
        {
          Name: 'phone_number', /* required */
          Value: phone_number
        },
      ],
    };
    this.cognitoidentityserviceprovider.signUp(params, function(err, data) {
        if (err)
        {
          switch (err.message) {
            case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
              reject(`${AuthError.passwordTooShort}:  ${err.message}`);
              break;
            case 'User does not exist.':
              reject(`${AuthError.userDoesNotExist}:  ${err.message}`);
              break;
            case 'Username should be either an email or a phone number.':
              reject(`${AuthError.usernameInvalid}:  ${err.message}`);
              break;
            case 'Password did not conform with policy: Password not long enough':
              reject(`${AuthError.passwordTooShort}:  ${err.message}`);
              break;
            case 'An account with the given email already exists.':
              reject(`${AuthError.emailAlreadyExists}:  ${err.message}`);
              break;
            case "Username cannot be empty":
              reject(`${AuthError.usernameCannotBeEmpty}:  ${err.message}`);
              break;
            case "Password did not conform with policy: Password must have lowercase characters":
              reject(`${AuthError.passwordLowerCaseMissing}:  ${err.message}`);
              break;
            case "Password did not conform with policy: Password must have symbol characters":
              reject(`${AuthError.passwordSepcialCharacterMissing}:  ${err.message}`);
              break;
            case  "Password did not conform with policy: Password must have uppercase characters":
              reject(`${AuthError.passwordUpperCaseMissing}:  ${err.message}`);
              break;
            default:
              reject(`${AuthError.unknownError}:  ${err.message}`);
              break;
          }
        }
        else
        {
          resolve(new AuthSession(data.UserSub, '', false))
        }               
      });  
    });

    return promise;
  }

  confirmSignUp(username: string, code: string): Promise<boolean> {
      const promise: Promise<boolean> = new Promise(async(resolve, reject)=>{
        var params = {
          ClientId: this.poolData['ClientId'], /* required */
          ConfirmationCode: code, /* required */
          Username: username, /* required */
        };
        this.cognitoidentityserviceprovider.confirmSignUp(params, function(err, data) {
          if (err) 
          {   
            switch (err.message) {
              case 'User is disabled.':
                reject(`${AuthError.userdisabled}:  ${err.message}`);
                break;
              case 'User cannot be confirmed. Current status is CONFIRMED':
                reject(`${AuthError.userIsAlreadyConfirmed}:  ${err.message}`);
                break;
              case  'Username/client id combination not found.':
                reject(`${AuthError.userDoesNotExist}: ${err.message}`)
              case 'Invalid verification code provided, please try again.':
                reject(`${AuthError.invalidVerificationCode}:  ${err.message}`);
                break;
              case 'Invalid code provided, please request a code again.':
                reject(`${AuthError.invalidVerificationCode}:  ${err.message}`);
                break;
              default:
                reject(`${AuthError.unknownError}:  ${err.message}`);
                break;
            }
          }
          else     
          {   
            resolve(true);
          }           
        });
      });
      return promise;
  }

  changePassword(accessToken, oldPassword: string, newPassword: string): Promise<boolean> {
    // fetch CognitoUser with userId?
    const promise: Promise<any> = new Promise(async (resolve, reject) => {
      var params = {
        AccessToken: accessToken, /* required */
        PreviousPassword: oldPassword, /* required */
        ProposedPassword: newPassword /* required */
      };
      this.cognitoidentityserviceprovider.changePassword(params, function(err, data) {
          if (err) 
          {
            switch(err.message){
              case "Incorrect username or password.":
                reject(`${AuthError.incorrectUsernameOrPassword}:  ${err.message}`);
                break;
              case "Password did not conform with policy: Password not long enough":
                reject(`${AuthError.passwordTooShort}:  ${err.message}`);
                break; 
              case  "Password did not conform with policy: Password must have uppercase characters":
                reject(`${AuthError.passwordUpperCaseMissing}:  ${err.message}`);
                break;
              case  "Password did not conform with policy: Password must have lowercase characters":
                reject(`${AuthError.passwordLowerCaseMissing}:  ${err.message}`);
                break; 
              case  "Attempt limit exceeded, please try after some time.":
                reject(`${AuthError.attempLimitexceeded}:  ${err.message}`);
                break;
              case "Password did not conform with policy: Password must have symbol characters":
                reject(`${AuthError.passwordSepcialCharacterMissing}:  ${err.message}`);
                break;    
              default:
                reject(`${AuthError.unknownError}:  ${err.message}`);
                break;
            }
          }
          else{
            resolve(true);
          }                
      });

    })
    return promise;
  } 

  forgotPassword(username: string): Promise<boolean> {
    const promise: Promise<any> = new Promise(async (resolve, reject) => {
      var params = {
        ClientId: this.poolData['ClientId'], /* required */
        Username: username /* required */
      };
      this.cognitoidentityserviceprovider.forgotPassword(params, function(err, data) {
        if (err)
        {
          switch(err.message){
            case "User does not exist.":
              reject(`${AuthError.userDoesNotExist}:  ${err.message}`);
              break;
            case  "Attempt limit exceeded, please try after some time.":
              reject(`${AuthError.attempLimitexceeded}:  ${err.message}`);
              break; 
            default:
              reject(`${AuthError.unknownError}:  ${err.message}`);
              break;
          }
        }
        else
        {
          resolve(true);
        }           
      });
    });
    return promise;
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean> {
    const promise: Promise<any> = new Promise(async (resolve, reject) => {
      var params = {
        ClientId: this.poolData['ClientId'], /* required */
        ConfirmationCode: code, /* required */
        Password: newPassword, /* required */
        Username: username, /* required */
      };
      this.cognitoidentityserviceprovider.confirmForgotPassword(params, function(err, data) {
        if (err) 
        {
          switch(err.message)
          {
            case "Password does not conform to policy: Password not long enough":
              reject(`${AuthError.passwordTooShort}: ${err.message}`);
              break;
            case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
              reject(`${AuthError.passwordTooShort}: ${err.message}`);
              break;
            case "Password does not conform to policy: Password must have uppercase characters":
              reject(`${AuthError.passwordUpperCaseMissing}: ${err.message}`);
              break;
            case  "Password does not conform to policy: Password must have numeric characters":
              reject(`${AuthError.passwordNumericMissing}: ${err.message}`);
              break;
            case  "Password does not conform to policy: Password must have symbol characters":
              reject(`${AuthError.passwordSepcialCharacterMissing}: ${err.message}`);
              break;  
            case  "Password does not conform to policy: Password must have lowercase characters":
              reject(`${AuthError.passwordLowerCaseMissing}: ${err.message}`);
              break; 
            case  "Invalid verification code provided, please try again.":
              reject(`${AuthError.invalidVerificationCode}: ${err.message}`);
              break;
            case "User does not exist.":
              reject(`${AuthError.userDoesNotExist}:  ${err.message}`);
              break;    
            default:
              reject(`${AuthError.unknownError}: ${err.message}`);
              break;
          }
          console.log(err.message); 
        }
        else
        { 
            console.log(data);
            resolve(true);
        }           
      });
    });
    return promise;
  }

  disableAccount(email: string): Promise<any> 
  {
    const promise: Promise<boolean> = new Promise(async(resolve, reject)=>
    {
        var params = {
          UserPoolId: this.poolData['UserPoolId'], /* required */
          Username: email /* required */
        };
        
        this.cognitoidentityserviceprovider.adminDisableUser(params, function(err, data) 
        {
            if (err) 
            {
              switch(err.message)
              {
                case "User does not exist.":
                  reject(`${AuthError.userDoesNotExist}:  ${err.message}`);
                  break;
                default:
                  reject(`${AuthError.unknownError}:  ${err.message}`);
                  break;
              }
            }
            else   
            {  
              resolve(true); 
            }        
        });
    });
    return promise;
  }

  enableAccount(email: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise(async(resolve, reject)=>
    {
        var params = {
          UserPoolId: this.poolData['UserPoolId'], /* required */
          Username: email /* required */
        };
        
        this.cognitoidentityserviceprovider.adminEnableUser(params, function(err, data) 
        {
            if (err) 
            {
              switch(err.message)
              {
                case "User does not exist.":
                  reject(`${AuthError.userDoesNotExist}:  ${err.message}`);
                  break;
                default:
                  reject(`${AuthError.unknownError}:  ${err.message}`);
                  break;
              }
            }
            else   
            {  
              resolve(true); 
            }        
        });
    });
    return promise;
  }

  deleteAccount(email: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise(async(resolve, reject)=>
    {
        var params = {
          UserPoolId: this.poolData['UserPoolId'], /* required */
          Username: email /* required */
        };
        
        this.cognitoidentityserviceprovider.adminDeleteUser(params, function(err, data) 
        {
            if (err) 
            {
              switch(err.message)
              {
                case "User does not exist.":
                  reject(`${AuthError.userDoesNotExist}:  ${err.message}`);
                  break;
                default:
                  reject(`${AuthError.unknownError}:  ${err.message}`);
                  break;
              }
            }
            else   
            {  
              resolve(true); 
            }        
        });
    });
    return promise;
  }

}

export default AWSAmplifyRemoteAuthProvider;
