import { Auth } from 'aws-amplify';
import AuthError from '../AuthError/AuthError';
import AuthSession from '../AuthSession/AuthSession';
import RemoteAuthProvider from '../RemoteAuthProvider/RemoteAuthProvider';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`) });

class AWSAmplifyRemoteAuthProvider implements RemoteAuthProvider {

  signIn(emailOrPhoneNumber: string, password: string): Promise<AuthSession> {
    const promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const signInResult = await Auth.signIn({
          username: emailOrPhoneNumber,
          password
        });

        const userId = signInResult.attributes.sub;

        resolve(new AuthSession(userId, 'fakeToken', false));
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

  signUp(emailOrPhoneNumber: string, password: string): Promise<AuthSession> {
    const promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const signUpResult = await Auth.signUp({
          username: emailOrPhoneNumber,
          password
        });

        const userId = signUpResult.userSub;

        resolve(new AuthSession(userId, 'fakeToken', false));
      } catch (e) {
        switch (e.message) {
          case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
            reject(AuthError.passwordTooShort);
            break;
          case 'User does not exist.':
            reject(AuthError.userNotFound);
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
    throw new Error('Method not implemented.');
  }

  changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    // fetch CognitoUser with userId?
    throw new Error('Method not implemented.');
  }

  forgotPassword(username: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  disableAccount(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  enableAccount(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteAccount(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

export default AWSAmplifyRemoteAuthProvider;
