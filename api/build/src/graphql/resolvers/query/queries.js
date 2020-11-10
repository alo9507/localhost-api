"use strict";

var _require = require("../../../utils"),
    toNumber = _require.toNumber;

var _require2 = require("../../../utils"),
    generateQuery = _require2.generateQuery;

var queries = {
  user: function user(parent, args, context, info) {
    var session = context.driver.session();
    var params = {
      id: args.id
    };
    return session.run('MATCH (n:User) WHERE n.id=$id RETURN n', params).then(function (result) {
      session.close();

      if (result.records == 0) {
        throw new Error("User with id ".concat(args.id, " does not exist in databse"));
      }

      return result.records[0].get(0).properties;
    });
  },
  users: function users(parent, args, context, info) {
    var query = generateQuery(args.filter);
    var session = context.driver.session();
    return session.run(query).then(function (result) {
      var users = result.records.map(function (record) {
        return record.get(0).properties;
      });
      session.close();
      return users;
    });
  },
  showMeCriteria: function showMeCriteria(parent, args, context, info) {
    var session = context.driver.session();
    var params = {
      id: args.id
    };
    return session.run('MATCH (n: ShowMeCriteria { id: $id }) RETURN n', params).then(function (result) {
      session.close();

      if (result.records == 0) {
        throw new Error("ShowMeCriteria with id ".concat(args.id, " does not exist in databse"));
      }

      return result.records[0].get(0).properties;
    });
  },
  getDistanceBetween: function getDistanceBetween(parent, args, context) {
    var session = context.driver.session();
    var params = {
      user1ID: args.user1,
      user2ID: args.user2
    };
    return session.run('MATCH (user1:User), (user2:User) WHERE user1.id = $user1ID AND user2.id = $user2ID WITH point({ longitude: user1.longitude, latitude: user1.latitude }) AS user1Point, point({ longitude: user2.longitude, latitude: user2.latitude }) AS user2point RETURN round(distance(user1Point, user2point)) AS distanceBetweenUsers', params).then(function (result) {
      session.close();
      return result.records[0].get('distanceBetweenUsers');
    });
  },
  getViableUsers: function getViableUsers(parent, args, context) {
    var session = context.driver.session();
    var params = {
      id: args.id
    };
    return session.run("\n            MATCH (requestor_criteria: ShowMeCriteria { id: $id }), (requestor: User { id: $id })\n            WITH requestor, requestor_criteria\n            MATCH (other: User), (other_criteria: ShowMeCriteria { id: other.id })\n            WHERE other.isVisible = true\n            AND other.sex IN requestor_criteria.sex\n            AND requestor.sex IN other_criteria.sex\n            AND requestor.age IN other_criteria.age\n            AND other.age IN requestor_criteria.age\n            RETURN other", params).then(function (result) {
      var users = result.records.map(function (record) {
        return record.get(0).properties;
      });
      session.close();
      return users;
    });
  }
};
module.exports = queries;