const queries = require("./query/queries");
const user = require("./user/user");
const mutations = require("./mutation/mutations");

const resolvers = {
  Query: queries,
  User: user,
  Mutation: mutations,
};

export default resolvers;
