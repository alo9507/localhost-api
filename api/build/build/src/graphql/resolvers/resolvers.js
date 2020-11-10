"use strict";

var queries = require("./query/queries");

var user = require("./user/user");

var mutations = require("./mutation/mutations");

var resolvers = {
  Query: queries,
  User: user,
  Mutation: mutations
};
module.exports = resolvers;