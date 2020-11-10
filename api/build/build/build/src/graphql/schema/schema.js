"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\ntype User {\n  id: ID!\n  name: String\n  bio: String\n  whatAmIDoing: String\n  isVisible: Boolean\n  sex: String\n  age: Int\n  latitude: Float\n  longitude: Float\n  outbound: [User]\n  inbound(filter: InboundFilterInput): [User]\n  mutual: [User]\n  email: String\n  createdAt: Int\n  updatedAt: Int\n  showMeCriteria: ShowMeCriteria\n}\n\ninput InboundFilterInput {\n  seen: Boolean\n}\n\ntype Query {\n  user(id: ID!): User\n  users(filter: ModelUserFilterInput): [User]\n  getDistanceBetween(user1: ID!, user2: ID!): Float\n  showMeCriteria(id: ID!): ShowMeCriteria\n  getViableUsers(id: ID!): [User]\n}\n\ninput SendNodInput {\n  from: ID!\n  to: ID!\n  message: String\n  location: String\n}\n\ntype Mutation {\n  sendNod(input: SendNodInput!): SendNodResponse\n  returnNod(input: SendNodInput!): SendNodResponse\n  createUser(input: CreateUserInput!): User\n  updateUser(input: UpdateUserInput!): User\n  deleteUser(id: ID!): ID\n  deleteAllUsers: String\n  updateShowMeCriteria(input: UpdateShowMeCriteriaInput!): ShowMeCriteria\n  nodSeen(recipient: ID!, sender: ID!): NodSeenResponse\n  report(input: ReportInput!): ReportedResponse\n  block(input: BlockInput!): BlockResponse\n  becomeInvisibleTo(input: BecomeInvisibleToInput!): BecomeInvisibleToResponse\n  becomeVisibleTo(input: BecomeVisibleToInput!): BecomeVisibleToResponse\n}\n\ninput ReportInput {\n  from: ID!, \n  to: ID!, \n  reason: String, \n  message: String\n}\n\ninput BecomeVisibleToInput {\n  from: ID!\n  to: ID!\n}\n\ntype BecomeVisibleToResponse {\n  from: ID\n  to: ID\n}\n\ninput BecomeInvisibleToInput {\n  from: ID!\n  to: ID!\n}\n\ntype BecomeInvisibleToResponse {\n  from: ID\n  to: ID\n}\n\ninput BlockInput {\n  from: ID!, \n  to: ID!, \n  reason: String, \n  message: String\n}\n\ntype ReportedResponse {\n  from: ID!\n  to: ID!\n  reason: String\n  message: String\n}\n\ntype BlockResponse {\n  from: ID!\n  to: ID!\n  reason: String\n  message: String\n}\n\ntype ShowMeCriteria {\n  sex: [String]\n  age: [Int]\n}\n\ninput UpdateShowMeCriteriaInput {\n  id: ID!\n  sex: [String]\n  age: [Int]\n}\n\ninput UpdateUserInput {\n  id: ID!\n  email: String\n  name: String\n  bio: String\n  whatAmIDoing: String\n  isVisible: Boolean\n  sex: String\n  age: Int\n  latitude: Float\n  longitude: Float\n}\n\ninput CreateUserInput {\n  id: ID!\n  email: String!\n  name: String\n  bio: String\n  whatAmIDoing: String\n  latitude: Float\n  longitude: Float\n  isVisible: Boolean\n  sex: String\n  age: Int\n}\n\ntype SendNodResponse {\n  from: String\n  to: String\n  message: String\n  location: String\n}\n\ntype NodSeenResponse {\n  recipient: String\n  sender: String\n}\n\nenum ModelSortDirection {\n  ASC\n  DESC\n}\n\ninput ModelStringInput {\n  ne: String\n  eq: String\n  le: String\n  lt: String\n  ge: String\n  gt: String\n  contains: String\n  notContains: String\n  between: [String]\n  beginsWith: String\n  attributeExists: Boolean\n  attributeType: ModelAttributeTypes\n  size: ModelSizeInput\n}\n\nenum ModelAttributeTypes {\n  binary\n  binarySet\n  bool\n  list\n  map\n  number\n  numberSet\n  string\n  stringSet\n  _null\n}\n\ninput ModelIDInput {\n  ne: ID\n  eq: ID\n  le: ID\n  lt: ID\n  ge: ID\n  gt: ID\n  contains: ID\n  notContains: ID\n  between: [ID]\n  beginsWith: ID\n  attributeExists: Boolean\n  attributeType: ModelAttributeTypes\n  size: ModelSizeInput\n}\n\ninput ModelIntInput {\n  ne: Int\n  eq: Int\n  le: Int\n  lt: Int\n  ge: Int\n  gt: Int\n  between: [Int]\n  between_inclusive: [Int]\n  attributeExists: Boolean\n  attributeType: ModelAttributeTypes\n}\n\ninput ModelFloatInput {\n  ne: Float\n  eq: Float\n  le: Float\n  lt: Float\n  ge: Float\n  gt: Float\n  between: [Float]\n  attributeExists: Boolean\n  attributeType: ModelAttributeTypes\n}\n\ninput ModelBooleanInput {\n  ne: Boolean\n  eq: Boolean\n  attributeExists: Boolean\n  attributeType: ModelAttributeTypes\n}\n\ninput ModelSizeInput {\n  ne: Int\n  eq: Int\n  le: Int\n  lt: Int\n  ge: Int\n  gt: Int\n  between: [Int]\n}\n\ninput ModelUserFilterInput {\n  id: ModelIDInput\n  name: ModelStringInput\n  bio: ModelStringInput\n  whatAmIDoing: ModelStringInput\n  location: ModelStringInput\n  isVisible: ModelBooleanInput\n  age: ModelIntInput\n  sex: ModelStringInput\n  and: [ModelUserFilterInput]\n  or: [ModelUserFilterInput]\n  not: ModelUserFilterInput\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

var _require = require('apollo-server'),
    gql = _require.gql;

var typeDefs = gql(_templateObject());
module.exports = typeDefs;