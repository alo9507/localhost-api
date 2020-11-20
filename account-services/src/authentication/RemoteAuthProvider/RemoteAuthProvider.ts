import AuthSession from '../AuthSession/AuthSession';

interface RemoteAuthProvider {
  signIn(email: string, password: string): Promise<AuthSession>;
  signOut(): Promise<boolean>;
  signUp(email: string, password: string): Promise<AuthSession>;
}

export default RemoteAuthProvider;
