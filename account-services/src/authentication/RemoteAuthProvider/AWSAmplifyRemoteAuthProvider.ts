import { Auth, API } from 'aws-amplify';
import AuthError from '../AuthError/AuthError';
import AuthSession from '../AuthSession/AuthSession';
import RemoteAuthProvider from '../RemoteAuthProvider/RemoteAuthProvider';
import path, { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

class AWSAmplifyRemoteAuthProvider implements RemoteAuthProvider {

  signIn(emailOrPhoneNumber: string, password: string): Promise<AuthSession> 
  {
    const promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        
        const signInResult = await Auth.signIn({
          username: emailOrPhoneNumber,
          password
        });

        const userId = signInResult.attributes.sub;
        const token =  (await Auth.currentSession()).getAccessToken().getJwtToken();
        console.log(userId, 'token: ', token);
        resolve(new AuthSession(userId, token, false));
      } catch (e) {
        switch (e.message) {
          case 'Username should be either an email or a phone number.':
            reject(`${AuthError.usernameInvalid}:  ${e.message}`);
            break;
          case 'Password did not conform with policy: Password not long enough':
            reject(`${AuthError.passwordTooShort}:  ${e.message}`);
            break;
          case 'User is not confirmed.':
            reject(`${AuthError.userIsNotConfirmed}:  ${e.message}`);
            break;
          case 'Incorrect username or password.':
            reject(`${AuthError.incorrectUsernameOrPassword}:  ${e.message}`);
            break;
          case 'User does not exist.':
            reject(`${AuthError.userDoesNotExist}:  ${e.message}`);
            break;
          default:
            reject(`${AuthError.unknownError}:  ${e.message}`);
        }
      }
    });
    return promise;
  }

  signOut(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise(async (resolve, reject) => {
      try {
        await Auth.signOut();
        resolve(true);
      } catch (error) {
        reject(`Error signing out: ${error}`);
      }
    });
    return promise;
  }

  signUp(username: string, emailOrPhoneNumber: string, password: string): Promise<AuthSession> {
    const promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        
        const signUpResult = await Auth.signUp({
          username: username,          
          password,
          attributes: {
            phone_number: emailOrPhoneNumber
          }
        });
      
        const userId = signUpResult.userSub;

        resolve(new AuthSession(userId, '', false));
      } catch (e) {
        switch (e.message) {
          case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
            reject(AuthError.passwordTooShort);
            break;
          case 'User does not exist.':
            reject(AuthError.userDoesNotExist);
            break;
          case 'Username should be either an email or a phone number.':
            reject(AuthError.usernameInvalid);
            break;
          case 'Password did not conform with policy: Password not long enough':
            reject(AuthError.passwordTooShort);
            break;
          case 'An account with the given email already exists.':
            reject(AuthError.emailAlreadyExists);
            break;
          case "Username cannot be empty":
            reject(AuthError.usernameCannotBeEmpty);
          default:
            reject(AuthError.unknownError);
        }
      }
    });
    return promise;
  }

  confirmSignUp(username: string, code: string): Promise<boolean> {
      const promise: Promise<boolean> = new Promise(async(resolve, reject)=>{
        try {
          const response = await Auth.confirmSignUp(username, code);
          resolve(response);
        } catch (e) {
          switch (e.message) {
            case 'User is disabled.':
              reject(`${AuthError.userdisabled}:  ${e.message}`);
              break;
            case 'User cannot be confirmed. Current status is CONFIRMED':
              reject(`${AuthError.userIsAlreadyConfirmed}:  ${e.message}`);
              break;
            case  'Username/client id combination not found.':
              reject(`${AuthError.userDoesNotExist}: ${e.message}`)
            case 'Invalid verification code provided, please try again.':
              reject(`${AuthError.invalidVerificationCode}:  ${e.message}`);
              break;
            default:
              reject(`${AuthError.unknownError}:  ${e.message}`);
          }
        }
      });
      return promise;
  }

  changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    // fetch CognitoUser with userId?
    const promise: Promise<any> = new Promise(async (resolve, reject) => {
      try {
        let user = await Auth.currentSession();
        //console.log(user);
        let authSession = await Auth.changePassword(user, oldPassword, newPassword);
        resolve(true)
      } catch (error) {
        reject(`Error changing password: ${error.message}`);
      }
    })
    return promise;
  } 

  forgotPassword(username: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async disableAccount(email: string): Promise<any> 
  {
    let apiName = 'AdminQueries';
    let path = '/signUserOut';
    let myInit = {
        body: {
          "username": "miannomanch@gmail.com"
       }, 
        headers: {
          'Content-Type' : 'application/json; charset=UTF-8',
          Authorization: 'Bearer eyJraWQiOiI0a1h3bEdPQXFxZDEyUXhWK1dPUXhcL1RBQ0MwdG1BNGhiXC9mbExSSjRcLzZnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YzM2NTFiNS00MmZmLTRhYmQtYmJiYi0wNDFkN2Y4NWJiOGQiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJldmVudF9pZCI6IjMwODNlNzZhLTJjODctNDY5OC04ZTMyLTJhNThmMWM3ZjlhMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTAyODYyMzMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3VLNzczY1laMyIsImV4cCI6MTYxMDI4OTgzMywiaWF0IjoxNjEwMjg2MjMzLCJqdGkiOiIwOWY0MmViYS1lN2UxLTQ3ZjMtOGE4OS03YzI2NGIzY2MwNWUiLCJjbGllbnRfaWQiOiIzc2ZmZ2pwMjZmc2NzZXRkMDNrOW1xNGNsMSIsInVzZXJuYW1lIjoiOWMzNjUxYjUtNDJmZi00YWJkLWJiYmItMDQxZDdmODViYjhkIn0.N2tbOJIXi9aQAn6FkDVEm_w8YvlA3XItglTwaMtbA_EcGnRDT5nVuMOdLa6Mr-pV6pbsXGnpzJvD8ZiCZadzbcrX0ItSqEp-ub3BNoapKNEj61RbQNgY0F_RiJZJegW2CNmMXejWHCKaurSE8jFBucUMCQzn38_r1bCTTtSsM4Vbg_CW_BM4_qpLBNo5-mxHsgIXLlbesN5OH2Z9NBogaxhqqLM5IBJFY_V-2JvaLRFSJt9yLrw9-ny0CjEmxZFboxgoot-v-GpFi24ZpGON5Eqxl2fkjZiNLHu7Nx8Nxw_QdBrTnDSsUCjHxlnOyV_gbY446WGi2UWm6xdxsPw3xw'
        } 
    }
    return await API.post(apiName, path, myInit);
    //return true;
   // throw new Error('Method not implemented.');
  }

  enableAccount(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteAccount(email: string): Promise<boolean> {
    
    throw new Error('Method not implemented.');
  }
  async getUser(email: string): Promise<any> 
  {
    //const formdata = new FormData();
//formdata.append("username", "5beb26d4-4c84-4e12-96ee-0f4378d3d433");
    let apiName = 'AdminQueries';
    let path = '/getUser?username=5beb26d4-4c84-4e12-96ee-0f4378d3d433';
    let myInit = {
        headers: {
          'Content-Type' : 'application/json',
          Authorization: 'Bearer eyJraWQiOiI0a1h3bEdPQXFxZDEyUXhWK1dPUXhcL1RBQ0MwdG1BNGhiXC9mbExSSjRcLzZnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5YzM2NTFiNS00MmZmLTRhYmQtYmJiYi0wNDFkN2Y4NWJiOGQiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbiJdLCJldmVudF9pZCI6IjhlOWJiZTdlLTJjMTItNGI0Yi05YWZhLTg4YjE1ZjE3YzA1MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTAyNzI0MTMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3VLNzczY1laMyIsImV4cCI6MTYxMDI3NjAxMywiaWF0IjoxNjEwMjcyNDEzLCJqdGkiOiJkZTIwOTEzMy1hY2E5LTRhZjgtYTk5OC04MTBiZmU2MDNiOGQiLCJjbGllbnRfaWQiOiIzc2ZmZ2pwMjZmc2NzZXRkMDNrOW1xNGNsMSIsInVzZXJuYW1lIjoiOWMzNjUxYjUtNDJmZi00YWJkLWJiYmItMDQxZDdmODViYjhkIn0.aMmdMLaslS8fywXAPmDYIj8Uh_Al5OG6pUKSew94-gQ_Cr_hff_j-ZQp7QBLIsNqd_Hdxd0lS2_j6dWJdWHpzUALduRTWHm2bf_aaK7LFKxPxDphGdtbg2eoX4R7qNCUE4zk4SamW3e2T--LMWO9-aW6bilyrs2qv2iZFjASlHMrZRx46rPlgOstniX8PHncJObH9VvUGo5BAEk5NOiWL5PpIxAMFd1S7O_GfGsrtKdNTc1gsvHNHw7I58SeUIwjbwp8TlJ7R_qibtXm9WS3EYMypsGP8I92bPzx3B4h58p6MdpA7RgttRO5imVPz6_uHBdeVuSIaf3jpD-oFoP7lQ'
        } 
    }
    //return true;
    return await API.get(apiName, path, myInit);
   // throw new Error('Method not implemented.');
  }

}

export default AWSAmplifyRemoteAuthProvider;
