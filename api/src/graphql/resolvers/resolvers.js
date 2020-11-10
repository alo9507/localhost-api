import queries from "./query/queries";
import user from "./user/user";
import mutations from "./mutation/mutations";

const resolvers = {
  Query: queries,
  User: user,
  Mutation: mutations,
};

export default resolvers;
