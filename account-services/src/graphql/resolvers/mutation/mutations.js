const mutations = {
    signUp: async (parent, args, context) => {
        const session = context.authProvider;
        const result = await context.authProvider.signUp(args.input.email, args.input.password);
        return {
            email: args.input.email,
            password: args.input.password,
            userId: result.userId,
            authToken: result.authToken
        };
    },
    signIn: async (parent, args, context) => {
        const session = context.authProvider;
        const result = await context.authProvider.signIn(args.input.email, args.input.password);
        return {
            email: args.input.email,
            password: args.input.password,
            userId: result.userId,
            authToken: result.authToken
        };
    },
    signOut: async (parent, args, context) => {
        const session = context.authProvider;
        const result = await context.authProvider.signOut();
        return {
            success: result
        };
    },
};

export default mutations;