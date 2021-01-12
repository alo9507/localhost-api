import AuthSession from '../AuthSession/AuthSession';

interface RemoteAuthProvider {
  // Basic
  signIn(emailOrPhoneNumber: string, password: string): Promise<AuthSession>;
  signOut(accessToken: string): Promise<boolean>;

  // Should send email
  signUp(username: string,emailOrPhoneNumber: string, password: string): Promise<AuthSession>;
  confirmSignUp(username: string, code: string): Promise<boolean>

  // Updates
  changePassword(accessToken:string, oldPassword: string, newPassword: string): Promise<boolean>
  forgotPassword(username: string): Promise<boolean>
  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean>

  // Admin Account Management
  deleteAccount(email: string): Promise<boolean>
  disableAccount(email: string): Promise<boolean>
  enableAccount(email: string): Promise<boolean>
 
}

export default RemoteAuthProvider;