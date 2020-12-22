class AuthSession {
  userId: string;
  token: string;
  emailVerified: boolean

  constructor (userId: string, token: string, emailVerified: boolean) {
    this.userId = userId;
    this.token = token;
    this.emailVerified = emailVerified;
  }
}

export default AuthSession;
