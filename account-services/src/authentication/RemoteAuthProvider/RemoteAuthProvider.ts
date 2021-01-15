import AuthSession from '../AuthSession/AuthSession';

interface RemoteAuthProvider {
  // Basic
  signIn(emailOrPhoneNumber: string, password: string): Promise<AuthSession>;
  signOut(accessToken: string): Promise<boolean>;

  // Should send email
  signUp(username: string, emailOrPhoneNumber: string, password: string): Promise<AuthSession>;
  confirmSignUp(emailOrPhoneNumber: string, code: string): Promise<boolean>
  resendConfirmationCode(emailOrPhoneNumber: string): Promise<boolean>

  // Updates
  changePassword(accessToken: string, oldPassword: string, newPassword: string): Promise<boolean>
  forgotPassword(emailOrPhoneNumber: string): Promise<boolean>
  forgotPasswordSubmit(emailOrPhoneNumber: string, code: string, newPassword: string): Promise<boolean>

  // Admin Account Management
  deleteAccount(emailOrPhoneNumber: string): Promise<boolean>
  disableAccount(emailOrPhoneNumber: string): Promise<boolean>
  enableAccount(emailOrPhoneNumber: string): Promise<boolean>

}

export default RemoteAuthProvider;