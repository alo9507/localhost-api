import AuthSession from '../AuthSession/AuthSession';

interface RemoteAuthProvider {
  signIn(email: string, password: string): Promise<AuthSession>;
  signOut(): Promise<boolean>;
  signUp(email: string, password: string): Promise<AuthSession>;
  confirmSignUp(username: string, code: string): Promise<boolean>
  changePassword(oldPassword: string, newPassword: string): Promise<boolean>
  forgotPassword(username: string): Promise<boolean>
  forgotPasswordSubmit(username: string, code: string, newPassword: string): Promise<boolean>
}

export default RemoteAuthProvider;
