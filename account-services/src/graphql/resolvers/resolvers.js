import mutations from "./mutation/mutations";
import queries from "./query/queries";

const resolvers = {
    Query: queries,
    Mutation: mutations
};

export default resolvers;
