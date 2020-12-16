const mutations = {
  signUp: async (parent, args, context) => {
    const result = await context.authProvider.signUp(args.input.email, args.input.password);
    return {
      email: args.input.email,
      password: args.input.password,
      userId: result.userId,
      authToken: result.authToken
    };
  },
  signIn: async (parent, args, context) => {
    const result = await context.authProvider.signIn(args.input.email, args.input.password);
    return {
      email: args.input.email,
      password: args.input.password,
      userId: result.userId,
      authToken: result.authToken
    };
  },
  signOut: async (parent, args, context) => {
    const result = await context.authProvider.signOut();
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
};

export default mutations;
