const mutations = {
  signUp: async (parent, args, context) => {
    if (args.input.email === undefined && args.input.phoneNumber === undefined) {
      throw new Error("Must provide either a phone number or an email!")
    }
    const result = await context.authProvider.signUp(args.input.email, args.input.phoneNumber, args.input.password);
    return {
      email: args.input.email,
      phoneNumber: args.input.phoneNumber,
      password: args.input.password,
      userId: result.userId,
    };
  },
  signIn: async (parent, args, context) => {
    const authSession = await context.authProvider.signIn(args.input.username, args.input.password);
    return authSession
  },
  signOut: async (parent, args, context) => {
    const result = await context.authProvider.signOut(args.input.accessToken);
    return {
      success: result
    };
  },
  confirmSignUp: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.confirmSignUp(args.input.username, args.input.code);
    return {
      success: result
    };
  },
  changePassword: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.changePassword(args.input.oldPassword, args.input.newPassword);
    return {
      success: result
    };
  },
  forgotPassword: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.forgotPassword(args.input.username);
    return {
      success: result
    };
  },
  forgotPasswordSubmit: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.forgotPasswordSubmit(args.input.username, args.input.code, args.input.newPassword);
    return {
      success: result
    };
  },
  deleteAccount: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.deleteAccount(args.input.username);
    return {
      success: result
    };
  },
  enableAccount: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.enableAccount(args.input.username);
    return {
      success: result
    };
  },
  disableAccount: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.disableAccount(args.input.username);
    return {
      success: result
    };
  },
  resendConfirmationCode: async (parent, args, context) => {
    const session = context.authProvider;
    const result = await context.authProvider.resendConfirmationCode(args.input.username);
    return {
      success: result
    };
  },
  respondToAuthChallenge: async (parent, args, context) => {
    const session = context.authProvider;
    const authSession = await context.authProvider.respondToAuthChallenge(args.input.username, args.input.code, args.input.session);
    return {
      userId: authSession.userId,
      accessToken: authSession.accessToken,
      userVerified: authSession.userVerified
    };
  },
};

export default mutations;
