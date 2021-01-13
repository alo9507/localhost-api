class AuthSession {
  userId: string;
  accessToken: string;
  userVerified: boolean

  constructor (userId: string, accessToken: string, userVerified: boolean) {
    this.userId = userId;
    this.accessToken = accessToken;
    this.userVerified = userVerified;
  }
}

export default AuthSession;
